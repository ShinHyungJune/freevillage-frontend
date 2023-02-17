<template>
    <div class="area-write area-staff">
        <!-- 삭제 리마인더 -->   
        <Reminder 
            v-if="activeReminder"
            :title="'삭제 하시겠습니까?'"
            :excecute="'삭제'"
            :cancel="'취소'"
            :item="item"
            @excecute="remove(item)"
            @cancel="closeReminder"
        />
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
                <div class="edit-btns" v-if="isEditMode">
                    <button class="btn-text black " @click="reset()">취소</button>
                    <button class="btn-text primary " @click="updateItem()">저장</button>
                </div>
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
                    <h3 class="m-input-title">임원진 사진</h3>

                    <img :src="imgUrl" alt="" v-if="imgUrl">

                    <div class="m-input-error" v-if="errors.photo">{{errors.photo[0]}}</div>
                </div>
                <!-- <div class="m-input-wrap">

                </div> -->

                <p class="m-comment type02" v-if="!form.info">* 하단 임원진 사진 버튼을 눌러 이미지를 등록해주세요.</p>

                <ul class="items custom-ul">
                    <li class="item" v-for="item in items" :key="item.id">
                        <div class="item-top">
                            <h3 class="title custom-title">{{item.position}}</h3>
                            <div>
                                <button class="btn-remove " @click.stop="setForm(item)">수정</button> &nbsp;
                                <button class="btn-remove red" @click="openReminder(item)">삭제</button>
                            </div>
                        </div>


                        <div class="img-wrap" v-if="item.img">
                            <img :src="item.img.url" alt="" v-if="item.img">
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
            },

            imgUrl: "",

            errors: {},

            activeLinkPop: false,

            isEditMode: false,

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
        }, 

        async updateItem() {
            try {
                let form = (new Form(this.form).data());
                const {data} = await this.$axios.post(`/districts/${this.form.district_id}/staff/update/${this.form.id}`, form);
                const targetIdx = await this.items.findIndex(item => item.id === this.form.id);
                if(data.result) {
                    this.items.splice(targetIdx,1,this.form);
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

            this.$axios.post("/districts/" + this.form.district_id + "/staff", form)
                .then((response) => {
                    this.items.push(response.data.data);

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
                    this.items = this.items.filter(itemData => itemData.id != item.id);
                });
            this.closeReminder();
        },
        openReminder(item) {
            this.activeReminder = true;
            this.item = item;
        },
        closeReminder() {
            this.activeReminder = false;
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
        this.$axios.get("/districts/" + this.form.district_id + "/staff")
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
</style>
