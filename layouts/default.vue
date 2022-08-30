<template lang='pug'>
  .app
    nuxt
</template>

<script>

export default {
  layout: 'default'
}

</script>

<style lang='scss'>
body{
  margin: 0;
};

.nuxt-link-active{
  &:hover{
    text-decoration: none;
  }
};
</style>
