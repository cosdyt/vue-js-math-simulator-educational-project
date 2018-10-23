<template>
  <v-app>
    <v-content class="info">
      <transition enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                  mode="out-in"
      >
        <router-view></router-view>
      </transition>
      <div class="container text-xs-center">
        <v-btn
          class="success"
          @click="help = !help"
        >Справка
        </v-btn>
      </div>
    </v-content>
    <v-dialog v-model="help" max-width="400">
      <v-card>
        <v-card-title class="info">
          <div class="container text-xs-center">
            <h2 class="white--text">Справка:</h2>
          </div>
          <p class="white--text">Все десятичные дроби приведены к конечному виду, до сотых.</p>
          <p class="white--text">Пример:<br>
            9 / 7 = 1.28571428571<br>
            Правильный ответ будет - 1.29
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success white--text" @click.stop="help = !help">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        help: false
      }
    }
  }
</script>
