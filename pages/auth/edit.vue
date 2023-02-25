<template>
    <div>
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <img src="/images/arrowLeft-black.png" alt="" style="width:14px;" @click="$router.go(-1)">
                </div>
                <div class="center">
                    <h3 class="title">내 정보 수정</h3>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="area-register"@keydown="() => errors = ''">
            <!-- 내용 영역 -->
            <div class="container">
                <div class="wrap">
                    <div class="mt-40"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">이름</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="이름 입력" v-model="form.nickname">
                        </div>

                        <p class="m-input-error" v-if="errors.nickname" v-text="errors.nickname[0]"></p>
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

                        <input-region :city="$auth.user.district.city" :state="$auth.user.district.state" :district_id="$auth.user.district.id" :district="$auth.user.district" @change="(data) => {form.district_id = data.district_id}"/>

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

                    <div class="mt-24"></div>

                    <button type="submit" class="m-btn type02 width-100" @click="update">수정하기</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import InputRegion from "~/components/inputRegion";

export default {
    components: {InputRegion},
    auth: true,
    data() {
        return {
            step: 1,
            form: {
                nickname: this.$auth.user.nickname,
                birth: this.$auth.user.birth,
                phone: this.$auth.user.phone,
                gender: this.$auth.user.gender,
                referrer: this.$auth.user.referrer,
                district_id: this.$auth.user.district.id,
            },
            errors: {},
        }
    },
    methods: {
        update() {
            this.$axios.put("/users", this.form)
                .then((response) => {
                    this.$auth.setUser(response.data.data);

                    this.$store.commit("changeDistrict",this.$auth.user.district);

                    alert(response.data.message);

                    return this.$router.back();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

    },

    computed: {

    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
