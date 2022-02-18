<template>
  <!-- <canvas id="gc" width="400" height="400"></canvas> -->
  <canvas id="gc"></canvas>
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

      gameStatus: false
    }
  },
  mounted() {
    canvas = document.getElementById("gc") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    document.addEventListener("keydown", this.keyPush);
    document.addEventListener("keydown", this.startGame);

    canvas.width = (canvas?.parentElement?.offsetWidth as number) - 24;
    canvas.height = (canvas?.parentElement?.offsetHeight as number) - 24;

    this.resetMap();
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.keyPush);
    document.removeEventListener("keydown", this.startGame);
    clearInterval(gameInterval);
  },

  methods: {
    startGame(evt: KeyboardEvent) {
      if([ 37, 38, 39, 40 ].includes(evt.keyCode) && !this.gameStatus) {
        gameInterval = setInterval(this.game, 1000/15);
        this.gameStatus = true;
      }
    },

    // 배경
    resetMap() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    game() {
      this.player.x += this.move.x;
      this.player.y += this.move.y;

      if (this.player.x < 0) {
        this.player.x = 40 - 1;
      }
      if (this.player.x > 40 - 1) {
        this.player.x = 0;
      }
      if (this.player.y < 0) {
        this.player.y = 40 - 1;
      }
      if (this.player.y > 40 - 1) {
        this.player.y = 0;
      }

      this.resetMap();

      // 점수
      if ((this.score.x === this.player.x) && (this.score.y === this.player.y)) {
        this.tail++;
        this.score.x = Math.floor(Math.random() * this.size);
        this.score.y = Math.floor(Math.random() * this.size);
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
        case 37:
          this.move = { x: -1, y: 0 }
          break;
        case 38:
          this.move = { x: 0, y: -1 }
          break;
        case 39:
          this.move = { x: 1, y: 0 }
          break;
        case 40:
          this.move = { x: 0, y: 1 }
          break;
      }
    },
  },
});
</script>
