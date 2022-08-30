<template lang="pug">
  .weather-widget
    button.weather-widget__show-settings-btn(
      :aria-label="showSettings ? 'скрыть настройки' : 'открыть настройки'"
      :class="{'weather-widget__show-settings-btn_close':showSettings}"
      @click="()=>this.showSettings = !showSettings"
    )
    transition(name="settings" )
      SettingsBlock(v-if="showSettings")
    WeatherBlock

</template>

<script>

import SettingsBlock from "~/components/weatherWidget/SettingsBlock";
import WeatherBlock from "~/components/weatherWidget/WeatherBlock";
import { mapActions } from 'vuex';

export default {
  name: 'WeatherWidget',

  components: {WeatherBlock, SettingsBlock},

  data:()=>{
    return{
      showSettings: false,
    }
  },

  methods:{
    ...mapActions('weatherWidget',['requestUserCity',]),
  },

  mounted(){
    this.requestUserCity();
  }
}
</script>

<style scoped lang="scss">
.weather-widget{
  position: relative;

  &__show-settings-btn{
    position: absolute;
    z-index: 2;

    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;

    background: url("/weather/gear-svgrepo-com.svg");
    transition: transform .5s ease-in-out;

    @include hoverFocus{
      transform: rotate(500deg);
      transition: transform .5s ease-in-out;
    }

    &_close{
      background: transparent;

      &:before,
      &:after{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);

        width: 100%;
        height: 1px;
        background: $color-black;
      }

      &:after{
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      @include hoverFocus{
        transform: rotate(0deg);
        transition: transform 0s;
      }
    }
  }
}

.settings-enter-active, .settings-leave-active {
  transition: opacity .5s;
}
.settings-enter, .settings-leave-to {
  opacity: 0;
}

</style>
