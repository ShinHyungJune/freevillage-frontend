<template>
    <div class="area-write area-staff">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <a href="#" class="btn-text" @click.prevent="$router.back()">종료</a>
                </div>
                <div class="center">
                    <div class="m-input-select type01">
                        <select name="" id="" @change="move">
                            <option value="/infos/create">내 마을 소개</option>
                            <option value="/staffs/create">내 마을 임원진</option>
                            <option value="/contacts/create" selected>내 마을 활동</option>
                        </select>
                    </div>
                </div>
                <div class="right">
                    <a href="#" class="btn-text primary" @click.prevent="store">추가</a>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container" @keyup="errors = {}">
            <div class="wrap">
                <div class="custom" v-if="isEditMode">
                    <h3></h3>
                    <button class="btn-text primary " @click="updateItem()">저장</button>
                </div>
                <div class="m-input-wrap">
                    <h3 class="m-input-title">연락처</h3>

                    <div class="m-input-text type01">
                        <input type="text" placeholder="연락처" v-model="form.phone">
                    </div>

                    <div class="m-input-error" v-if="errors.phone">{{errors.phone[0]}}</div>
                </div>

                <div class="m-input-wrap">
                    <h3 class="m-input-title">의원 사진</h3>

                    <img :src="imgUrl" alt="" v-if="imgUrl">

                    <div class="m-input-error" v-if="errors.photo">{{errors.photo[0]}}</div>
                </div>

                <p class="m-comment type02" v-if="!form.info">* 하단 의원 사진 버튼을 눌러 이미지를 등록해주세요.</p>

                <draggable
                    class="items" v-model="items.data" @input="reorder" v-if="items.data.length >0"
                > 
                    <div class="item" v-for="item in items.data" :key="item.id">
                        <div class="item-top">
                            <h3 class="title">{{item.phone}}</h3>
                            <div>
                                <button class="btn-remove " @click="setForm(item)">수정</button> &nbsp;
                                <button class="btn-remove red" @click="remove(item)">삭제</button>
                            </div>
                            
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

export default {
    components: {draggable,InputAddress, InputThumbnail, InputImg, InputLink, InputCamera},
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
                photo: "",
                order: "",
            },

            imgUrl: "",

            errors: {},

            activeLinkPop: false,

            isEditMode: false,
        }
    },
    methods: {
        move(e){
            this.$router.push(e.target.value)
        },

        //TODO 여기서 즉각 api call 해서 바로 순서 저장 가능해야함
        //TODO 각 항목 수정 저장 가능하게 고쳐야함 
        async reorder(items){
            console.log({items},'reorder')
            const payload = items.map((item,index) => ({
                ...item,
                order: index
            }))
            console.log({payload},'reorderPayload')
            try {
                const {data} = await this.$axios.post(`/districts/${this.form.district_id}/reorder`, {
                        items: payload
                })
                console.log(data, 'reorderResponse')
            } catch (error) {
                if (error.response && error.response.data)
                    this.errors = error.response.data.errors;                
            }
            

            this.$emit("reorder", items.map((item, index) => {
                item.order = index;
            
                return item;
            }));
        },
        setForm(item) {
            this.form = Object.assign({},{
                ...item,
                // photo: item.img
            })
            this.isEditMode = true;
            console.log(this.form, 'after setForm')
        }, 
        async updateItem() {

            try {
                let form = (new Form(this.form).data());
                const {data} = await this.$axios.post(`/districts/${this.form.district_id}/updates/${this.form.id}`, form);
                const idx = this.items.data.findIndex(item => item.id === form.id);
                console.log({data},'updateItemResponse')
                console.log({idx},idx)
                // this.items.data[idx] = this.
                
            } catch (error) {
                if (error.response && error.response.data)
                    this.errors = error.response.data.errors;
            }
            this.reset();
            this.isEditMode = false;
        },

        store() {
            this.form.order = this.items.data.length;
            let form = (new Form(this.form)).data();
            this.$axios.post("/districts/" + this.form.district_id + "/contacts", form)
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
            this.$axios.delete("/districts/" + this.form.district_id + "/contacts/" + item.id)
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
        this.$axios.get("/districts/" + this.form.district_id + "/contacts")
            .then(response => {
                this.items = response.data;
            });
    }
}
</script>

<style scoped>
    .custom {
       display:flex; align-items: center; justify-content: space-between;
       margin-top: 1rem;
    }
</style>
