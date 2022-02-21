<template>
  <div class="full-width height-200px flex items-center justify-between">
    <YachtDice :diceValue="1" />
    <YachtDice :diceValue="2" />
    <YachtDice :diceValue="3" />
    <YachtDice :diceValue="4" />
    <YachtDice :diceValue="5" />
    <YachtDice :diceValue="6" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YachtDice from './YachtDice'

export default defineComponent({
  components: {
    YachtDice
  },
  setup() {
    
  },
})
</script>

<style lang="sass">
@import './style/dice'
</style>
