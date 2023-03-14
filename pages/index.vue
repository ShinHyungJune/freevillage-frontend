<template>
    <div class="area-index">
        <header-type01
            @updatePosts="updatePosts"
        />

        <!-- 내용 영역 -->
        <div class="container">
            <!-- 지역이 본부 x & 로그인 -->
            <div class="fragment" v-if="district && district.id != 0">
                <section class="section-banner">
                    <div class="wrap">
                        <div class="content">
                            <h3 class="title">
                                <span class="point">{{ district.district }}의 희망!</span>
                                <br/>대한민국을 사랑하는
                                <br/>당신이 자유마을의 얼굴입니다!
                            </h3>

                            <div class="m-btns type01">
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/infos" class="m-btn type01">{{ district.district }}소개</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/staffs" class="m-btn type01">임원진</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contacts" class="m-btn type01">마을활동</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="mt-40"></div>
                <section class="section-values">
                    <img src="https://dotmzh1fysixs.cloudfront.net/1018/base-town.png" alt="" class="base">
                    <div class="wrap">
                        <div class="content">
                            <div class="m-title type01">
                                <p class="sub">자유마을 가입현황</p>
                                {{ district.district }}
                            </div>

                            <div class="boxes">
                                <div class="box-wrap">
                                    <div class="box">
                                        <h3 class="title">{{ district.district }} 총 인구수</h3>

                                        <div class="value">
                                            <div class="value-inner">
                                                <p class="text">{{ registerRates.population.toLocaleString() }}명</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="box-wrap">
                                    <div class="box">
                                        <h3 class="title">자유마을 가입 수</h3>

                                        <div class="value">
                                            <div class="value-inner">
                                                <p class="text">{{ registerRates.count.toLocaleString() }}명</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="box-wrap">
                                    <div class="box">
                                        <h3 class="title">마을 온도</h3>

                                        <div :class="`value level${registerRateLevel.level}`">
                                            <div class="value-inner">
                                                <p class="text">{{registerRateLevel.label}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-40"></div>
                </section>
            </div>

            <!-- 지역이 본부 | 비로그인 -->
            <div class="fragment" v-else>
                <section class="section-banner">
                    <div class="wrap">
                        <div class="content">
                            <h3 class="title">
                                <span class="point">대한민국의 희망!</span>
                                <br/>자유마을에 오신 여러분을
                                <br/>진심으로 환영합니다!
                            </h3>

                            <div class="m-btns type01">
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contents/about" href="#" class="m-btn type01">자유마을이란</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contents/declares" class="m-btn type01">10대 강령</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section class="section-town">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">소속 된 마을을 찾을 수 있어요.</p>
                            나의 <span class="point">마을 찾기</span>
                        </div>

                        <input-region
                            input-class="m-input-select type01"
                            :districtContainer="container"
                            :initiationCalled="activeFinder"
                            @change="changeDistrict"
                        />
                        <button class="m-btn type02 width-100" v-touch:tap="search">검색하기</button>
                        <div style="margin-top: 30px;">
                            <span style="color: red">*</span>행정동을 모르실 경우 찾기 버튼을 누르세요.  <button style="color: #0f38bd;" v-touch:tap="active">찾기</button>
                        </div>
                    </div>
                </div>

                <Finder
                    v-if="activeFinder"
                    :title="'주소로 행정동 찾기'"
                    :excecute="'변환하기'"
                    :cancel="'검색하기'"
                    @cancel="closeModal"
                    @setContainer="setContainer"
                />


            </section>

            <section class="section-ranking">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을별 가입 <span class="point">TOP 10</span>
                            <p style="padding: 10px;">마을 랭킹은 매주 일요일 00시부터<br />토요일 23시59분 마을 가입 수를<br />기반으로 집계되며, 매주 리셋됩니다. </p>
                        </div>

                        <div class="m-tabs type03">

                            <div class="m-tab-wrap">
                                <button :class="`m-tab ${form.rankingUrl === 'rankings' ? 'active' : ''}`" @click="() => {form.rankingUrl='rankings'; getRankings(10)}">주간</button>
                            </div>

                            <div class="m-tab-wrap">
                                <button :class="`m-tab ${form.rankingUrl === 'monthly-rankings' ? 'active' : ''}`" @click="() => {form.rankingUrl='monthly-rankings'; getRankings(10)}">월별</button>
                            </div>

                            <div class="m-tab-wrap">
                                <button :class="`m-tab ${form.rankingUrl === 'total-rankings' ? 'active' : ''}`" @click="() => {form.rankingUrl='total-rankings'; getRankings(10)}">전체</button>
                            </div>
                        </div>

                        <div class="rankings">
                            <div class="ranking-wrap" v-if="districtRegisterCounts.length >= 2">
                                <a href="#" class="ranking" @click.prevent="$store.commit('changeDistrict',  {
                                    id: districtRegisterCounts[1].district_id,
                                    district: districtRegisterCounts[1].district
                                })">
                                    <div class="img-wrap">
                                        <img src="https://dotmzh1fysixs.cloudfront.net/1017/2st.png" width="100%" alt="">
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">{{ districtRegisterCounts[1].district }}</p>
                                        <h3 class="title">
                                            <span class="point">2</span>위
                                        </h3>
                                        <p class="more">{{ rankingCount(districtRegisterCounts[1]) }}
                                            <span class="tri" v-if="rankingCount(districtRegisterCounts[1]) == 0">−</span>
                                            <span class="tri" v-else-if="districtRegisterCounts[1].up_down === 'down'">▼</span>
                                            <span class="tri" v-else>▲</span>
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="ranking-wrap first" v-if="districtRegisterCounts.length >= 1">
                                <div class="ranking" @click="$store.commit('changeDistrict',  {
                                    id: districtRegisterCounts[0].district_id,
                                    district: districtRegisterCounts[0].district
                                })">
                                    <div class="img-wrap">
                                        <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco">
                                        <img src="https://dotmzh1fysixs.cloudfront.net/1015/1st.png" width="100px" alt="" class="img">
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">{{ districtRegisterCounts[0].district }}</p>
                                        <h3 class="title">
                                            <span class="point">1</span>위
                                        </h3>
                                        <p class="more">{{ rankingCount(districtRegisterCounts[0]) }}
                                            <span class="tri" v-if="rankingCount(districtRegisterCounts[0]) == 0">−</span>
                                            <span class="tri" v-else-if="districtRegisterCounts[0].up_down === 'down'">▼</span>
                                            <span class="tri" v-else>▲</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="ranking-wrap" v-if="districtRegisterCounts.length >= 3">
                                <div class="ranking"  @click="$store.commit('changeDistrict',  {
                                    id: districtRegisterCounts[2].district_id,
                                    district: districtRegisterCounts[2].district
                                })">
                                    <div class="img-wrap">
                                        <img src="https://dotmzh1fysixs.cloudfront.net/1014/3st.png" width="100%" alt="">
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">{{ districtRegisterCounts[2].district }}</p>
                                        <h3 class="title">
                                            <span class="point">3</span>위
                                        </h3>
                                        <p class="more">{{ rankingCount(districtRegisterCounts[2]) }}
                                            <span class="tri" v-if="rankingCount(districtRegisterCounts[2]) == 0">−</span>
                                            <span class="tri" v-else-if="districtRegisterCounts[2].up_down === 'down'">▼</span>
                                            <span class="tri" v-else>▲</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-table">
                            <table class="m-table type01">
                                <thead>
                                <tr>
                                    <th style="width: 100px">순위</th>
                                    <th>마을구분</th>
                                    <th class="align-center">신규가입자</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(districtRegisterCount, index) in districtRegisterCounts" :key="index" @click="$store.commit('changeDistrict',  {
                                id: districtRegisterCount.district_id,
                                district: districtRegisterCount.district
                                })">
                                    <template v-if="index >= 3 && districtRegisterCount">
                                    <td>{{index + 1}}위</td>
                                    <td>{{ districtRegisterCount.city}} {{districtRegisterCount.district}}</td>
                                        <td class="more" v-if="rankingCount(districtRegisterCount) == 0">{{rankingCount(districtRegisterCount)}} <span class="tri">−</span></td>
                                    <td class="more down" v-else-if="districtRegisterCount.up_down === 'down'">{{rankingCount(districtRegisterCount)}} <span class="tri">▼</span></td>
                                    <td class="more up" v-else>{{rankingCount(districtRegisterCount)}} <span class="tri">▲</span></td>
                                    </template>
                                </tr>
                                </tbody>
                            </table>
                            <nuxt-link to="/rank" class="m-btn type02">마을 랭킹 TOP 100 +</nuxt-link>

                        </div>
                    </div>
                </div>
            </section>

            <section class="section-ad">
                <div class="wrap">
                    <a href="https://ghmon.com" target="_blank" class="link">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1009/banner4.jpg" alt="">
                    </a>
                </div>
            </section>

            <section class="section-notice">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">소식</h3>

                        <nuxt-link to="/posts?board=notices" class="btn-more">
                            <img src="https://dotmzh1fysixs.cloudfront.net/1013/arrowRight-gray.png" style="width:9px;" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="notices.data.length === 0">
                        데이터가 없습니다.
                    </div>
                    <div class="m-items type01">
                        <nuxt-link :to="`/posts/${notice.id}`" class="m-item" v-for="notice in notices.data" :key="notice.id">
                            <div class="m-ratioBox-wrap" v-if="notice.img">
                                <div class="m-ratioBox" :style="`background-image:url('${notice.img.preview_url}');`"></div>
                            </div>
                            <div class="m-ratioBox-wrap" v-else>
                                <div class="m-ratioBox" :style="`background-image:url('https://dotmzh1fysixs.cloudfront.net/1010/notice_thumbnail.jpg');`"></div>
                            </div>


                            <div class="content">
                                <p class="subtitle" v-if="notice.district">{{ notice.district.city }} {{notice.district.district}}</p>
                                <p class="subtitle" v-else>전체</p>
                                <h3 class="title">{{notice.title}}</h3>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </section>

            <section class="section-video">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">영상</h3>

                        <nuxt-link to="/posts?board=clips" class="btn-more">
                            <img src="/images/arrowRight-gray.png" style="width:9px;" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="clips.data.length === 0">
                        데이터가 없습니다.
                    </div>
                    <div class="m-items type02">
                        <div class="m-item-wrap" v-for="clip in clips.data" :key="clip.id">
                            <nuxt-link :to="`/posts/${clip.id}`" class="m-item" >
                                <div class="m-ratioBox-wrap" v-if="clip.img">
                                    <div class="m-ratioBox">
                                        <img :src="clip.img.preview_url" alt="">
                                    </div>
                                </div>

                                <div class="content">
                                    <h3 class="title">
                                        {{ clip.title }}
                                    </h3>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-photo">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">포토</h3>

                        <nuxt-link to="/posts?board=photos" class="btn-more">
                            <img src="/images/arrowRight-gray.png" style="width:9px;" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="photos.data.length === 0">
                        데이터가 없습니다.
                    </div>

                    <div class="m-items type02">
                        <div class="m-item-wrap" v-for="photo in photos.data" :key="photo.id">
                            <nuxt-link :to="`/posts/${photo.id}`" class="m-item">
                                <div class="m-ratioBox-wrap" v-if="photo.img">
                                    <div class="m-ratioBox" :style="`background-image:url('${photo.img.preview_url}');`"></div>
                                </div>

                                <div class="content">
                                    <h3 class="title">
                                        {{ photo.title }}
                                    </h3>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-ad2">
                <a href="https://m.khmon.com/sign/6936" target="_blank" class="link">
                    <img src="https://dotmzh1fysixs.cloudfront.net/1012/ad2.png" alt="">
                </a>
            </section>

            <quicks />
        </div>

        <navigation />
        <modal
            v-if="activateNoticePop"
            @cancel="closeNoticePopup"
        >
            <div class="mt-8">
                <vueper-slides autoplay fixed-height="300px">
                    <vueper-slide
                        v-for="(content, i) in noticePopupContents"
                        :key="i"
                        :image="content.image.url"
                    >
                    </vueper-slide>
                </vueper-slides>

            </div>
            
        </modal>

    </div>
