<template>
    <div class="area-login">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <img src="/images/arrowLeft-black.png" alt="" style="width:14px;" @click="$router.go(-1)">
                </div>
                <div class="center">
                    <h3 class="title"></h3>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-center type01">
                <div class="wrap">
                    <form @submit.prevent="login">
                        <img src="/images/logo-big.png" alt="" class="logo" style="width:150px;">

                        <h3 class="title">
                            환영합니다!
                            <br/>휴대폰 번호로 로그인 해주세요.
                        </h3>

                        <div class="m-input-wrap">
                            <div class="m-input-text type01">
                                <input type="text" placeholder="연락처 11자리(-없이 숫자만 입력)" v-model="form.phone">
                            </div>

                            <p class="m-input-error" v-if="errors.phone">{{ errors.phone[0] }}</p>
                        </div>

                        <div class="m-input-wrap">
                            <div class="m-input-text type01">
                                <input type="password" placeholder="비밀번호 (초기비밀번호 : 생년월일)" v-model="form.password">
                            </div>

                            <p class="m-input-error" v-if="errors.password">{{ errors.password[0] }}</p>
                        </div>

                        <div class="m-input-checkbox type01">
                            <input type="checkbox" id="agree">
                            <label for="agree">자동로그인</label>
                        </div>

                        <button class="m-btn type02 width-100">로그인</button>

                        <div class="links">
                            <nuxt-link to="/auth/register" class="link">회원가입</nuxt-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';

export default {
    name: "login",
    auth: 'guest',
    data() {
        return {
            form: {
                phone: "",
                password: ""
            },
            errors: {},
        }
    },
    methods: {
        login() {
            this.$auth.loginWith('laravelSanctum', {data: this.form})
                .then((response) => {
                    this.$store.commit("changeDistrict", this.$auth.user.district);

                    this.$router.push(this.$auth.$state.redirect ? this.$auth.$state.redirect : '/');
                })
                .catch(e => {
                    if (e.response.data.errors)
                        this.errors = e.response.data.errors;

                });
        },
        async loginTest(data) {
            await this.$auth.loginWith('laravelSanctum', {data: data})
        }
    },
    mounted() {


    }
}
</script>

<style scoped>

</style>
