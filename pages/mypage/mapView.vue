<template>
  <div class="area-region-about">
    <!-- 헤더영역 -->
    <header-type01 />
    <div class="container">
      <section class="section-content">
        <div class="fragment mt-40">
          <div class="m-title type01 align-left">
            내 주변
          </div>
            <div class="m-map type01">
              <KakaoMapGeo 
                :map-style="mapStyle"
                :lat-lng="latLng"
              />
          </div>
        </div>  
      </section>
    </div>

  </div>
</template>

<script>
import KakaoMapGeo from '~/components/KakaoMapGeo.vue'
export default {
  components: {
    KakaoMapGeo,
  },
  data() {
    return {
      mapStyle: {
        width: '400px',
        height: '250px',
      },
      latLng: [37.566810695915976,126.97869753889616],
    }
  },
  mounted () {
    //district_id에 따라서 데이터 불러오기 /api/maps/{district_id

  },
  methods: {
  }
}
</script>

<style scoped>
</style>