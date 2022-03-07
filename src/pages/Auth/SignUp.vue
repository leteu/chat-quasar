<template>
  <q-page-container>
    <q-page class="flex items-center">
      <q-card flat class="main-card q-mx-auto columns">
        <q-card-section class="text-center text-weight-bold text-h4 q-my-lg">
          회원가입
        </q-card-section>
        <q-card-section class="q-pt-none q-mb-lg q-px-xl">
          <q-form ref="loginForm" class="q-gutter-y-md" :refs="QFormRef" @submit="onSubmit">
            <div class="relative-position">
              <div class="text-bold small-font essentials">아이디</div>
              <q-input
                dense
                square
                outlined
                v-model="account"
                :rules="[val => !!val && !!val.trim() || '']"
                class="hideErrorMessageSlot"
                hide-bottom-space
              />
            </div>
            <div class="relative-position">
              <div class="text-bold small-font essentials">비밀번호</div>
              <q-input
                dense
                square
                outlined
                v-model="password"
                :rules="[val => !!val && !!val.trim() || '']"
                class="hideErrorMessageSlot"
                hide-bottom-space
              />
            </div>
            <div class="relative-position">
              <div class="text-bold small-font essentials">비밀번호 확인</div>
              <q-input
                dense
                square
                outlined
                v-model="passwordChk"
                :rules="[val => !!val && !!val.trim() || '']"
                class="hideErrorMessageSlot"
                hide-bottom-space
              />
            </div>
            <div class="relative-position">
              <div class="text-bold small-font essentials">닉네임</div>
              <q-input
                dense
                square
                outlined
                v-model="nickname"
                :rules="[val => !!val && !!val.trim() || '']"
                class="hideErrorMessageSlot"
                hide-bottom-space
              />
            </div>
            <div class="relative-position">
              <div class="text-bold small-font essentials">카카오 연동</div>
              <template v-if="!kakaoLinkStatus">
                <div class="flex items-center justify-center kakao-btn cursor-pointer" @click="loginWithKakao">
                  <img :src="require('app/public/kakao_login_medium_narrow.png')" alt="">
                </div>
              </template>
              <template v-else>
                <div class="flex items-center justify-center kakao-btn__checked text-positive text-weight-bold fs-115">
                  <span class="q-mr-sm">
                    <q-icon name="done_all" size="sm" />
                  </span>
                  <span  class="q-ml-sm">인증되었습니다.</span>
                </div>
              </template>
            </div>

            <div class="flex justify-center items-center q-px-xl q-pt-lg q-ma-none">
              <q-btn
                label="회원가입"
                type="submit"
                color="primary"
                class="full-width text-bold text-subtitle1"
              >
                <span class="blind">회원가입</span>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import axios from 'axios';
import { QForm } from 'quasar';
import { Nullable } from 'src/assets/common/type/Nullable';
import { defineComponent, Ref, ref, onMounted } from 'vue'

declare global {
    interface Window { Kakao: any; }
}

export default defineComponent({
  setup() {
    const account = ref('');
    const password = ref('');
    const passwordChk = ref('');
    const nickname = ref('');
    const kakaoLinkStatus = ref(false) as Ref<boolean>;
    const QFormRef = ref(null) as Ref<Nullable<QForm>>;

    function KakaoInitKey() {
      window.Kakao.init(process.env.KAKAO_KEY);
      window.Kakao.Auth.getAccessToken()
    }

    function loginWithKakao() {
      window.Kakao.Auth.login({
        success: function(authObj: any) {
          // alert(JSON.stringify(authObj))
          kakaoLinkStatus.value = true;
        },
        fail: function(err: any) {
          // alert(JSON.stringify(err))
        },
      })
    }

    function onSubmit() {
      axios.post('member/save', {
        id: null,
        name: nickname.value,
        account: account.value,
        password: password.value,
        passwordConfirm: passwordChk.value
      })
    }

    onMounted(() => {
      if (window.Kakao) {
        KakaoInitKey();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => KakaoInitKey();
        script.src = `//developers.kakao.com/sdk/js/kakao.js`;
        document.head.appendChild(script);
      }
    })

    return {
      //datas
      account,
      password,
      passwordChk,
      nickname,
      kakaoLinkStatus,

      //refs
      QFormRef,

      //functions
      loginWithKakao,
      onSubmit
    }
  },
})
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
