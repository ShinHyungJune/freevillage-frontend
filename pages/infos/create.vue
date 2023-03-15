<template>
    <div class="area-write">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <a href="#" class="btn-text" @click.prevent="$router.back()">취소</a>
                </div>
                <div class="center">
                    <div class="m-input-select type01">
                        <select name="" id="" @change="move">
                            <option value="/infos/create" selected>내 마을 소개</option>
                            <option value="/staffs/create">내 마을 임원진</option>
                            <option value="/contacts/create">내 마을 활동</option>
                        </select>
                    </div>
                </div>
                <div class="right">
                    <a href="#" class="btn-text primary" @click.prevent="store">등록</a>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="wrap">
                <section class="section">
                    <h3 class="section-title">내 마을이란</h3>

                    <div contenteditable="true" placeholder="글을 입력해주세요" class="m-editor type01" ref="content"></div>

                    <div class="m-input-error" v-if="errors.content">{{errors.content[0]}}</div>
                </section>

                <section class="section">
                    <h3 class="section-title">내 마을 소개</h3>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">장소</h3>

                        <input-address v-if="show" @change="(data) => {this.form = {...this.form, ...data}}" :address="form.address" :address_detail="form.address_detail" :x="form.x" :y="form.y"/>

                        <div class="m-input-error" v-if="errors.address">{{errors.address[0]}}</div>
                        <div class="m-input-error" v-if="errors.address_detail">{{errors.address_detail[0]}}</div>
                        <div class="m-input-error" v-if="errors.x">{{errors.x[0]}}</div>
                        <div class="m-input-error" v-if="errors.y">{{errors.y[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">관할 법정동</h3>

                        <div class="m-input m-input-text type01">
                            <input type="text" v-model="form.jurisdiction">
                        </div>

                        <div class="m-input-error" v-if="errors.jurisdiction">{{errors.jurisdiction[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">행정복지센터</h3>

                        <div class="m-input m-input-text type01">
                            <input type="text" v-model="form.administrative_welfare_center">
                        </div>

                        <div class="m-input-error" v-if="errors.administrative_welfare_center">{{errors.administrative_welfare_center[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">하위 행정구역</h3>

                        <div class="m-input m-input-text type01">
                            <input type="text" v-model="form.subdivision_administrative_district">
                        </div>

                        <div class="m-input-error" v-if="errors.subdivision_administrative_district">{{errors.subdivision_administrative_district[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">인구</h3>

                        <div class="m-input m-input-text type01">
                            <input type="number" v-model="form.population">
                        </div>

                        <div class="m-input-error" v-if="errors.population">{{errors.population[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">인구밀도</h3>

                        <div class="m-input m-input-text type01">
                            <input type="text" v-model="form.population_density">
                        </div>

                        <div class="m-input-error" v-if="errors.population_density">{{errors.population_density[0]}}</div>
                    </div>
                </section>

                <section class="section">
                    <h3 class="section-title">단체 상세 정보</h3>

                    <p class="m-comment type02" v-if="!imgUrl">* 하단 단체 상세 이미지를 눌러 이미지를 등록해주세요.</p>

                    <img :src="imgUrl" alt="" v-if="imgUrl">
                </section>

                <div class="mt-40"></div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="navs">
                <div class="nav-wrap">
                    <input-img id="img" title="마을 소개 이미지" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-img id="img2" title="단체 상세 이미지" @changeFile="(data) => form.info = data" @change="(data) => { this.imgUrl = data.url}"/>
                </div>

                <div class="nav-wrap active">
                    <input-link id="link" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
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
            item: "",

            form: {
                content: "",
                district_id: this.$auth.user.district.id,
                thumbnail: "",

                x: "",
                y: "",

                coordinate: {
                    lat: "", // y
                    lng: "", // x
                },

                address: "",
                address_detail: "",

                info: "",
            },

            errors: {},

            activeLinkPop: false,

            imgUrl: "",

            show: false,
        }
    },
    methods: {
        move(e){
            this.$router.push(e.target.value)
        },

        store() {
            this.form.coordinate.lng = this.form.x;
            this.form.coordinate.lat = this.form.y;

            this.form.content = this.$refs.content ? this.$refs.content.innerHTML : "";

            let form = (new Form(this.form)).data();

            this.$axios.post("/districts/" + this.form.district_id + "/infos", form)
                .then((response) => {
                    alert("성공적으로 처리되었습니다.");

                    this.$router.back();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

    },

    mounted() {
        this.$axios.get(`/districts/${this.form.district_id}/infos`)
            .then(response => {

                let item = response.data ? response.data.data : "";

                if(item){

                    this.$refs.content.innerHTML = item.content;

                    this.imgUrl = item.img ? item.img.url : '';

                    this.form = {
                        ...this.form,
                        ...item,
                    };
                }

                this.show = true;

            });
    }
}
</script>

<style scoped>

</style>
