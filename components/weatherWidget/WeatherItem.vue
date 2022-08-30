<template lang="pug">
  .weather-item
    p.weather-item__position
      span.weather-item__position__city {{item.name}},
      span.weather-item__position__country {{item.sys.country}}
    .weather-item__weather
      img(:src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" :alt="item.weather[0].description")
      span.weather-item__weather__temperature {{item.main.temp}} &#8451;
    .weather-item__description {{item.weather[0].description}}
    ul.weather-item__list-info
      li.weather-item__list-info__item
        p
          i(:style="{background: 'url(./weather/arrow-svgrepo-com.svg)'}")
          | {{item.wind.speed}} m/s SSE
      li.weather-item__list-info__item
        p
          i(:style="{background: 'url(./weather/compass-svgrepo-com.svg)'}")
          | {{item.main.pressure}} hPa
      li.weather-item__list-info__item
        p Humidity: {{item.main.humidity}}%
      li.weather-item__list-info__item
        p Dew point: 0 &#8451;
      li.weather-item__list-info__item
        p Visibility: {{conversionFromKmToMeters(item.visibility)}}

</template>

<script>
export default {
  name: 'WeatherItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods:{
    conversionFromKmToMeters(meters){
      return (+meters / 1000).toFixed(1) + 'km'
    }
  }
}
</script>

<style scoped lang="scss">
.weather-item{
  display: inline-block;

  &__position{
    font-weight: 600;
    span{
      font-weight: inherit;
    }

    &__city{
      display: inline-block;
      margin-right: 5px;
    }
  }

  &__weather{
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: 600;
  }

  &__description{
    &:first-letter{
      text-transform: uppercase;
    }

    margin-bottom: 15px;
  }

  &__list-info{
    display: inline-grid;
    grid-template-columns: auto auto;
    grid-column-gap: 15px;
    grid-row-gap: 15px;

    &__item > p{
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 5px;
      align-items: center;

      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.2px;

      i{
        display: block;
        width: 15px;
        height: 15px;

        background-size: contain;
        background-position: center;
      }
    }
  }
}
</style>
