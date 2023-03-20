<template>
    <div class="area-write area-staff">
        <!-- 삭제 리마인더 -->   
        <Reminder 
            v-if="activeReminder"
            :title="'삭제 하시겠습니까?'"
            :excecute="excecuteName"
            :cancel="cancelName"
            :item="item"
            @excecute="remove"
            @cancel="closeReminder"
        />
        <!-- 헤더영역 -->
        <div class="m-header type02" @keyup="errors = {}">
            <div class="wrap">
                <div class="left">
                    <button class="btn-text black " @click="reset()" v-if="isEditMode">취소</button>
                    <a href="#" class="btn-text" @click.prevent="$router.back()" v-else>종료</a>
                </div>
                <div class="center" v-if="!isEditMode">
                    <div class="m-input-select type01">
                        <select name="" id="" @change="move">
                            <option value="/infos/create">내 마을 소개</option>
                            <option value="/staffs/create" selected>내 마을 임원진</option>
                            <option value="/contacts/create">내 마을 활동</option>
                        </select>
                    </div>
                </div>
                <div class="right">
                    <button class="btn-text primary " @click="updateItem()" v-if="isEditMode">저장</button>
                    <a href="#" class="btn-text primary" @click.prevent="store" v-else>추가</a>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="wrap">
                <!-- <div class="edit-btns" v-if="isEditMode">
                    <button class="btn-text black " @click="reset()">취소</button>
                    <button class="btn-text primary " @click="updateItem()">저장</button>
                </div> -->
                <div class="m-input-wrap">
                    <h3 class="m-input-title">직분</h3>
                    <div class="m-input-text type01">
                        <input type="text" placeholder="직분명" v-model="form.position">
                    </div>
                    <div class="m-input-error" v-if="errors.position">{{errors.position[0]}}</div>
                    <h3 class="m-input-title">이름</h3>
                    <div class="m-input-text type01">
                        <input type="text" placeholder="이름" v-model="form.name">
                    </div>
                    <div class="m-input-error" v-if="errors.name">{{errors.name[0]}}</div>
                    <h3 class="m-input-title">연락처</h3>
                    <div class="m-input-text type01">
                        <input type="text" placeholder="연락처" v-model="form.phone">
                    </div>
                    <div class="m-input-error" v-if="errors.phone">{{errors.phone[0]}}</div>
                    <div class="item-top mt-20">
                        <h3 class="title">임원진 사진</h3>
                        <div>
                            <button class="btn-remove red" v-if="imgUrl" @click.stop="openReminder(undefined,'삭제','취소')">삭제</button>
                        </div>
                    </div>

                    <img :src="imgUrl" alt="" v-if="imgUrl">

                    <div class="m-input-error" v-if="errors.photo">{{errors.photo[0]}}</div>
                </div>
                <!-- <div class="m-input-wrap">

                </div> -->

                <p class="m-comment type02" v-if="!form.info">* 하단 임원진 사진 버튼을 눌러 이미지를 등록해주세요.</p>
                <ul class="rep" v-if="rep">
                    <li class="item">
                        <div class="item-top">
                            <h3 class="title custom-title">{{rep.position}}</h3>
                            <div>
                                <button class="btn-remove " @click.stop="setForm(rep)">수정</button> &nbsp;
                                <button class="btn-remove red" @click="openReminder(rep,'삭제','취소')">삭제</button>
                            </div>
                        </div>


                        <div class="img-wrap" >
                            <img :src="rep.img.url" alt="임원이미지" v-show="rep.img.url">
                            <img src="/images/default_profile.jpeg" alt="대체이미지" v-show="!rep.img.url">
                            <div class="m-board-btns mt-20">
                                <div class="m-btns type01" >
                                    <div class="m-btn-wrap">
                                        <button type="button" class="m-btn type01 bg-primary height-full">
                                            {{rep.name}}<br/>
                                            {{rep.phone}}
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="items custom-ul">
                    
                    <li class="item" v-for="item in restItems" :key="item.id">
                        <div class="item-top">
                            <h3 class="title custom-title">{{item.position}}</h3>
                            <div>
                                <button class="btn-remove " @click.stop="setForm(item)">수정</button> &nbsp;
                                <button class="btn-remove red" @click="openReminder(item,'삭제','취소')">삭제</button>
                            </div>
                        </div>


                        <div class="img-wrap" >
                            <img :src="item.img.url" alt="임원이미지" v-show="item.img.url">
                            <img src="/images/default_profile.jpeg" alt="대체이미지" v-show="!item.img.url">
                            <div class="m-board-btns mt-20">
                                <div class="m-btns type01" >
                                    <div class="m-btn-wrap">
                                        <button type="button" class="m-btn type01 bg-primary height-full">
                                            {{item.name}}<br/>
                                            {{item.phone}}
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </li>
                </ul>
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
import Reminder from "../../components/reminder.vue"