</template>

<script>
import * as Cookies from "js-cookie";
import {VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css';
export default {
    name: 'IndexPage',
    auth: false,
    components: {
        VueperSlides,VueperSlide
    },
    data() {
        return {
            notOpenChecked:false,
            activateNoticePop: false,
            noticePopupContents:[],
            activeFinder:false,
            container:{},
            form: {
                district_id: "",
                district: "",
                rankingUrl: "rankings",
            },

            notices: {
                data: [],
                meta: {},
                links: {}
            },

            clips: {
                data: [],
                meta: {},
                links: {}
            },

            photos: {
                data: [],
                meta: {},
                links: {}
            },

            asks: {
                data: [],
                meta: {},
                links: {}
            },

            registerRates: {
                population: 0,
                count: 0,
                rate: 0,
            },

            districtRegisterCounts: [

            ],
        }
    },
    methods: {
        async getNoticeContents() {
            try {
                const {data} = await this.$axios.get('/banners/popups')
                console.log({data});
                if(data.banners.length) {
                    this.noticePopupContents = data.banners;
                    this.activateNoticePop = true;
                }
            } catch (error) {

            }

        },
        active() {
            this.activeFinder = true;
        },
        closeModal() {
            this.activeFinder = false;

        },
        closeNoticePopup() {
            // if(this.notOpenChecked) {
            //     Cookies.set("popToday","close",{expires: 1, secure: false})
            // }
            Cookies.set("popToday","close",{expires: 1, secure: false})
            this.activateNoticePop = false;
        },
        setContainer(container) {
            this.container = container;
        },
        search() {
            if(this.form.district == "" || this.form.district ==  undefined) {
                return;
            }
            this.$store.commit("changeDistrict", this.form.district);
            this.updatePosts(this.district.id);
            window.scrollTo(0,0);
            this.container = {};
        },
        changeDistrict(data) {
            this.form.district = data.district
        },

        getRankings(count){
            this.$axios.get(this.form.rankingUrl + "/" + count)
                .then(response => {
                    console.log(response.data.districtRegisterCounts);
                    this.districtRegisterCounts = response.data.districtRegisterCounts;
                });
        },

        rankingCount(ranking){
            if(this.form.rankingUrl === 'rankings')
                return ranking.now_week_count;

            if(this.form.rankingUrl === 'monthly-rankings')
                return ranking.now_month_count;

            if(this.form.rankingUrl === 'total-rankings')
                return ranking.count;

            return "-";
        },

        async updatePosts(districtId) {
            this.$axios.get("/posts", {
                params: {
                    board: "notices",
                    district_id: districtId
                }
            }).then(response => {
                this.notices = response.data;
            });

            this.$axios.get("/posts", {
                params: {
                    board: "clips",
                    district_id: districtId,
                }
            }).then(response => {
                this.clips = response.data;
            });

            this.$axios.get("/posts", {
                params: {
                    board: "photos",
                    district_id: districtId,
                }
            }).then(response => {
                this.photos = response.data;
            });

            this.$axios.get("/posts", {
                params: {
                    board: "asks",
                    district_id: districtId,
                }
            }).then(response => {
                this.asks = response.data;
            });
        },

    },

    computed: {
        district(){
            return this.$store.state.district;
        },

        registerRateLevel(){
            if(this.registerRates.rate <= 1)
                return {
                    level:1,
                    label: "낮음"
                };

            if(this.registerRates.rate <= 3)
                return {
                    level:2,
                    label: "보통"
                };

            if(this.registerRates.rate <= 5)
                return {
                    level:3,
                    label: "조금 높음"
                };

            if(this.registerRates.rate <= 10)
                return {
                    level:4,
                    label: "높음"
                };

            if(this.registerRates.rate <= 20)
                return {
                    level:5,
                    label: "매우 높음"
                };

           return {
                level:6,
                label: "아주 높음"
            };
        }
    },

    watch: {
        district (newCount, oldCount) {
            this.updatePosts(this.district.id);

            // this.getRankings(10);

            if(this.district.id != 0)
                this.$axios.get("/districts/" + this.district.id + "/register_rates")
                    .then(response => {
                        this.registerRates = response.data.registerRates;
                    });
        },
        "form.district"() {
            if(this.container.district)
                this.search()
        }

    },

    async mounted() {
        await this.updatePosts(this.district.id);
        // console.log(Cookies.get('popToday'),3333);
        if(Cookies.get('popToday') !== 'close') {
            await this.getNoticeContents();
        }

        // this.getRankings(10);

        if(this.district.id != 0)
            this.$axios.get("/districts/" + this.district.id + "/register_rates")
                .then(response => {
                    this.registerRates = response.data.registerRates;
                });

    },

}
</script>
<style scoped>
    .fragment .subtitle {
        font-size: 1.2em !important;
    }
</style>
