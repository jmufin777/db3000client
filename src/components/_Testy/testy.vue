<template>
  <v-container>
    <panel title="menu2">
    <v-btn @click="component = 'form-one'">Show form 1</v-btn>
    <v-btn @click="component = 'form-two'">Show form 2</v-btn>
    <v-btn @click="component = 'form-three'">Show form 3</v-btn>
    <v-btn @click="component = 'form-sel'">Show form SEL:</v-btn>
    <v-btn @click="component = 'tree-view'">Tree View:</v-btn>

    <!-- <keep-alive> -->
      <component v-bind:is="component"></component>
    <!-- </keep-alive> -->
    </panel>
  </v-container>

</template>

<script>
// import Api from '@/services/Api'
import formOne from './formOne.vue'
import formTwo from './formTwo.vue'
import formThree from './formThree.vue'
import formSel from './formSel.vue'
import treeView from './TreeView.vue'
// import {mapState} from 'vuex'

export default {
  components: {
    'form-one': formOne,
    'form-two': formTwo,
    'form-three': formThree,
    'form-sel': formSel,
    'tree-view': treeView
  },
  data () {
    return {
      component: 'tree-view'
    }
  },
  methods: {
    handleSubmit () {
      alert('aaa')
    },
    Desktop () {
      this.$router.push({ name: 'desktop' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: yellow;
}
</style>
