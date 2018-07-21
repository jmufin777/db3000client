<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Regular"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Regular"
            placeholder="Placeholder"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Solo"
            solo
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Solo"
            placeholder="Placeholder"
            solo
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Box"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Box"
            placeholder="Placeholder"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Outline"
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Outline"
            placeholder="Placeholder"
            outline
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import formHelper from './formHelper.vue'
export default {
  components: {
    'form-helper': formHelper
  },
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    handleSubmit () {

    }
  }

}
</script>
<style scoped>
</style>
