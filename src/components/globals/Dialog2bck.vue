<template>
    <v-dialog
      v-model="dialog"
      width="800"
      height="600px"

      @click.native="dialog=false;show=false"
      @keydown.esc="dialog = false; show=false;"
    >
      <v-card>
        <!-- <v-card-title class="headline">Use Google's location service?</v-card-title> -->

        <v-card-text @click.native="show=false">
          <slot name="nahled">
          Nahled
          </slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>



          <v-btn
            color="green darken-1"
            text
            @click="dialog = false; show=false"
          >
            Zavrit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>



<script>
  import f from '@/services/fce'
  export default {
    props: [
    'title',
    'show'
    ],
    data () {
      return {
        dialog: false,
        f:f


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
