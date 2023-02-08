<template>
    <div class="area-write area-staff">
        <!-- 헤더영역 -->
        <div class="m-header type02" @keyup="errors = {}">
            <div class="wrap">
                <div class="left">
                    <a href="#" class="btn-text" @click.prevent="$router.back()">종료</a>
                </div>
                <div class="center">
                    <div class="m-input-select type01">
                        <select name="" id="" @change="move">
                            <option value="/infos/create">내 마을 소개</option>
                            <option value="/staffs/create" selected>내 마을 임원진</option>
                            <option value="/contacts/create">내 마을 활동</option>
                        </select>
                    </div>
                </div>
                <div class="right">
                    <a href="#" class="btn-text primary" @click.prevent="store">추가</a>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="wrap">
                <div class="m-input-wrap">
                    <h3 class="m-input-title">직분</h3>

                    <div class="m-input-text type01">
                        <input type="text" placeholder="직분명" v-model="form.position">
                    </div>

                    <div class="m-input-error" v-if="errors.position">{{errors.position[0]}}</div>

                </div>

                <div class="m-input-wrap">
                    <h3 class="m-input-title">이름</h3>

                    <div class="m-input-text type01">
                        <input type="text" placeholder="이름" v-model="form.name">
                    </div>

                    <div class="m-input-error" v-if="errors.name">{{errors.name[0]}}</div>
                </div>

                <div class="m-input-wrap">
                    <h3 class="m-input-title">연락처</h3>

                    <div class="m-input-text type01">
                        <input type="text" placeholder="연락처" v-model="form.phone">
                    </div>

                    <div class="m-input-error" v-if="errors.phone">{{errors.phone[0]}}</div>
                </div>

                <div class="m-input-wrap">
                    <h3 class="m-input-title">임원진 사진</h3>

                    <img :src="imgUrl" alt="" v-if="imgUrl">

                    <div class="m-input-error" v-if="errors.photo">{{errors.photo[0]}}</div>
                </div>

                <p class="m-comment type02" v-if="!form.info">* 하단 임원진 사진 버튼을 눌러 이미지를 등록해주세요.</p>

                <div class="items">
                    <div class="item" v-for="item in items.data" :key="item.id">
                        <div class="item-top">
                            <h3 class="title">{{item.name}}</h3>

                            <button class="btn-remove red" @click="remove(item)">삭제</button>
                        </div>

                        <div class="img-wrap" v-if="item.img">
                            <a :href="item.phone" class="btn-call" v-if="item.phone">
                                <img src="/images/call.png" alt="" style="width:17px;">
                            </a>

                            <img :src="item.img.url" alt="" v-if="item.img">
                        </div>

                    </div>
                </div>
                <div class="mt-40"></div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="navs">
                <div class="nav-wrap">
                    <input-img id="img2" title="임원진 사진" @changeFile="(data) => form.photo = data" @change="(data) => { this.imgUrl = data.url}"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";
import Form from "@/utils/Form";

export default {
    components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera},
    auth: true,
    data() {
        return {
            items: {
                data: []
            },

            item: "",

            form: {
                district_id: this.$auth.user.district.id,
                phone: "",
                name: "",
                position: "",
                photo: "",
            },

            imgUrl: "",

            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        move(e){
            this.$router.push(e.target.value)
        },

        store() {
            let form = (new Form(this.form)).data();

            this.$axios.post("/districts/" + this.form.district_id + "/staff", form)
                .then((response) => {
                    this.items.data.push(response.data.data);

                    this.reset();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

        remove(item){
            this.$axios.delete("/districts/" + this.form.district_id + "/staff/" + item.id)
                .then(response => {
                    this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                });
        },

        reset(){
            this.form = {
                ...this.form,
                phone: "",
                name: "",
                position: "",
                photo: "",
            }

            this.imgUrl = "";
        }
    },

    mounted() {
        this.$axios.get("/districts/" + this.form.district_id + "/staff")
            .then(response => {
                this.items = response.data;
            });
    }
}
</script>

<style scoped>

</style>
