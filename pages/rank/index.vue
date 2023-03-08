<template>
  <div class="area-index">
      <header-type01
          @updatePosts="updatePosts"
      />

      <!-- 내용 영역 -->
      <div class="container">
        <section class="section-ranking">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을별 가입 <span class="point">TOP 10</span>
                            <p style="padding: 10px;">마을 랭킹은 매주 월요일 00시부터<br />일요일 23시59분 마을 가입 수를<br />기반으로 집계되며, 매주 리셋됩니다. </p>
                        </div>

                        <div class="m-tabs type04">

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
            activeFinder:false,
            container:{},
            form: {
                district_id: "",
                district: "",
                rankingUrl: "rankings",
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
            this.$axios.get(this.form.rankingUrl + "/100")
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
    },

    computed: {
        district(){
            return this.$store.state.district;
        },

    },

    watch: {
        district (newCount, oldCount) {
            this.getRankings(100);

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
        this.getRankings(100);

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