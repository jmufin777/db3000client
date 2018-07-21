<template>
  <div class="white elevation-0 pa-0 ma-0 "  >
    <v-toolbar flat dense class="green" color="green"  extensionHeight="12">
      <v-toolbar-title>{{title}}<slot name="title1"></slot></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <slot name="action" />
    </v-toolbar>
    <div class="pl-1 pr-1 pt-1 pb-1" >
      <slot>
        No slot content defined.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>
