<template>
  <q-page-container>
    <q-page class="flex items-center">
      <q-card flat class="main-card q-mx-auto columns">
        <q-card-section class="text-center text-weight-bold text-h4 q-my-lg">
          로그인
        </q-card-section>
        <q-card-section class="q-py-none q-px-xl">
          <q-form ref="loginForm" @submit.prevent="onSubmit" class="q-gutter-sm">
            <q-input
              placeholder="아이디"
              v-model="account"
              input-class="q-px-md"
              filled
            >
              <span class="blind"></span>
            </q-input>
            <q-input
              placeholder="비밀번호"
              v-model="password"
              :type="showPasswordFlag ? 'text' : 'password'"
              input-class="q-px-md"
              filled
            >
              <template #append>
                <q-icon
                  :name="showPasswordFlag ? 'visibility' : 'visibility_off'"
                  class="q-field__focusable-action q-px-md"
                  type="button"
                  tag="button"
                  @click="() => { showPasswordFlag = !showPasswordFlag; }"
                ></q-icon>
              </template>
              <span class="blind"></span>
            </q-input>

            <div class="flex justify-center items-center q-px-xl q-pt-lg">
              <q-btn
                label="로그인"
                type="submit"
                color="primary"
                class="full-width text-bold text-subtitle1">
                <span class="blind">로그인</span>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
        <!-- <q-card-section class="q-pa-none q-mt-md">
          <div class="flex justify-center items-center q-gutter-xs">
            <span class="">
              아이디 찾기
            </span>
            <span>/</span>
            <span class="">
              비밀번호 찾기
            </span>
          </div>
        </q-card-section> -->
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SignIn",
  data() {
    return {
      account: "",
      password: "",

      showPasswordFlag: false,
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$store
        .dispatch('AuthModule/login', {
          account: this.account,
          password: this.password,
        })
        .then(({ content, context }) => {
          if (content.token === null) {
            alert("2차 로그인 필요");
          } else {
            this.$q.notify({
              message: "로그인 되었습니다.",
              icon: "done_all",
              color: "primary",
            });
            this.$router.push("/");
          }
        });
    },
  },
});
</script>

<style lang="sass" scoped>
.main-card
  width: 500px
  height: 400px
</style>
