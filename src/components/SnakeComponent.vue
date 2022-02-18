<template>
  <canvas id="gc" v-touch-swipe="touchSwipe"></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let gameInterval: NodeJS.Timeout;

const defaultTail = 1;

export default defineComponent({
  data() {
    return {
      size: 15,

      player: {
        x: 15,
        y: 15
      },

      score: {
        x: 15,
        y: 15,
      },

      move: {
        x: 0,
        y: 0
      },

      trailArr: [] as { x: number, y: number }[],
      tail: defaultTail,

      gameStatus: false,

      max: {
        width: 0,
        height: 0
      }
    }
  },
  mounted() {
    canvas = document.getElementById("gc") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.addEvent();
    this.resetSize();
    this.resetMap();
  },

  beforeUnmount() {
    this.removeEvent();
  },

  methods: {
    addEvent() {
      window.addEventListener('resize', this.resetSize);
      document.addEventListener("keydown", this.keyPush);
      canvas.addEventListener("click", this.startGame);
    },

    removeEvent() {
      window.removeEventListener('resize', this.resetSize);
      document.removeEventListener("keydown", this.keyPush);
      canvas.removeEventListener("click", this.startGame);
      clearInterval(gameInterval);
    },

    resetSize() {
      if(window.innerWidth <= 768) {
        canvas.width = (canvas?.parentElement?.offsetWidth as number);
        canvas.height = (canvas?.parentElement?.offsetHeight as number);
      } else {
        canvas.width = (15 * Math.floor((canvas?.parentElement?.offsetWidth as number) / 15)) - 30;
        canvas.height = (15 * Math.floor((canvas?.parentElement?.offsetHeight as number) / 15)) - 30;
      }

      this.max = {
        width: (canvas.width / this.size) - 1,
        height: (canvas.height / this.size) - 1
      }
    },

    startGame() {
      if(!this.gameStatus) {
        this.move = { x: 1, y: 0 };
        gameInterval = setInterval(this.game, 1000/15);
        this.gameStatus = true;
      }
    },

    // 배경
    resetMap() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    getScorePosition() {
      const position = {
        x: Math.floor(Math.random() * ((canvas.width / 15) - 1)),
        y: Math.floor(Math.random() * ((canvas.height / 15) - 1))
      };

      return position;
    },

    game() {
      this.player.x += this.move.x;
      this.player.y += this.move.y;

      if (this.player.x < 0) {
        this.player.x = this.max.width;
      }
      if (this.player.x > this.max.width) {
        this.player.x = 0;
      }
      if (this.player.y < 0) {
        this.player.y = this.max.height;
      }
      if (this.player.y > this.max.height) {
        this.player.y = 0;
      }

      this.resetMap();

      // 점수
      if ((this.score.x === this.player.x) && (this.score.y === this.player.y)) {
        this.tail++;
        this.$data.score = this.getScorePosition();
      }
      
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.score.x * this.size,
        this.score.y * this.size,
        this.size - 2,
        this.size - 2
      );

      // snake
      ctx.fillStyle = "lime";
      this.trailArr.forEach((item, index) => {
        ctx.fillRect(
          item.x * this.size,
          item.y * this.size,
          this.size - 2,
          this.size - 2
        );

        if ((item.x === this.player.x) && (item.y === this.player.y)) {
          this.gameStatus = false;
          alert(`게임 오버 \n 기록 : ${this.tail}`);
          clearInterval(gameInterval);
          this.tail = defaultTail;
          this.resetMap();
        }
      })

      this.trailArr.push({ x: this.player.x, y: this.player.y });
      while (this.trailArr.length > this.tail) {
        this.trailArr.shift();
      }
    },

    keyPush(evt: KeyboardEvent) {
      switch (evt.keyCode) {
        case 65:
        case 37:
          this.move = { x: -1, y: 0 }
          break;
        case 87:
        case 38:
          this.move = { x: 0, y: -1 }
          break;
        case 68:
        case 39:
          this.move = { x: 1, y: 0 }
          break;
        case 83:
        case 40:
          this.move = { x: 0, y: 1 }
          break;
      }
    },

    touchSwipe({direction}: { direction: 'up' | 'down' | 'left' | 'right' }) {
      switch (direction) {
        case 'left':
          this.move = { x: -1, y: 0 }
          break;
        case 'up':
          this.move = { x: 0, y: -1 }
          break;
        case 'right':
          this.move = { x: 1, y: 0 }
          break;
        case 'down':
          this.move = { x: 0, y: 1 }
          break;
      }
    },
  },
});
</script>
