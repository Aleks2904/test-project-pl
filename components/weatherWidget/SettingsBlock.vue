<template lang="pug">
  .settings-block
    p Settings
    .settings-block__wrapper
      ul.settings-block__wrapper__weather-list
        draggable(v-model="cityList" handle=".move")
          li(v-for="item in cityList" :key="item.id")
            div
              button.move
                svg
                  use(xlink:href="/weather/hamburger.svg#hamburger")
              p {{item.name}}
            button(@click="removeCity(item.id)")
              svg
                use(xlink:href="/weather/remove.svg#remove")

      label
        span Add Location
        input(v-model="searchCity" placeholder="Search")

      .settings-block__wrapper__search-block(v-if="Object.keys(getSearchList).length > 0" )
        ul.settings-block__wrapper__search-block__list
          li(v-if="loading" )
            p Loading ...
          li(v-for="item in getSearchList" :key="item.id")
            button(v-if="item.full_name" @click="addCity(item.latitude, item.longitude)" :disabled="checkCity(item)") {{item.full_name}}
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import draggable from 'vuedraggable'

export default {
  name: 'SettingsBlock',
  components: {draggable},
  data:()=>{
    return{
      searchCity: '',
      loading: false,
      cityList: [],
    }
  },
  methods:{
    ...mapActions('weatherWidget', ['requestSearchCity', 'requestWeather']),
    ...mapMutations('weatherWidget', ['setCityList']),

    async addCity(lat, lon){
      if(lat && lon){
        await this.requestWeather({lat, lon});
        this.cityList = JSON.parse(JSON.stringify(this.getCityList))
      }
    },

    updateLocalStorage(){
      const coordinatesList = [];

      for(let item of this.getCityList){
        coordinatesList.push({lat: item.coord.lat, lon: item.coord.lon})
      }

      localStorage.setItem('weather', JSON.stringify(coordinatesList));
    },

    removeCity(id){
      this.cityList = this.cityList.filter(el => {
        if(el.id !== id){
          return el;
        }
      });
    },

    checkCity(item){
      if(!item) return;

      const lat = item.latitude;
      const lon = item.longitude;

      const index = this.getCityList.findIndex((el) => {
        return el.coord.lat == lat && el.coord.lon == lon
      })

      return index >= 0;
    },
  },

  computed:{
    ...mapGetters('weatherWidget', ['getSearchList', 'getCityList']),
  },

  watch:{
    searchCity(el){
      const city = this.searchCity;
      setTimeout(async ()=>{
        if(this.searchCity === city){
          if(this.searchCity){
            this.loading = true;
            await this.requestSearchCity(this.searchCity);
            this.loading = false;
          }
        }
      },300)
    },

    cityList(){
      this.setCityList(this.cityList);
      this.updateLocalStorage();
    },

  },

  mounted(){
    this.cityList = JSON.parse(JSON.stringify(this.getCityList))
  }
}
</script>

<style scoped lang="scss">
.settings-block{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border: 1px solid $color-black;
  border-radius: 5px;
  padding: 30px 5px 5px 5px;
  background: $color-white;

  > p {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 16px;
    font-weight: 600;
  }

  &__wrapper {
    padding: 20px 10px 10px 10px;
    overflow: auto;
    position: relative;
    height: 100%;

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: gray;
      border-radius: 20px;
      border: 3px solid transparent;
    }

    label {
      display: block;
      margin: 20px 0 10px;
      width: 90%;
      max-width: 300px;

      span {
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 700;
      }

      input {
        display: block;
        padding: 5px;
        border: 1px solid blue;
        border-radius: 3px;
      }
    }


    &__search-block{
      border: 1px solid blue;
      border-radius: 3px;
      padding: 5px;

      &__list {
        max-height: 200px;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 7px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: gray;
          border-radius: 20px;
          border: 3px solid transparent;
        }

        li {
          button {
            text-align: left;
            padding: 5px;
            width: 100%;
            border-radius: 3px;

            @include hoverFocus {
              background: $color-black;
              color: $color-white;
            }

            &:disabled {
              color: gray;
              cursor: default;
              @include hoverFocus {
                background: $color-white;
                color: gray;
              }
            }
          }
        }
      }
    }

    &__weather-list {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 5px;
        background: rgba(0, 0, 0, 0.2);

        &:not(:last-child) {
          margin-bottom: 15px;
        }

        >div{
          display: flex;
          align-items: center;

          button{
            margin-right: 15px;
            cursor: grabbing;

            width: 30px;
            height: 30px;
          }
        }

        button {
          position: relative;
          width: 15px;
          height: 15px;

          @include hoverFocus {
            svg {
              fill: red;
              transition: fill .3s;
            }
          }

          svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            transition: fill .3s;
          }

        }
      }
    }
  }
}
</style>
