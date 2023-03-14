<template>
    <div class="area-write area-staff">
        <form action="" @submit.prevent="store">
            <!-- 헤더영역 -->
            <div class="m-header type02">
                <div class="wrap">
                    <div class="left">
                        <a href="#" class="btn-text" @click.prevent="$router.back()">종료</a>
                    </div>
                    <div class="center">
                        <div class="m-input-select type01">
                            <select name="" id="" @change="move">
                                <option value="/infos/create">내 마을 소개</option>
                                <option value="/staffs/create">내 마을 임원진</option>
                                <option value="/contacts/create" selected>내 마을 활동</option>
                            </select>
                        </div>
                    </div>
                    <div class="right">
                        <button class="btn-text primary">저장</button>
                    </div>
                </div>
            </div>

            <!-- 내용 영역 -->
            <div class="container" @keyup="errors = {}">
                <div class="wrap">
                    <div class="m-input-wrap">
                        <h3 class="m-input-title">이름</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="이름" v-model="form.korean_name">
                        </div>

                        <div class="m-input-error" v-if="errors.korean_name">{{errors.korean_name[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">국회의원코드</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="국회의원코드" v-model="form.congress_code">
                        </div>

                        <div class="m-input-error" v-if="errors.congress_code">{{errors.congress_code[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">사무실 전화</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="사무실 전화" v-model="form.congress_phone">
                        </div>

                        <div class="m-input-error" v-if="errors.congress_phone">{{errors.congress_phone[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">의원 홈페이지</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="의원 홈페이지" v-model="form.congress_homepage">
                        </div>

                        <div class="m-input-error" v-if="errors.congress_homepage">{{errors.congress_homepage[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">이메일</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="이메일" v-model="form.congress_email">
                        </div>

                        <div class="m-input-error" v-if="errors.congress_email">{{errors.congress_email[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">주요 학력</h3>

                        <div class="m-input-textarea type01">
                            <textarea name="" id="" v-model="form.histories" style="height:200px;"></textarea>
                        </div>

                        <div class="m-input-error" v-if="errors.histories">{{errors.histories[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <div class="item-top mt-20">
                            <h3 class="title">프로필 사진</h3>
                        </div>

                        <img :src="imgUrl" alt="" v-if="imgUrl">

                        <div class="m-input-error" v-if="errors.photo">{{errors.photo[0]}}</div>
                    </div>

                    <p class="m-comment type02" v-if="!imgUrl">* 하단 프로필 사진 버튼을 눌러 이미지를 등록해주세요.</p>

                    <div class="mt-40"></div>
                </div>
            </div>

            <!-- 하단 네비게이션바 -->
            <div class="m-navigation type01">
                <div class="navs">
                    <div class="nav-wrap">
                        <input-img id="img2" title="프로필 사진" @changeFile="(data) => {this.form.photo = data}" @change="(data) => { this.imgUrl = data.url}"/>
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
import draggable from 'vuedraggable';
import Form from "../../utils/Form";
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";

export default {
    components: {draggable,InputAddress, InputThumbnail, InputImg, InputLink, InputCamera},
    auth: true,
    data() {
        return {
            items: [],

            item: {},

            form: {
                district_id: this.$auth.user.district.id,

                congress_code: "",
                korean_name: "",
                picture: "",
                congress_phone: "",
                congress_office: "",
                congress_homepage: "",
                congress_email: "",
                histories: "",

                photo: "",
            },

            imgUrl: "",

            errors: {},
        }
    },
    methods: {

        store() {
            let form = (new Form(this.form)).data();

            this.$axios.post("/districts/" + this.form.district_id + "/contacts", form)
                .then((response) => {
                    this.items.push(response.data.data);

                    this.reset();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

        move(e){
            this.$router.push(e.target.value);
        },

        reset(){
            this.form = {
                ...this.form,
                congress_code: "",
                korean_name: "",
                picture: "",
                congress_phone: "",
                congress_office: "",
                congress_homepage: "",
                congress_email: "",
                histories: "",

                photo: "",
            }

            this.imgUrl = "";
        }
    },

    mounted() {
        this.$axios.get("/districts/" + this.form.district_id + "/contacts")
            .then(response => {
                this.item = response.data.data;

                this.form = {...this.form, ...this.item};

                if(this.item && this.item.img)
                    this.imgUrl = this.item.img.url;
            });
    }
}
</script>

