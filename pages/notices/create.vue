<template>
    <div class="area-write">
        <!-- 링크 추가 팝업 -->
        <div class="m-pop type01" id="pop1" v-if="activeLinkPop">
            <div class="m-pop-inner">
                <button class="btn-close m-script-pop" data-target="#pop1" @click="activeLinkPop = false">
                    <img src="/images/x.png" alt="" style="width:21px;">
                </button>

                <div class="m-pop-title">링크를 입력하세요</div>

                <div class="m-input-text type01">
                    <input type="text" placeholder="링크명">
                </div>
                <div class="mt-4"></div>
                <div class="m-input-text type01">
                    <input type="text" placeholder="https://example.com">
                </div>

                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100">등록하기</button>
            </div>
        </div>

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

                <div contenteditable="true"
                     placeholder="글을 입력해주세요" class="m-editor type01"
                     v-html="form.content" ref="content"
                     @input="(e) => {form.content = e.target.innerText;}"></div>

                <div class="m-input-error" v-if="errors.content">{{errors.content[0]}}</div>

                <div class="mt-40"></div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="navs">
                <div class="nav-wrap">
                    <input-camera id="camera" />
                </div>

                <div class="nav-wrap active">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/link.png" alt="" style="width:16px;">
                        </div>

                        <h3 class="title">링크 추가</h3>
                    </a>
                </div>

                <div class="nav-wrap">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/pictureMen.png" alt="" style="width:20px;">
                        </div>

                        <h3 class="title">사진이미지</h3>
                    </a>
                </div>

                <div class="nav-wrap">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/picturePlus.png" alt="" style="width:17px;">
                        </div>

                        <h3 class="title">대표이미지</h3>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';
import InputCamera from '../../components/form/posts/inputCamera';

export default {
    components: {InputCamera},
    auth: true,
    data() {
        return {
            form: {
                title: "",
                content: "",
                category: "",
                district_id: this.$store.state.district ? this.$store.state.district.id : 0,
            },

            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        store() {
            this.$axios.post("/posts/notices", this.form)
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
