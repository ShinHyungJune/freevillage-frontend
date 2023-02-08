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
                        <select name="" id="">
                            <option value="notices" selected>마을공지</option>
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
                <div class="nav-wrap" v-if="">
                    <input-camera id="camera" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap active">
                    <input-link id="link" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-img id="camera" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-thumbnail id="thumbnail" @change="(data) => {form.thumbnail = data.file}" :img-url="item ? item.img.url : ''" />
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
                title: "",
                content: "",
                district_id: this.$auth.user.district.id,
                thumbnail: "",
            },

            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        store() {
            this.form.content = this.$refs.content ? this.$refs.content.innerHTML : "";

            let form = (new Form(this.form)).data();

            // update
            if(this.item)
                return this.$axios.post("/notices/update/" + this.item.id, form)
                    .then((response) => {
                        alert("성공적으로 처리되었습니다.");

                        this.$router.back();
                    })
                    .catch((error) => {
                        if (error.response && error.response.data)
                            this.errors = error.response.data.errors;
                    });

            // store
            this.$axios.post("/notices", form)
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
        if(this.$route.query.id){
            this.$axios.get("/notices/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form = {
                        ...this.form,
                        ...this.item,
                        district_id: this.item.district.id,
                        thumbnail: "",
                    }

                    this.$refs.content.innerHTML = this.item.content;
                });
        }
    }
}
</script>

<style scoped>

</style>
