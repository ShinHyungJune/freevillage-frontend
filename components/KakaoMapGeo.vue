<template>
  <div>
    <div class="wrapper">
      <div class="m-loading type02" v-show="!hasLoaded">
          <div class="m-loading-inner"></div>
      </div>
      <div ref="map" style="background-color:#e1e1e1;"></div>
      <div>
    </div>

      <ul>
        <li v-for="el in currentStoreList.documents"  :key=el.id>
          {{el.place_name}} / 
          {{el.address_name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mapStyle: {
      type: Object,
      default: () => {}
    },
    latLng: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      markers: [],
      circle: null,
      hasLoaded: false,
    }
  },
  computed: {
    currentStoreList: {
      get() {
        return this.$store.state.currentStoreList;
      },
      set(newList) {
        this.$store.dispatch('fetchCurrentStores',newList)
      }
    },
  },
   mounted () {
    /* global kakao */
    if (kakao && kakao.maps) {
      kakao.maps.load(() => this.initMap());
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30a2981dfdc1e54770df725f0938b014`;
      document.head.appendChild(script);
    }
    
  },
  methods: {
    /**
     * 맵 초기화
     * setBounds() 실행
     * 내 위치 표시 실행
     * 내 위치 근처 제휴점 표시 실행
     */
    async initMap() {
      this.getDefaultMap();
      const location = await this.getGeoLocation();
      this.setCircle(location.center, 750)
      this.displayMyPosition(location.center);
      // TODO(아래 두 줄)api문제로 주석처리
      const coords = await this.setBounds(this.map, this.circle);
      this.displayNearMarkers(coords);
      kakao.maps.event.addListener(this.map, 'dragend', async () => {
          this.circle.setMap(null);
          this.setCircle(this.map.getCenter(), 750);

          const coords = await this.setBounds(this.map, this.circle);
          this.displayNearMarkers(coords);
      });
    },

    /**
     * 맵 초기화시 기본 맵 설정
     */
    getDefaultMap() {
      const defaultMapContainer = this.$refs.map;
      defaultMapContainer.style.width = '400px';
      defaultMapContainer.style.height = '250px';
      let locPosition = new kakao.maps.LatLng(this.latLng[0], this.latLng[1]);
      const defaultPosition = {
        center: locPosition,
        level: 5,
      };
      // //default map
      this.map = new kakao.maps.Map(defaultMapContainer,defaultPosition);
      this.map.setMaxLevel(6);
    },
    /**
     * 맵상 오버레이 서클 객체 생성
     * @param {any} center
     * @param {Number} radius
     * @returns {Object} kakao.maps.Circle
     */
    setCircle(center, radius) {
      this.circle = new kakao.maps.Circle({
        center,
        radius,
        strokeWeight:2,
        strokeColor: '#75B8FA',
        strockeOpacity:0.7,
        fillColor: '#CFE7FF',
        fillOpacity: 0.5
      })
      this.circle.setMap(this.map);
    },
    /**
     * 내 주변 가게 좌표 반환
     * @param {Object} map
     * @param {Object} restraintObj
     * @returns {Array} coords
     */
    async setBounds(map, restraintObj = map) {
        const bounds = restraintObj.getBounds()
        const mapInfo = {
          sw:[bounds.ha,bounds.qa],
          ne:[bounds.oa,bounds.pa]
        };
        await this.$store.dispatch('fetchNearCoords', {data: mapInfo})
        const coords = this.$store.state.coords.map(position => ({
          ...position,
          coord:[parseFloat(position.y), parseFloat(position.x)]
        }));
        return coords;
    },
    /**
     * 내 getlocation 좌표 반환
     */
    async getGeoLocation() {
      try {
        const position = await this.getPos();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // this.$store.dispatch('fetchCurrentAddr', {x:lon, y:lat})
        // this.$store.dispatch('fetchCurrentStores',{x:lon, y:lat, radius:2000, query: '식당', categoryGroupCode:'FD6'})
        const locPosition = new kakao.maps.LatLng(lat,lon);
        this.hasLoaded = true;
        return {
          center: locPosition,
          level: 5,
        }
      }catch(e) {
        console.error({e},33333)
        const locPosition = new kakao.maps.LatLng(this.latLng[0], this.latLng[1]);
        this.hasLoaded = true;
        return {
          center: locPosition,
          level: 5,
        } 
      }
    },
    /**
     * window.navigator.geolocation.getCurentPostion()
     */
    getPos() {
      return new Promise((resolve,reject) => {
        window.navigator.geolocation.getCurrentPosition(resolve,reject, {
enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
        });
      });
    },
    /**
     * geolocation 상 내 위치 마커로 표시
     */
    displayMyPosition(locPosition) {
      this.marker = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
      });
      this.map.setCenter(locPosition);
    },
    /**
     * 지도 중앙 위치 근처 제휴점 마커로 표시
     */
     displayNearMarkers(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
        (position) => ({
            ...position,
            coord:new kakao.maps.LatLng(...position.coord),
        })
      );
      if (positions.length > 0) {
        this.markers =  positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position:position.coord,
              image: this.makeMarkerImage(position.image),
            })
        );
      }
    },
    /**
     * 마커 별 이미지 지정
     */
    makeMarkerImage(imageUrl) {
      const imageSrc = `/api${imageUrl}`; // 마커이미지의 주소입니다    
      const imageSize = new kakao.maps.Size(51, 55); // 마커이미지의 크기입니다
      const imageOption = {
        offset: new kakao.maps.Point(24, 51),
      }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      return markerImage; 
    },

  },
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.wrapper .m-loading.type02 {
    position: absolute;
    display:flex; align-items: center; justify-content: center;
    background-color:rgba(0,0,0,0.5);
    width:400px;
    height: 250px;
    padding:40px;
    z-index: 9999;

}
.wrapper .m-loading.type02 .m-loading-inner {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(000,186,000);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
}
</style>