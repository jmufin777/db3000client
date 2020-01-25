<template>
  <div class="text-xs-right">
    <table v-if="list && list.length">
      <thead>
        <tr v-for="(i1, idx) in list" :key="i1.idx" v-if="idx==0">
          <th v-for="(i1 ,idyz) in i1" :key="idyz">{{ idyz }}</th>
        </tr>
      </thead>
      <tr v-for="(i1, idx) in list" :key="idx">
        <td v-for="(i2 ,idy) in i1" :key="idy">{{ i2 }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      dialog: true
    };
  },

  mounted() {
    // alert('DLG' + this.title )
  }
};
</script>
