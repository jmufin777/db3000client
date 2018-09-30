<template>
  <div class="text-xs-right">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <!-- <v-btn
        slot="activator"
        color="red lighten-2"
        dark
      >
        Click Me
      </v-btn> -->

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
           {{ title }}
        </v-card-title>

        <v-card-text>

          <slot name="title2"></slot>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         <slot name="tlacitko"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: [
    'title',
    'show'
    ],
    data () {
      return {
        dialog: true,


      }
    },
    updated(){

        if (this.show) {
          this.dialog= true
        }



    },
    mounted() {
      // alert('DLG' + this.title )
    }
  }
</script>
