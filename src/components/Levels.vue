<template>
  <div>
    <div class="mt-5 ml-5">
      <v-btn
        class="error"
        :to="'/'"
      >
        <v-icon>arrow_left</v-icon>
        На Главную
      </v-btn>
    </div>
    <div class="container text-xs-center">
      <v-container>
        <v-layout column align-center>
          <h1 v-if="$route.params.level === 'easy_level'" class="display-2 mb-4 white--text">Легкий уровень</h1>
          <h1 v-if="$route.params.level === 'medium_level'" class="display-2 mb-4 white--text">Средний уровень</h1>
          <h1 v-if="$route.params.level === 'hard_level'" class="display-2 mb-4 white--text">Тяжелый уровень</h1>
          <p class="display-1 red--text">{{task}}</p>
          <div>
            <div>
              <v-text-field
                solo-inverted
                dark
                v-if="!isActive && $route.params.level === 'easy_level'"
                color="success"
                placeholder="Ваш ответ"
                type="number"
                clearable
                v-model="userAnswer"
                @keyup.enter="randTask(10, 1)"
              ></v-text-field>
              <v-text-field
                solo-inverted
                dark
                v-if="!isActive && $route.params.level === 'medium_level'"
                color="success"
                placeholder="Ваш ответ"
                type="number"
                clearable
                v-model="userAnswer"
                @keyup.enter="randTask(50, 11)"
              ></v-text-field>
              <v-text-field
                solo-inverted
                dark
                v-if="!isActive && $route.params.level === 'hard_level'"
                color="success"
                placeholder="Ваш ответ"
                type="number"
                clearable
                v-model="userAnswer"
                @keyup.enter="randTask(100, 1)"
              ></v-text-field>
            </div>
            <v-btn
              @click="startGame(10, 1)"
              v-if="isActive && $route.params.level === 'easy_level'"
              class="warning"
            >Начать
            </v-btn>
            <v-btn
              @click="startGame(50, 11)"
              v-if="isActive && $route.params.level === 'medium_level'"
              class="warning"
            >Начать
            </v-btn>
            <v-btn
              @click="startGame(100, 1)"
              v-if="isActive && $route.params.level === 'hard_level'"
              class="warning"
            >Начать
            </v-btn>
            <v-btn
              fab
              class="success mt-3"
              v-if="!isActive && $route.params.level === 'easy_level'"
              @click="randTask(10, 1)"
            >
              <v-icon>drag_handle</v-icon>
            </v-btn>
            <v-btn
              fab
              class="success mt-3"
              v-if="!isActive && $route.params.level === 'medium_level'"
              @click="randTask(50, 11)"
            >
              <v-icon>drag_handle</v-icon>
            </v-btn>
            <v-btn
              fab
              class="success mt-3"
              v-if="!isActive && $route.params.level === 'hard_level'"
              @click="randTask(100, 1)"
            >
              <v-icon>drag_handle</v-icon>
            </v-btn>
            <div v-if="error" class="error mt-3 px-2 py-2">
              <p class="title white--text">Введите Ваш ответ!</p>
            </div>
            <p
              v-if="!isActive"
              class="title white--text mt-3"
            >Правильных ответов: {{countRight}}, Неправильных ответов: {{countWrong}}
            </p>
          </div>
        </v-layout>
      </v-container>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="title">Правильный ответ - {{getScore}}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="$route.params.level === 'easy_level'"
              class="success white--text"
              @click.stop="continueGame(10, 1)"
            >Ok
            </v-btn>
            <v-btn
              v-if="$route.params.level === 'medium_level'"
              class="success white--text"
              @click.stop="continueGame(50, 11)"
            >Ok
            </v-btn>
            <v-btn
              v-if="$route.params.level === 'hard_level'"
              class="success white--text"
              @click.stop="continueGame(100, 1)"
            >Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import {mapFields} from 'vuex-map-fields'

  export default {
    computed: {
      getScore () {
        return this.$store.getters.getScore
      },
      ...mapFields([
        'userAnswer',
        'countRight',
        'countWrong',
        'isActive',
        'error',
        'dialog',
        'task'
      ])
    },
    methods: {
      startGame (max, min) {
        this.$store.dispatch('startGame', {
          max,
          min
        })
      },
      randTask (max, min) {
        this.$store.dispatch('randTask', {
          max,
          min,
          userAnswer: this.userAnswer,
          error: this.error
        })
        this.userAnswer = ''
      },
      continueGame (max, min) {
        this.$store.dispatch('continueGame', {
          max,
          min,
          userAnswer: this.userAnswer
        })
        this.userAnswer = ''
      }
    }
  }
</script>
