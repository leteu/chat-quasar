<template>
  <q-card class="main-card">
    <q-card-section class="card-header flex items-center relative">
      <div class="card-header__img-box q-pa-sm">
        <q-icon name="person" color="grey-7" size="4rem" ></q-icon>
      </div>
      <div class="card-header__info">
        <div class="card-header__info-name fs-175 text-weight-bold text-white">
          {{decodeToken().name}}
        </div>
        <div class="card-header__info-account fs-110 text-grey-4 text-weight-midium">
          <i>{{decodeToken().account}}</i>
        </div>
      </div>
    </q-card-section>
    <!-- <q-card-section>
      {{decodeToken()}}
    </q-card-section> -->
    <q-card-section class="text-center q-gutter-xs q-pa-xs">
      <!-- <q-btn
        dense
        outline
        label="마이페이지"
        color="primary"
        class="q-px-sm"
        size="0.8em"
        @click="onClickMypage()"
      /> -->

      <q-btn
        dense
        label="로그아웃"
        color="primary"
        class="q-px-sm"
        size="0.8em"
        @click="onClickLogout"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserInfo',

  methods: {
    onClickLogout() {
      this.$store
        .dispatch('AuthModule/logout')
        .then(() => {
          this.$q.notify({
            message: '로그아웃 되었습니다.',
            icon: 'done_all',
            color: 'primary'
          })
          this.$router.push({name: 'SignIn'});
        })
    },

    onClickMypage() {
      this.$router.push({ path: '/user/save', query: { id: this.decodeToken().id } });
    }
  }
})
</script>

<style lang="sass" scoped>
.main-card
  width: 400px
.card-header
  background: $teal-4
  &__img-box
    width: 80px
    height: 80px
    border-radius: 40px
    background: $grey-4
    display: flex
    align-items: center
    justify-content: center
    overflow: hidden
    border: 4px solid #fff
    margin-left: 8px
  &__info
    margin-left: 16px
  &__info-account
    margin-left: 4px
</style>
