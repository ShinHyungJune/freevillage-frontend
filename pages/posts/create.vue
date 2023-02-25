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
                        <select name="" id="" v-model="form.board" @change="changeBoard">
                            <option value="" disabled>카테고리 선택</option>
                            <option value="notices">마을소식</option>
                            <option value="clips">마을영상</option>
                            <option value="photos">마을포토</option>
                            <option value="asks">마을질문</option>
                            <option value="meetings">마을모임</option>
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
                <div class="mt-20"></div>

               <!--<p class="comment align-center" v-if="form.board === 'meetings'">※ 모임글은 관리자의 승인 후 노출됩니다.</p> --> 

                <div class="m-input-text type02">
                    <input type="text" placeholder="제목" v-model="form.title" />
                </div>

                <div class="m-input-error" v-if="errors.title">{{errors.title[0]}}</div>

                <div class="m-input-wrap" v-if="form.board === 'clips'">
                    <h3 class="m-input-title">유튜브 영상 Embed</h3>

                    <div class="m-input-text type01">
                        <input type="text" placeholder="https://example.com" v-model="form.video_url">
                    </div>

                    <div class="m-input-error" v-if="errors.video_url">{{errors.video_url[0]}}</div>
                </div>

                <div class="m-input-wrap" v-if="form.board === 'meetings'">
                    <div class="m-input-wrap">
                        <h3 class="m-input-title">파라솔 설치</h3>

                        <div class="m-input-checkbox type01">
                            <input type="checkbox" id="parasole" v-model="parasole">
                            <label for="parasole">파라솔 설치 위치 안내일 경우 체크</label>
                        </div>
                    </div>
                    <div class="m-input-wrap">
                        <h3 class="m-input-title">참여</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="누구나 참여 가능" v-model="form.participant_type">
                        </div>

                        <div class="m-input-error" v-if="errors.participant_type">{{errors.participant_type[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">행사시작</h3>

                        <div class="m-input-text type01">
                            <input type="date" v-model="form.start_date">
                        </div>

                        <div class="m-input-error" v-if="errors.start_date">{{errors.start_date[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">행사종료</h3>

                        <div class="m-input-text type01">
                            <input type="date" v-model="form.end_date">
                        </div>

                        <div class="m-input-error" v-if="errors.end_date">{{errors.end_date[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">모집인원</h3>

                        <div class="m-input-text type01">
                            <input type="number" placeholder="10" v-model="form.participant_available_count">
                        </div>

                        <div class="m-input-error" v-if="errors.participant_available_count">{{errors.participant_available_count[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">참가비</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="무료" v-model="form.price">
                        </div>

                        <div class="m-input-error" v-if="errors.price">{{errors.price[0]}}</div>
                    </div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title">장소</h3>

                        <input-address @change="(data) => {this.form = {...this.form, ...data}}" />

                        <div class="m-input-error" v-if="errors.address">{{errors.address[0]}}</div>
                        <div class="m-input-error" v-if="errors.address_detail">{{errors.address_detail[0]}}</div>
                        <div class="m-input-error" v-if="errors.x">{{errors.x[0]}}</div>
                        <div class="m-input-error" v-if="errors.y">{{errors.y[0]}}</div>
                    </div>
                </div>

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

                <div class="nav-wrap active">
                    <input-link id="link" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-img id="img" @change="getImgInfo"/>
                </div>

                <div class="nav-wrap" v-if="form.board !== 'clips'">
                    <input-thumbnail id="thumbnail" @change="getThumbnailInfo" :img-url="item ? item.img.url : ''" />
                </div>
            </div>
            <!-- <div class="navs">
                <div class="nav-wrap">
                    <input-camera id="camera" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap active">
                    <input-link id="link" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap">
                    <input-img id="img" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
                </div>

                <div class="nav-wrap" v-if="form.board !== 'clips'">
                    <input-thumbnail id="thumbnail" @change="(data) => {form.thumbnail = data.file}" :img-url="item ? item.img.url : ''" />
                </div>
            </div> -->
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
            imgs: {
                repImg: {},
                contentImgs: [],
            },
            item: "",

            form: {
                title: "",
                content: "",
                board: this.$route.query.board ? this.$route.query.board : "notices",
                district_id: this.$store.state.district ? this.$store.state.district.id : 0,
                thumbnail: "",

                // 마을 영상 관련
                video_url:"",
                video_thumbnail: "",
                video_id: "",

                // 마을 모임 관련
                participant_type: "",
                start_date: "",
                end_date: "",
                x: "",
                y: "",
                participant_available_count: "",
                price: "",
                address: "",
                address_detail: "",
            },
            parasole:false,
            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        async store() {
            if(this.form.board === 'meetings' && this.parasole) {
                const res = await fetch('/images/meetings-parasole.jpg')
                const data = await res.blob();
                const file = new File([data], 'parasole',{ type: 'image/jpeg'});
                this.form.thumbnail = file;
            }
            const editor = document.querySelector('.m-editor');
            const firstPic = editor.querySelectorAll(":scope > img")[0];
            if(!this.form.thumbnail && firstPic) { //대표이미지가 없을 경우: 에디터 내에 사진이 있을 경우 첫번째 사진정보를 this.form.thumbnail에 추가
                const firstPicFileInfo = this.imgs.contentImgs.find(img => img.url === firstPic.src).file;
                this.form.thumbnail = firstPicFileInfo;
            }
            this.form.content = this.$refs.content ? this.$refs.content.innerHTML : "";

            if(this.form.video_url) {
                let youtubeInformation = this.getYoutubeInformation(this.form.video_url);

                this.form.video_url = youtubeInformation.embedUrl;
                this.form.video_id = youtubeInformation.id;
                this.form.video_thumbnail = youtubeInformation.thumbnail;
            }

            let form = (new Form(this.form)).data();

            // update
            if(this.item)
                return this.$axios.post("/posts/update/" + this.item.id, form)
                    .then((response) => {
                        alert("성공적으로 처리되었습니다.");

                        this.$router.back();
                    })
                    .catch((error) => {
                        if (error.response && error.response.data)
                            this.errors = error.response.data.errors;
                    });

            // store
            this.$axios.post("/posts", form)
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

        getYoutubeInformation(url){
            let id = "";
            let embedUrl = "";
            let thumbnail = "";

            let match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);

            id = (match&&match[7].length==11)?match[7]:false;

            if(id) {
                embedUrl = "https://www.youtube.com/embed/" + id;
                thumbnail = "https://img.youtube.com/vi/" + id + "/0.jpg";
            }

            return {
                id: id,
                embedUrl: embedUrl,
                thumbnail: thumbnail
            };
        },
        setContentImg(data) {
            this.$refs.content.innerHTML += data.html
        },
        setThumbnail(data) {
            this.form.thumbnail = data.file
        },
        getImgInfo(data) {
            this.setContentImg(data);
            this.imgs.contentImgs.push(data);
        },
        getThumbnailInfo(data) {
            this.setThumbnail(data);
            this.imgs.repImg = {
                ...data,
            }
        },

        reset(){
            this.$refs.content.innerHTML = "";

            this.form = {
                ...this.form,
                title: "",
                content: "",
                thumbnail: "",

                // 마을 영상 관련
                video_url:"",

                // 마을 모임 관련
                participant_type: "",
                start_date: "",
                end_date: "",
                x: "",
                y: "",
                participant_available_count: "",
                price: "",
                address: "",
                address_detail: "",
            }
        }
    },

    mounted() {
        if(this.$route.query.id){
            this.$axios.get("/posts/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form = {
                        ...this.form,
                        ...this.item,
                        district_id: this.item.district ? this.item.district.id : 0,
                        thumbnail: "",
                    }

                    this.$refs.content.innerHTML = this.item.content;
                    
                    if(this.item.img.name == 'parasole') {
                        this.parasole = true;
                    }
                });
        }

    }
}
</script>

<style scoped>

</style>
