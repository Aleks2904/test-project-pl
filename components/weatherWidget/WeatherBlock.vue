<template lang="pug">
  .weather-block
    WeatherItem(v-for="(item, index) in getCityList" :item="item" :key="index")

</template>

<script>
import { mapGetters } from 'vuex'
import WeatherItem from "~/components/weatherWidget/WeatherItem";

export default {
  name:'WeatherBlock',
  components: {WeatherItem},
  computed:{
    ...mapGetters('weatherWidget',['getCityList']),
  },
}
</script>

<style scoped lang="scss">
.weather-block{
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  border: 1px solid $color-black;
  border-radius: 5px;
  padding: 15px;
  background: rgba(0,0,0,0.1);

}
</style>
