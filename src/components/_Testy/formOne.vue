<template>
  <v-container fluid grid-list-md >
    <input type='text' placeholder="form_1" required />
     <v-flex xs12 sm6 md3>
          <v-text-field
            label="Jmeno"
            placeholder="aaaa"
            autofocus
            v-model="blog.jmeno1"
            box
          ></v-text-field>
          <v-date-picker
      v-model="blog.jmeno1"
      width="190"
      class="mt-0 pt-0  caption"
      locale="cs-cz"
      header-color="silver"
      reactive

    ></v-date-picker>
    <v-time-picker
      v-model="blog.jmeno1"
      width="190"
      class="mt-0 pt-0  caption"
      locale="cs-cz"
      header-color="silver"
      reactive

    ></v-time-picker>
          <v-text-field
            label="jemno 2"
            placeholder="aaaa"
            solo

            outline
          ></v-text-field>
        </v-flex>
      <v-layout row wrap>
      <v-flex xs6>
       <v-textarea name="input-7-1"
          label="TextArea test"
          value="Text prvni"
          hint="Hint text"
          solo
          dark
        >aaaa</v-textarea>
      </v-flex>

      </v-layout>

        <div v-for="(a, index) in blog.kat" :key="index">
          {{ a }}
       </div>
    <v-layout wrap>
      <v-flex xs12>
        <v-checkbox
          append-icon="close"
          prepend-icon="phone"
          v-model="blog.kat"
          value="a"
          xs1
          class="caption"
        >
          Default Slot
        </v-checkbox>
        <v-checkbox
          append-icon="close"
          prepend-icon="all_out"
          v-model="blog.kat"
          value="b"
          xs1
        >
          Default Slot
        </v-checkbox>
      </v-flex>
       <v-flex xs12 sm6 d-flex>
        <v-combobox
          v-model="select"
          :items="items"
          label="Standard"
          style='width:20%;color:magenta'
        ></v-combobox>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      select: 'Programming',
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify'
      ],
      picker: null,
      landscape: false,
      reactive: false,
      blog: {
        kat: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        jmeno1: '',
        jmeno2: ''
      }
    }
  }
}
</script>
<style scoped>
</style>
