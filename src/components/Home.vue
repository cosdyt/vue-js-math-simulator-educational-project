<template>
  <div class="container text-xs-center mt-5">
    <v-container>
      <v-layout column align-center>
        <h1 class="my-4 white--text">Математический симулятор</h1>
        <h2 class="mb-3 white--text">Выберите сложность:</h2>
        <v-container fluid>
          <v-layout column align-center>
              <v-btn
                v-for="(button, i) in buttons"
                :key="i"
                :class="button.class"
                @click="$store.commit('clearAll')"
                :to="button.url"
                round
              >
                <v-icon left>{{button.icon}}</v-icon>
                {{button.title}}
              </v-btn>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      buttons () {
        return [
          {title: 'Я преклоняюсь перед царицей наук', icon: 'mood', url: '/easy_level', class: 'primary'},
          {title: 'Я ее верный союзник', icon: 'group', url: '/medium_level', class: 'warning'},
          {title: 'Я повеливаю царицей наук', icon: 'school', url: '/hard_level', class: 'error'}
        ]
      }
    }
  }
</script>
