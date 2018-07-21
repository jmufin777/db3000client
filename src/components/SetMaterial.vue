<template>
  <v-container>
    <slot></slot>
    Materialy
    <v-flex xs12 sm6 md3>
          <v-text-field
            label="Box"
            box
          ></v-text-field>
    </v-flex>
  </v-container>
</template>

<script>
export default {
}
</script>
<style scoped>
</style>
