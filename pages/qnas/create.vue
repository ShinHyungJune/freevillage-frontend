<template>
    <div class="area-write">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <a href="#" class="btn-text" @click.prevent="$router.back()">취소</a>
                </div>
                <div class="center">

                </div>
                <div class="right">
                    <a href="#" class="btn-text primary" @click.prevent="store">등록</a>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="wrap">
                <div class="mt-20"></div>

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
                    <input-camera id="camera" @change="getImgInfo"/>
                </div>
                <div class="nav-wrap">
                    <input-img id="img" @change="getImgInfo"/>
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
import InputYoutube from "../../components/form/posts/inputYoutube";
import Form from "@/utils/Form";
import {debounce} from "@/utils/debounce";

export default {
    components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera, InputYoutube},
    auth: true,
    data() {
        return {
            imgs: {
                repImg: {},
                contentImgs: [],
            },
            item: "",

            form: {
                title: "",
                content: "",
            },
            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        async store() {
            this.form.content = this.$refs.content ? this.$refs.content.innerHTML : "";

            let form = (new Form(this.form)).data();

            if(this.item)
                return this.$axios.post("/qnas/update/" + this.item.id, form)
                    .then((response) => {
                        alert("성공적으로 처리되었습니다.");

                        this.$router.back();
                    })
                    .catch((error) => {
                        if (error.response && error.response.data)
                            this.errors = error.response.data.errors;
                    });

            // store
            this.$axios.post("/qnas", form)
                .then((response) => {
                    alert("성공적으로 처리되었습니다.");

                    this.$router.back();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

        changeBoard(){
            this.reset();
        },

        setContentImg(data) {
            this.$refs.content.innerHTML += data.html
        },
        getImgInfo(data) {
            this.setContentImg(data);
            this.imgs.contentImgs.push(data);
        },

        reset(){
            this.$refs.content.innerHTML = "";

            this.form = {
                ...this.form,
                title: "",
                content: "",
            }
        }
    },

    mounted() {
        if(this.$route.query.id){
            this.$axios.get("/qnas/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form = {
                        ...this.form,
                        ...this.item,
                    }

                    this.$refs.content.innerHTML = this.item.content;
                });
        }

    },

}
</script>

<style scoped>

</style>
