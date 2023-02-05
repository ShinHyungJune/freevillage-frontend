<template>
    <div>
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <img src="/images/arrowLeft-black.png" alt="" style="width:14px;" @click="$router.go(-1)">
                </div>
                <div class="center">
                    <h3 class="title">회원가입</h3>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="area-register-checkPolicy" v-if="step === 1">
            <!-- 내용 영역 -->
            <div class="container">
                <div class="wrap">
                    <div class="mt-40"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" checked v-if="isAgreeAll">
                        <input type="checkbox" v-else>

                        <label for="" @click="agreeAll">전체동의</label>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree1" v-model="agree1">
                        <label for="agree1">
                            (필수) 이용약관 동의
                            <a href="#" class="link">약관보기</a>
                        </label>
                    </div>

                    <div class="mt-4"></div>

                    <div class="m-input-textarea type01">
                        <div class="fake">제 1 조 (목적)
                            이 이용약관(이하 “본 약관”이라 합니다)은 “"광화문온"”에서 제공하는 인터넷 서비스를 이용함에 있어 회원과 "광화문온"의 권리 의무 및 책임사항 규정함을 목적으로
                            합니다.

                            제 2 조 (용어의 정의)
                        </div>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree2" v-model="agree2">
                        <label for="agree2">
                            (필수) 개인정보처리방침 동의
                            <a href="#" class="link">약관보기</a>
                        </label>
                    </div>

                    <div class="mt-4"></div>

                    <div class="m-input-textarea type01">
                        <div class="fake">제 1 조 (목적)
                            * 수집목적: 개인식별, 서비스 이용을 위한 연락처
                            * 필수항목: 이름, 아이디, 비밀번호, 성별, 생년월일, 주소, 국가, 연락처
                            * 보유기간: 회원탈퇴시 즉시 파기
                        </div>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree3" v-model="agree3">
                        <label for="agree3">(필수) 만 14세 이상입니다.</label>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="is_agree_push" v-model="form.is_agree_push">
                        <label for="is_agree_push">(선택) 푸시(알람서비스) 수신 동의</label>
                    </div>

                    <div class="mt-16"></div>

                    <div class="comment">
                        회원가입이 어려우신 경우
                        <br/><a href="tel:15228686" class="point">콜센터 ☎1522-8686</a>로 문의해주세요.
                    </div>
                    <div class="mt-24"></div>

                    <button class="m-btn type02 width-100" @click="next">정보입력</button>
                </div>
            </div>
        </div>

        <div class="area-register" v-if="step === 2" @keydown="() => errors = ''">
            <!-- 내용 영역 -->
            <div class="container">
                <div class="wrap">
                    <div class="mt-40"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">이름</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="이름 입력" v-model="form.name">
                        </div>

                        <p class="m-input-error" v-if="errors.name" v-text="errors.name[0]"></p>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">생년월일</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="6자리 숫자 입력 (660510)" v-model="form.birth">
                        </div>

                        <p class="m-input-error" v-if="errors.birth" v-text="errors.birth[0]"></p>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">내 지역 선택</h3>

                        <input-region @change="(data) => {form.district_id = data.district_id}"/>

                        <p class="m-input-error" v-if="errors.district_id" v-text="errors.district_id[0]"></p>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">연락처</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="번호 입력(01077775555)" v-model="form.phone">
                        </div>

                        <p class="m-input-error" v-if="errors.phone" v-text="errors.phone[0]"></p>

                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">성별</h3>

                        <div class="m-input-checkboxes type01">
                            <div class="m-input-checkbox">
                                <input type="radio" id="남" value="남" v-model="form.gender">
                                <label for="남">남</label>
                            </div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="여" value="여" v-model="form.gender">
                                <label for="여">여</label>
                            </div>
                        </div>

                        <p class="m-input-error" v-if="errors.gender" v-text="errors.gender[0]"></p>

                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">추천인 이름 / 연락처 등록</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="홍길동 / 01077775555" v-model="form.referrer">
                        </div>

                        <p class="m-input-error" v-if="errors.referrer" v-text="errors.referrer[0]"></p>

                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree" v-model="form.is_agree_privacy">
                        <label for="agree">개인정보 수집 및 이용에 동의함</label>
                    </div>

                    <div class="mt-24"></div>

                    <button type="submit" class="m-btn type02 width-100" @click="register">회원가입</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';
import InputRegion from "~/components/inputRegion";

export default {
    components: {InputRegion},
    auth: 'guest',
    data() {
        return {
            step: 1,
            form: {
                name: "",
                birth: "",
                phone: "",
                gender: "남",
                referrer: "",
                district_id: "",
                is_agree_privacy: false,
                is_agree_push: false,
            },
            agree1: false,
            agree2: false,
            agree3: false,
            errors: {},
        }
    },
    methods: {
        register() {
            if(!this.form.is_agree_privacy)
                return alert("필수약관에 동의해주세요.");

            this.$axios.post("/auth/register", this.form)
                .then((response) => {
                    this.login({
                        phone: this.form.phone,
                        password: this.form.birth,
                    }, () => {
                        this.$router.push("/auth/success");

                        this.$store.commit("changeDistrict", {
                            id: this.$auth.user.district_id,
                            district: "지역명 연동예정"
                        });
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

        agreeAll() {
            this.agree1 = true;
            this.agree2 = true;
            this.agree3 = true;
            this.form.is_agree_push = true;
        },

        next() {
            if (this.step === 1) {
                if (!this.agree1 || !this.agree2 || !this.agree3)
                    return alert("필수약관에 동의해주세요.");
            }

            this.step += 1;
        },

        login(data, callback) {
            this.$auth.loginWith('laravelSanctum', {data: data})
                .then((response) => {
                    callback();
                })
                .catch(e => {

                });
        },

    },

    computed: {
        isAgreeAll() {
            return this.agree1 && this.agree2 && this.agree3 && this.form.is_agree_push;
        }
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
