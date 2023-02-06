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
                        <select name="" id="" v-model="form.category">
                            <option value="">카테고리 선택</option>
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
                <div class="m-input-text type02">
                    <input type="text" placeholder="제목" v-model="form.title" />
                </div>

                <div class="m-input-error" v-if="errors.title">{{errors.title[0]}}</div>

                <div contenteditable="true" placeholder="글을 입력해주세요" class="m-editor type01" ref="content"></div>

                <div class="m-input-error" v-if="errors.content">{{errors.content[0]}}</div>

                <div class="mt-40"></div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="navs">
                <div class="nav-wrap">
                    <input-camera id="camera" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap active">
                    <input-link id="link" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-img id="camera" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-thumbnail id="thumbnail" @change="(data) => {form.thumbnail = data.file}" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";

export default {
    components: {InputThumbnail, InputImg, InputLink, InputCamera},
    auth: true,
    data() {
        return {
            form: {
                title: "",
                content: "",
                category: "",
                district_id: this.$store.state.district ? this.$store.state.district.id : 0,
                thumbnail: "",
            },

            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        store() {
            this.form.content = this.$refs.content.innerHTML;

            let form = (new Form(this.form)).data();

            console.log(form);

            this.$axios.post("/posts/notices", form)
                .then((response) => {
                    alert("성공적으로 등록되었습니다.");

                    this.$router.back();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
