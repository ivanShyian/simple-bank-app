<template>
  <div v-if="back" class="breadcrumbs">
    <router-link to="/" class="text-white">Вернуться назад</router-link>
  </div>
  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="header"/>
    </h1>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    document.title = `${props.title} | Клон Банка `
  }

}
</script>

<style scoped>

</style>
