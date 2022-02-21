<template>
  <div id="container">
    <div class="height-full full-width flex items-center justify-center q-gutter-x-sm">
      <q-card
        v-for="(game, index) in gameList"
        :key="`game-${index}`"
        square
        bordered
      >
        <q-card-section>
          {{game.label}}
        </q-card-section>
        <q-card-section class="text-center">
          <q-btn label="바로가기" color="primary" @click="goGame(game.value)" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import SnakeComponentVue from 'src/components/SnakeComponent.vue'
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router';

interface Game {
  label: string,
  value: string,
  path: string,
}

export default defineComponent({
  setup() {
    const router = useRouter();


    const gameList = [
      {
        label: '스네이크 게임',
        value: 'snakeGame',
        path: '/game/snake-game'
      },
      {
        label: '요트 다이스',
        value: 'yacht',
        path: '/game/yacht'
      },
    ] as Game[];

    function goGame(name: string) {
      router.push({name});
    }

    return {
      gameList,
      goGame
    }
  }
})
</script>

<style lang="sass">
.height-full
  height: 100% !important

@media screen and (max-width: 768px)
  .height-full
    height: calc(100% - 110px) !important
    touch-action: none
</style>
