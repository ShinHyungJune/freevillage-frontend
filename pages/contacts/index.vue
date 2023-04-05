<template>
    <div class="area-region-activity" style="overflow:scroll">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">{{this.$store.state.district.district}} 국회의원</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/infos" class="m-tab">
                        <span class="text">{{this.$store.state.district.district}} 소개</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab">
                        <span class="text">임원진</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contacts" class="m-tab active">
                        <span class="text">내마을 국회의원</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="section-content">
                <div class="wrap">
                    <div class="m-empty type01" v-if="!item">준비중입니다.</div>

                    <section class="section-content" v-if="item">
                        <div class="wrap">
                            <div class="img-wrap">
                                <img :src="item.img.url" alt="">
                            </div>
                            <button class="m-btn type02 width-100" @click="openEvaluateModal">의원 평가하기</button>
                            <div class="mt-12"></div>
                            <div class="box-name">
                                <p class="name">{{ item.korean_name }} ({{item.NAME_HAN}}) </p>
                               <!-- <p class="info-body"><span style="color: red">국회의원의 추가정보 업데이트 될 예정입니다.</span></p> -->
                            </div>

                            <div class="fragment">
                                <h3 class="title">국회의원 소개</h3>

                                <div class="infos">
                                    <div class="info">
                                        <h3 class="info-title">· 정당</h3>
                                        <!-- <p class="info-body">업데이트될 예정</p> -->
                                       <p class="info-body">{{computeDae}}</p>
                                    </div>
                                    <div class="info">
                                        <h3 class="info-title">· 홈페이지</h3>
                                        <p class="info-body">
                                            <a :href="homepage" target="_blank">{{item.congress_homepage}}</a>
                                        </p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 사무실 주소</h3>
                                        <p class="info-body">{{item.congress_office}}</p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 이메일</h3>
                                        <p class="info-body">{{ item.congress_email }}</p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 연락처</h3>
                                        <!-- <p class="info-body">{{ item.congress_phone }}</p> -->
                                        <a :href="`tel:${item.congress_phone}`" class="info-body">☎ {{ item.congress_phone }}</a>
                                    </div>
                                </div>
                            </div>

                            <div class="fragment" v-if="item.HAK">
                                <h3 class="title">주요 약력</h3>

                                <div class="histories" v-text="item.HAK"></div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">대표발의 의안</h3>

                                <div class="boards" v-if="proposals.length > 0">
                                    <template v-for="item in proposals">
                                        <a :href="item.DETAIL_LINK" target="blank"  :key="item.BILL_ID" class="board" >
                                            <h3 class="title">{{item.BILL_NAME}}</h3>
                                            <p class="sub">{{item.PROPOSE_DT}}</p>
                                        </a>
                                    </template>
                                </div>
                                <div class="boards" v-if="proposals.length == 0">
                                    <div class="m-empty type01">
                                        데이터가 없습니다.
                                    </div>
                                </div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">발언 영상</h3>

                                <div class="boards" v-if="speeches.length > 0">
                                    <template v-for="(item,index) in speeches">
                                        <a :href="item.LINK_URL" target="blank" :key="index" class="board">
                                            <h3 class="title">{{item.TITLE}}</h3>
                                            <p class="sub">{{item.TAKING_DATE}}</p>
                                        </a>
                                    </template>    
                                </div>
                                <div class="boards" v-if="speeches.length == 0">
                                    <div class="m-empty type01">
                                        데이터가 없습니다.
                                    </div>
                                </div>
                            </div>

                            <div class="mt-40"></div>
                        </div>
                    </section>

                    <img src="/images/about-bg.png" alt="" class="deco-about">
                </div>
            </section>

                        <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            />
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
        <modal
            v-if="evaluatePop"
            @cancel="closeEvaluteModal"
        >
            <div class="m-pop-title" style="margin-top:-40px">
                의원 평가하기
            </div>
            <section class="head-wrapper">
                <div class="img-container">
                    <div class="crop-image" :style="`background-image:url('${item.img.url}')`"></div>
                    <div class="mt-8"></div>
                    <div class="m-pop-title bold">
                        {{item.korean_name}} 의원
                    </div>
                </div>
            </section>
            <section class="body-wrapper">
                <div class="m-pop-title left">
                    <span class="point">Q1</span>
                    <span class="question">{{item.korean_name}} 의원의 활동에 만족하시나요?</span>
                     
                </div>
                <div class="mt-8"></div>
                <div class="smile-container">
                    <div class="smile" :class="{'active':selectedOption === option.value}"
                        v-for="(option,index) in options" :key="option.value"
                    >
                        <label>
                            <input type="radio" :value="option.value" v-model="selectedOption">
                            <img :src="option.image" :alt="option.label">
                        </label>
                        <div class="m-pop-title">
                            {{option.label}}
                        </div>
                    </div>
                </div>
                <!-- <div class="m-pop-title">
                    <star-rating
                        :star-size="20"
                        :show-rating="false"
                        :read-only="false"
                        :increment="0.5"
                        :rating="temp.evaluate"
                        @rating-selected="onRatingSelected"
                    />
                </div> -->
                <div class="mt-8"></div>
                <div class="m-pop-title left">
                    <span class="point">Q2</span>
                     <span class="question">의원에 대한 의견을 남겨주세요.</span>
                </div>
                <div class="m-input-textarea type01 lightgrey">
                    <textarea name="" id="" placeholder="의원 평가를 입력해주세요" cols="30" rows="10"></textarea>
                </div>
            </section>
            <div class="mt-8"></div>
            <div class="m-pop-title">
                <button class="m-btn type02 width-100" @click="">의원 평가 제출하기</button>
            </div>
        </modal>
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
    auth: false,
    data() {
        return {
            item: null,
            temp: null,
            proposals:[],
            speeches:[],
            errors: {},
            evaluatePop: false,
            selectedOption: undefined,
            options: [
                { value: 5, label: '최고', image: '/images/contacts/f_5.png' },
                { value: 4, label: '좋음', image: '/images/contacts/f_4.png' },
                { value: 3, label: '보통', image: '/images/contacts/f_3.png' },
                { value: 2, label: '별로', image: '/images/contacts/f_2.png' },
                { value: 1, label: '최악', image: '/images/contacts/f_1.png' },
            ],
        }
    },
    computed: {
        computeDae() {
            let str = ['데이터가 없습니다'];
            if(this.item.DAE) {
                str = this.item.DAE.split(" ");
                let partyName = str[str.length-1].trim();
                if(partyName === '미래통합당') {
                    partyName = '국민의힘';
                }
                // console.log(partyName,5655555555)
                return partyName;
            }else {
                return str[0];
            }
            
        },
        district(){
            return this.$store.state.district;
        },

        homepage(){
            if(this.item && this.item.congress_homepage)
                return this.item.congress_homepage.includes("http") ? this.item.congress_homepage : "http://" + this.item.congress_homepage;
        }
    },
    methods: {
        async init(){
            try {
                const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/contacts`)
                if(response) {
                    this.temp = response.data.data;
                    await this.nprlapfmaufmqytet(this.temp.korean_name); //의원 약력 등 정보
                    await this.nzmimeepazxkubdpn(this.temp.korean_name); //의원 대표발의 법안
                    await this.npeslxqbanwkimebr(this.temp.korean_name); //의원 발언 영상
                    this.openEvaluateModal();
                }
                    
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 약력 등 추가 정보
         */
        async nprlapfmaufmqytet(name) {
            try {
                const {data} = await this.$axios.get(`/portal/openapi/nprlapfmaufmqytet`, {
                    params: {
                        DAESU: '21',
                        NAME: name,
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a'
                    }
                })

                if(data) {
                    // console.log(data.nprlapfmaufmqytet[1].row[0])
                    this.item = {
                        ...this.temp,
                        ...data.nprlapfmaufmqytet[1].row[0],
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 대표발의 법안
         */
        async nzmimeepazxkubdpn(name) {
            try {
                const {data} = await this.$axios.get(`/portal/openapi/nzmimeepazxkubdpn`, {
                    params: {
                        age: '21',
                        proposer: name,
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a',
                        pSize: 3,
                    }
                })
                if(data) {
                    // console.log(data.nzmimeepazxkubdpn[1].row)
                    this.proposals = data.nzmimeepazxkubdpn[1].row;
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 발언 영상
         */
        async npeslxqbanwkimebr(name) {
            try {
                const {data} = await this.$axios.get(`/portal/openapi/npeslxqbanwkimebr`, {
                    params: {
                        CT1: '21',
                        ESSENTIAL_PERSON: name,
                        TAKING_DATE: '2023',
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a',
                        pSize: 3,
                    }
                })
                if(data) {
                    // console.log({data},3344);
                    this.speeches =  data.npeslxqbanwkimebr[1].row;

                }
            } catch (error) {
                console.error(error);
            }
        },
        openEvaluateModal() {
            this.evaluatePop = true;
        },
        closeEvaluteModal() {
            this.evaluatePop = false;
        },
    },
    /*watch: {
        district (newData, oldData) {
            location.reload();
        }
    },*/

    mounted() {
        this.init();
        console.log(this.options)
    },
}
</script>

<style scoped>
    .head-wrapper {
        background: #f8f8f8;
    }
    .img-container {
        width: 100%;
        height: 100%;
        padding-top:10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f8f8f8;
        
    }
    
    .img-container .crop-image {
        width: 100px;
        height: 100px;
        background-size: cover; 
        border-radius:5px;
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
    }

    .smile-container {
        /* max-width: 400px; */
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
       
    }
    .smile-container .smile {
         opacity: 0.3;
    }
    .smile-container .smile.active {
        opacity: 1;
    }
    .smile-container .smile img {
        width: 45px;
        height: 45px;
        
    }
    
    .m-pop-title.bold {
        font-weight: 700;
    }
    .m-pop-title.left {
        text-align: left;
    }
    .m-pop-title.left .question {
        font-size: 19px;
        font-weight: 400;
    }

    .m-input-textarea.type01 textarea {
        border: 1px solid #e5e5e5;
        background: #f8f8f8;
    }
</style>
