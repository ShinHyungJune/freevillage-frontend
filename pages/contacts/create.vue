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
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-text black " @click="reset()" v-if="isEditMode">취소</button>
                    <a href="#" class="btn-text" @click.prevent="$router.back()" v-else>종료</a>
                </div>
                <div class="center" v-if="!isEditMode">
                    <div class="m-input-select type01">
                        <select name="" id="" @change="move">
                            <option value="/infos/create">내 마을 소개</option>
                            <option value="/staffs/create">내 마을 임원진</option>
                            <option value="/contacts/create" selected>내 마을 활동</option>
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
        <div class="container" @keyup="errors = {}">
            <div class="wrap">
                <!-- <div class="edit-btns" v-if="isEditMode">
                    <button class="btn-text black " @click="reset()">취소</button>
                    <button class="btn-text primary " @click="updateItem()">저장</button>
                </div> -->
                <div class="m-input-wrap">
                    <h3 class="m-input-title">연락처</h3>

                    <div class="m-input-text type01">
                        <input type="text" placeholder="연락처" v-model="form.phone">
                    </div>

                    <div class="m-input-error" v-if="errors.phone">{{errors.phone[0]}}</div>
                </div>

                <div class="m-input-wrap">
                    <div class="item-top mt-20">
                        <h3 class="title">의원 사진</h3>
                        <div>
                            <button class="btn-remove red" v-if="imgUrl" @click.stop="openReminder(undefined,'삭제','취소')">삭제</button>
                        </div>
                    </div>

                    <img :src="imgUrl" alt="" v-if="imgUrl">

                    <div class="m-input-error" v-if="errors.photo">{{errors.photo[0]}}</div>
                </div>

                <p class="m-comment type02" v-if="!form.info">* 하단 의원 사진 버튼을 눌러 이미지를 등록해주세요.</p>

                <draggable
                    class="items" v-model="items" @input="reorder" v-if="items.length >0"
                > 
                    <div class="item" v-for="item in items" :key="item.id">
                        <div class="item-top">
                            <h3 class="title">{{item.name}}</h3>
                            <div>
                                <button class="btn-remove " @click.stop="setForm(item)">수정</button> &nbsp;
                                <button class="btn-remove red" @click="openReminder(item,'삭제','취소')">삭제</button>
                            </div>
                            
                        </div>

                        <div class="img-wrap">
                            <!-- <a :href="`tel:${item.phone}`" class="btn-call" v-if="item.phone">
                                <img src="/images/call.png" alt="" style="width:17px;">
                            </a> -->
                            
                            <img :src="item.img.url" alt="대표이미지" v-if="item.img">
                            <img src="/images/default_profile.jpeg" alt="대체이미지" v-else>
                            <div class="m-board-btns mt-20">
                                <div class="m-btns type01" v-if="item.phone">
                                    <div class="m-btn-wrap">
                                        <a :href="`tel:${item.phone}`" class="m-btn type01 bg-revert-primary">연락하기</a>
                                    </div>
                                    <div class="m-btn-wrap">
                                        <a :href="`sms:${item.phone}`" class="m-btn type01 bg-primary">문자하기</a>
                                    </div>
                                </div>
                                <div class="m-btns type01" v-else>
                                    <div class="m-btn-wrap">
                                        <a href=# class="m-btn type01 bg-lightGray">연락하기</a>
                                    </div>
                                    <div class="m-btn-wrap">
                                        <a href=# class="m-btn type01 bg-lightGray">문자하기</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </draggable>
                <!-- <div class="items">
                    <div class="item" v-for="item in items.data" :key="item.id">
                        <div class="item-top">
                            <h3 class="title">{{item.name}}</h3>

                            <button class="btn-remove red" @click="remove(item)">삭제</button>
                        </div>

                        <div class="img-wrap" v-if="item.img">
                            <a :href="`tel:${item.phone}`" class="btn-call" v-if="item.phone">
                                <img src="/images/call.png" alt="" style="width:17px;">
                            </a>
                            <div class="m-board-btns mt-20">
                                <div class="m-btns type01">
                                    <div class="m-btn-wrap">
                                        <a :href="`tel:${item.phone}`" class="m-btn type01 bg-revert-primary">연락하기</a>
                                    </div>
                                    <div class="m-btn-wrap">
                                        <a :href="`sms:${item.phone}`" class="m-btn type01 bg-primary">문자하기</a>
                                    </div>
                                </div>
                            </div>
                            <img :src="item.img.url" alt="" v-if="item.img">
                        </div>
                    </div>
                </div> -->
                <div class="mt-40"></div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="navs">
                <div class="nav-wrap">
                    <input-img id="img2" title="의원 사진" @changeFile="(data) => form.photo = data" @change="(data) => { this.imgUrl = data.url}"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";
import Form from "@/utils/Form";
import Reminder from "../../components/reminder.vue"

export default {
    components: {draggable,InputAddress, InputThumbnail, InputImg, InputLink, InputCamera, Reminder},
    auth: true,
    data() {
        return {
            items: [],

            item: {},

            form: {
                district_id: this.$auth.user.district.id,
                phone: "",
                photo: "",
                order: "",
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

        async reorder(items){
            const payload = items.map((item,index) => ({
                ...item,
                order: index
            }))
            try {
                await this.$axios.post(`/districts/${this.form.district_id}/reorder`, {
                        items: payload
                })
            } catch (error) {
                if (error.response && error.response.data)
                    this.errors = error.response.data.errors;                
            }
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
                const {data} = await this.$axios.post(`/districts/${this.form.district_id}/updates/${this.form.id}`, form);
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
            this.form.order = this.items.length;
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
        
        remove(item){

            if(Object.keys(item).length !== 0) {
                this.$axios.delete("/districts/" + this.form.district_id + "/contacts/" + item.id)
                    .then(response => {
                        this.items = this.items.filter(itemData => itemData.id != item.id);
                    });
            }else {
                this.imgUrl = "";
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
        this.$axios.get("/districts/" + this.form.district_id + "/contacts")
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
</style>
