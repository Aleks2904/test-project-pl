<template lang="pug">
  main.main
    weather-widget
</template>

<script>

import WeatherWidget from "~/components/weatherWidget";
export default {
  name: 'IndexPage',
  components: {WeatherWidget},
}
</script>

<style lang="scss">
.main{
  padding: 15px;
}
</style>