export default {
    components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera, Reminder},
    auth: true,
    computed: {
        rep() {
            return this.items.find(item => item.position === '대표');
        },
        restItems() {
            return this.items.filter(item => item.position !== '대표');
        }
    },
    data() {
        return {
            items: [],

            item: {},

            form: {
                district_id: this.$auth.user.district.id,
                phone: "",
                name: "",
                position: "",
                photo: "",
                img: {
                    name:"",
                    url:""
                }
            },

            imgUrl: "",

            errors: {},

            activeLinkPop: false,

            isEditMode: false,

            excecuteName: '',

            cancelName: '',

            activeReminder: false,
        }
    },
    methods: {
        move(e){
            this.$router.push(e.target.value)
        },

        setForm(item) {
            this.form = Object.assign({},{
                ...item,
            })
            this.imgUrl = item.img.url;
            this.isEditMode = true;
            window.scrollTo(0,0);
        }, 

        async updateItem() {
            try {
                let form = (new Form(this.form).data());
                const {data} = await this.$axios.post(`/api/districts/${this.form.district_id}/staff/update/${this.form.id}`, form);
                const targetIdx = await this.items.findIndex(item => item.id === this.form.id);
                if(data.result) {
                    this.items.splice(targetIdx,1,this.form);
                    this.items[targetIdx].img.url = this.imgUrl;
                }
            } catch (error) {
                if (error.response && error.response.data)
                    this.errors = error.response.data.errors;
            }
            this.reset();
            this.isEditMode = false;
        },

        store() {

            let form = (new Form(this.form)).data();

            this.$axios.post("/api/districts/" + this.form.district_id + "/staff", form)
                .then((response) => {
                    let {data} = response.data;
                    if(data.img === "") {
                        data.img = {
                            name:'',
                            url:'',
                        }
                    }
                    this.items.push(data);

                    this.reset();
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });
        },

        remove(item){
            if(Object.keys(item).length !== 0) {
                this.$axios.delete("/api/districts/" + this.form.district_id + "/staff/" + item.id)
                    .then(response => {
                        this.items = this.items.filter(itemData => itemData.id != item.id);
                    });
            }else {
                this.imgUrl = "";
                const targetIdx = this.items.findIndex(itemData => itemData.id === this.form.id)
                this.items[targetIdx].img = "";
            }
            
            this.closeReminder();
        },
        openReminder(item = {}, excecuteName, cancelName) {
            this.activeReminder = true;
            this.item = item;
            this.excecuteName = excecuteName;
            this.cancelName = cancelName;
        },
        closeReminder() {
            this.activeReminder = false;
            this.excecuteName = "";
            this.cancelName = "";
            this.item = {};
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
            this.isEditMode = false;
        }
    },

    mounted() {
        this.$axios.get("/api/districts/" + this.form.district_id + "/staff")
            .then(response => {
                this.items = [...response.data.data];
            });
    }
}
</script>

<style scoped>
    .edit-btns {
       display:flex; align-items: center; justify-content: space-between;
       margin-top: 1rem;
    }
    .custom-ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
        
    }
    .custom-ul li {
        /* list-style: none; */
        text-align: center;
        width: 48%;
    }
    .custom-title {
        font-weight: 700;
    }
    .height-full {
        height:100%;
    }
    .rep {
        text-align: center;
    }
    .rep li {
        display: inline-block;
        text-align: left;
        width: 48%;
    }
</style>
