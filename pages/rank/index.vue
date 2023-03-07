<template>
  <div class="area-index">
      <header-type01
          @updatePosts="updatePosts"
      />

      <!-- 내용 영역 -->
      <div class="container">
            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/" class="m-tab active">
                        <span class="text">주별</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/" class="m-tab">
                        <span class="text">월별</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/" class="m-tab">
                        <span class="text">전체</span>
                    </nuxt-link>
                </div>
            </div>
          <section class="section-ranking">
              <div class="wrap">
                  <div class="content">
                      <div class="m-title type01">
                          <p class="sub">순위 현황 한 눈에 보기</p>
                          마을별 가입 <span class="point">TOP 100</span>
                      </div>
                      <div class="rankings">
                          <div class="ranking-wrap" v-if="districtWeekRegisterCounts.length >= 2">
                              <a href="#" class="ranking"  @click="$store.commit('changeDistrict',  {
                                id: districtWeekRegisterCounts[1].district_id,
                                district: districtWeekRegisterCounts[1].district
                                })">
                                  <div class="img-wrap">
                                      <img src="/images/2st.png" alt="">
                                  </div>

                                  <div class="fragment">
                                      <p class="subtitle">{{ districtWeekRegisterCounts[1].district }}</p>
                                      <h3 class="title">
                                          <span class="point">2</span>위
                                      </h3>
                                      <p class="more">{{ districtWeekRegisterCounts[1].now_week_count }}
                                          <span class="tri" v-if="districtWeekRegisterCounts[1].now_week_count == 0">−</span>
                                          <span class="tri" v-else-if="districtWeekRegisterCounts[1].up_down === 'down'">▼</span>
                                          <span class="tri" v-else>▲</span>
                                      </p>
                                  </div>
                              </a>
                          </div>
                          <div class="ranking-wrap first" v-if="districtWeekRegisterCounts.length >= 1">
                              <div class="ranking"  @click="$store.commit('changeDistrict',  {
                                id: districtWeekRegisterCounts[0].district_id,
                                district: districtWeekRegisterCounts[0].district
                                })">
                                  <div class="img-wrap">
                                      <img src="/images/crown.png" alt="" class="deco">
                                      <img src="/images/1st.png" alt="" class="img">
                                  </div>

                                  <div class="fragment">
                                      <p class="subtitle">{{ districtWeekRegisterCounts[0].district }}</p>
                                      <h3 class="title">
                                          <span class="point">1</span>위
                                      </h3>
                                      <p class="more">{{ districtWeekRegisterCounts[0].now_week_count }}
                                          <span class="tri" v-if="districtWeekRegisterCounts[0].now_week_count == 0">−</span>
                                          <span class="tri" v-else-if="districtWeekRegisterCounts[0].up_down === 'down'">▼</span>
                                          <span class="tri" v-else>▲</span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <div class="ranking-wrap" v-if="districtWeekRegisterCounts.length >= 3">
                              <div class="ranking"  @click="$store.commit('changeDistrict',  {
                                id: districtWeekRegisterCounts[2].district_id,
                                district: districtWeekRegisterCounts[2].district
                                })">
                                  <div class="img-wrap">
                                      <img src="/images/3st.png" alt="">
                                  </div>

                                  <div class="fragment">
                                      <p class="subtitle">{{ districtWeekRegisterCounts[2].district }}</p>
                                      <h3 class="title">
                                          <span class="point">3</span>위
                                      </h3>
                                      <p class="more">{{ districtWeekRegisterCounts[2].now_week_count }}
                                          <span class="tri" v-if="districtWeekRegisterCounts[2].now_week_count == 0">−</span>
                                          <span class="tri" v-else-if="districtWeekRegisterCounts[2].up_down === 'down'">▼</span>
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
                                  <th>순위</th>
                                  <th>마을구분</th>
                                  <th class="align-center">신규가입자</th>
                              </tr>
                              </thead>
                              <tbody>

                              <tr v-for="(districtWeekRegisterCount, index) in districtWeekRegisterCounts" :key="index"  @click="$store.commit('changeDistrict',  {
                                id: districtWeekRegisterCount.district_id,
                                district: districtWeekRegisterCount.district
                                })">
                                  <template v-if="index >= 3 && districtWeekRegisterCount">
                                  <td>{{index + 1}}위</td>
                                  <td>{{ districtWeekRegisterCount.city}} {{districtWeekRegisterCount.district}}</td>
                                      <td class="more" v-if="districtWeekRegisterCount.now_week_count == 0">{{districtWeekRegisterCount.now_week_count}} <span class="tri">−</span></td>
                                  <td class="more down" v-else-if="districtWeekRegisterCount.up_down === 'down'">{{districtWeekRegisterCount.now_week_count}} <span class="tri">▼</span></td>
                                  <td class="more up" v-else>{{districtWeekRegisterCount.now_week_count}} <span class="tri">▲</span></td>
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
          },

          districtWeekRegisterCounts: [

          ],
      }
  },
  methods: {
      async search() {
          if(this.form.district == "" || this.form.district ==  undefined) {
              return;
          }
          await this.$store.commit("changeDistrict", this.form.district);
          await this.updatePosts(this.district.id);
      },

      getRankings(count){
          this.$axios.get("/monthly-rankings/" + count)
              .then(response => {
                  this.districtWeekRegisterCounts = response.data.districtWeekRegisterCounts;
              });
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
      }
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
        district(to, from) {
            window.scrollTo(0,0);

            this.$router.push("/");
        },
    },
  async mounted() {
      await this.updatePosts(this.district.id);


      this.getRankings(100);

      if(this.district.id != 0)
          this.$axios.get("/districts/" + this.district.id + "/register_rates")
              .then(response => {
                  this.registerRates = response.data.registerRates;
              });

  },

}
</script>
