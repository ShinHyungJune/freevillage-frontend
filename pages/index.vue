<template>
    <div class="area-index">
        <header-type01/>

        <!-- 내용 영역 -->
        <div class="container">
            <!-- 지역이 본부 x & 로그인 -->
            <div class="fragment" v-if="$auth.user && (district && district.id != 0)">
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
                    <img src="/images/base-town.png" alt="" class="base">
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
                                        <h3 class="title">자유마을가입률</h3>

                                        <div class="value">
                                            <div class="value-inner">
                                                <p class="text">{{ registerRates.rate.toLocaleString() }}%</p>
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
                                    <nuxt-link to="/contents/greeting" class="m-btn type01">총재 인사말</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contents/declares" class="m-btn type01">10대 강령</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contents/about" href="#" class="m-btn type01">자유마을이란</nuxt-link>
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

                        <input-region input-class="m-input-select type01" @change="(data) => {form.district = data.district}" />

                        <button class="m-btn type02 width-100" @click="search">검색하기</button>
                    </div>
                </div>
            </section>

            <section class="section-ranking">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을별 가입 <span class="point">TOP 10</span>
                        </div>

                        <div class="rankings">
                            <div class="ranking-wrap">
                                <a href="#" class="ranking">
                                    <div class="img-wrap">
                                        <img src="/images/2st.png" alt="">
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">월곡2동</p>
                                        <h3 class="title">
                                            <span class="point">2</span>위
                                        </h3>
                                        <p class="more">48 <span class="tri">▲</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="ranking-wrap first">
                                <a href="#" class="ranking">
                                    <div class="img-wrap">
                                        <img src="/images/crown.png" alt="" class="deco">
                                        <img src="/images/1st.png" alt="" class="img">
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">장위동</p>
                                        <h3 class="title">
                                            <span class="point">1</span>위
                                        </h3>
                                        <p class="more">53 <span class="tri">▼</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="ranking-wrap">
                                <a href="#" class="ranking">
                                    <div class="img-wrap">
                                        <img src="/images/3st.png" alt="">
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">서정동</p>
                                        <h3 class="title">
                                            <span class="point">3</span>위
                                        </h3>
                                        <p class="more">33 <span class="tri">▲</span></p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div class="box-table">
                            <table class="m-table type01">
                                <thead>
                                <tr>
                                    <th>순위</th>
                                    <th>마을구분</th>
                                    <th class="align-center">신규가입자</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>4위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more down">53 <span class="tri">▼</span></td>
                                </tr>
                                <tr>
                                    <td>5위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more up">48 <span class="tri">▲</span></td>
                                </tr>
                                <tr>
                                    <td>6위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more up">48 <span class="tri">▲</span></td>
                                </tr>
                                <tr>
                                    <td>7위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more up">48 <span class="tri">▲</span></td>
                                </tr>
                                <tr>
                                    <td>8위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more up">48 <span class="tri">▲</span></td>
                                </tr>
                                <tr>
                                    <td>9위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more up">48 <span class="tri">▲</span></td>
                                </tr>
                                <tr>
                                    <td>10위</td>
                                    <td>평택시 신장동</td>
                                    <td class="more up">48 <span class="tri">▲</span></td>
                                </tr>
                                </tbody>
                            </table>

                            <a href="#" class="m-btn type02">마을 랭킹 TOP 100 +</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-ad">
                <div class="wrap">
                    <a href="#" target="_blank" class="link">
                        <img src="/images/ad.png" alt="">
                    </a>
                </div>
            </section>

            <section class="section-notice">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">소식</h3>

                        <nuxt-link to="/posts" class="btn-more">
                            <img src="/images/arrowRight-gray.png" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="notices.data.length === 0">
                        데이터가 없습니다.
                    </div>
                    <div class="m-items type01">
                        <nuxt-link :to="`/posts/${notice.id}`" class="m-item" v-for="notice in notices.data" :key="notice.id">
                            <div class="m-ratioBox-wrap" v-if="notice.thumbnail">
                                <div class="m-ratioBox">
                                    <img :src="notice.thumbnail" alt="">
                                </div>
                            </div>

                            <div class="content">
                                <p class="subtitle">{{ notice.district.city }} {{notice.district.district}}</p>
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

                        <nuxt-link to="/posts" class="btn-more">
                            <img src="/images/arrowRight-gray.png" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="clips.data.length === 0">
                        데이터가 없습니다.
                    </div>
                    <div class="m-items type02">
                        <div class="m-item-wrap">
                            <nuxt-link :to="`/posts/${clip.id}`" class="m-item" v-for="clip in clips.data" :key="clip.id">
                                <div class="m-ratioBox-wrap" v-if="clip.thumbnail">
                                    <div class="m-ratioBox">
                                        <img :src="clip.thumbnail" alt="">
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

                        <nuxt-link to="/posts" class="btn-more">
                            <img src="/images/arrowRight-gray.png" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="photos.data.length === 0">
                        데이터가 없습니다.
                    </div>

                    <div class="m-items type02">
                        <div class="m-item-wrap">
                            <nuxt-link :to="`/posts/${photo.id}`" class="m-item" v-for="photo in photos.data" :key="photo.id">
                                <div class="m-ratioBox-wrap" v-if="photo.thumbnail">
                                    <div class="m-ratioBox">
                                        <img :src="photo.thumbnail" alt="">
                                    </div>
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
                <a href="#" target="_blank" class="link">
                    <img src="/images/ad2.png" alt="">
                </a>
            </section>

            <quicks />
        </div>

        <navigation />
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    auth: false,
    data() {
        return {
            form: {
                district_id: "",
                district: ""
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
            }
        }
    },
    methods: {
        search() {
            this.$store.commit("changeDistrict", this.form.district);
        },
    },

    computed: {
        district(){
            return this.$store.state.district;
        }
    },

    mounted() {
        let districtId = this.district ? this.district.id : 0;

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

        this.$axios.get("/rankings/10")
            .then(response => {
                console.log(response.data);
            });

        this.$axios.get("/districts/" + this.district.id + "/register_rates")
            .then(response => {
                this.registerRates = response.data.registerRates;
            })
    }
}
</script>
