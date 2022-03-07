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
            <div class="flex items-center justify-center kakao-btn cursor-pointer" @click="loginWithKakao">
              <img :src="require('app/public/kakao_login_medium_narrow.png')" alt="">
            </div>
          </q-form>
        </q-card-section>
        <q-card-section class="q-py-lg">
          <div class="flex justify-center items-center q-gutter-xs">
            <router-link :to="{ name: 'SignUp' }">회원가입</router-link>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import axios from "axios";
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
  mounted() {
    if (window.Kakao) {
      this.KakaoInitKey();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => this.KakaoInitKey();
      script.src = `//developers.kakao.com/sdk/js/kakao.js`;
      document.head.appendChild(script);
    }
  },
  methods: {
    KakaoInitKey() {
      window.Kakao.init(process.env.KAKAO_KEY);
      window.Kakao.Auth.getAccessToken()
    },

    loginWithKakao() {
      const _this = this;

      window.Kakao.Auth.login({
        success: function(authObj: any) {
          axios.post('v1/member/temporary', { accessToken: authObj.access_token })
            .then(({data}) => {
              if(data.response.status === 200) {
                _this.$store.dispatch('AuthModule/kakaoLogin', data.contents);

                _this.$q.notify({
                  message: "로그인 되었습니다.",
                  icon: "done_all",
                  color: "primary",
                });
                _this.$router.push("/");
              }
            })
        },
        fail: function(err: any) {
          // alert(JSON.stringify(err))
          alert('카카오 로그인에 실패했습니다.');
        },
      })
    },

    onSubmit() {
      this.$store
        .dispatch('AuthModule/login', {
          account: this.account,
          password: this.password,
        })
        .then(({ data, context }) => {
          console.log(data)
          // if (data.response.status === 401 && context.token === null) {
          //   alert("카카오 인증이 필요합니다.");
          // } else if(data.response.status === 200) {
          //   this.$q.notify({
          //     message: "로그인 되었습니다.",
          //     icon: "done_all",
          //     color: "primary",
          //   });
          //   this.$router.push("/");
          // } else {
          //   alert('로그인에 실패하였습니다.');
          // }
        });
    },
  },
});
</script>

<style lang="sass" scoped>
.main-card
  width: 500px

.kakao-btn
  background: #FEE500
  border-radius: 8px
  height: 45px
  &__checked
    background: white
    border: 2px solid $positive
    border-radius: 8px
    height: 45px
</style>
