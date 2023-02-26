<template>
    <!-- type02 -->
    <div class="m-inputs type01" v-if="type === 'type02'">
        <div class="m-input-wrap">
            <div class="m-input-select type01">
                <select name="" id="" v-model="stateData" @change="changeState">
                    <option value="" disabled>시/도 선택</option>
                    <option :value="state" v-for="(state, index) in states" :key="index">{{ state }}</option>
                </select>
            </div>
        </div>

        <div class="m-input-wrap">
            <div class="m-input-select type01">
                <select name="" id="" v-model="cityData" @change="changeCity">
                    <option value="" disabled>시/군/구 선택</option>
                    <option :value="city" v-for="(city, index) in cities" :key="index">{{ city }}</option>
                </select>
            </div>
        </div>

        <div class="m-input-wrap">
            <div class="m-input-select type01">
                <select name="" id="" v-model="districtIdData" @change="change">
                    <option value="" disabled>읍/면/동 선택</option>
                    <option :value="district.id" v-for="(district, index) in districts" :key="index">
                        {{ district.district }}
                    </option>
                </select>
            </div>
        </div>
    </div>

    <!-- default -->
    <div v-else>
        <Dropdown
            :menuTitle="'시/도 선택'"
            :activate="stateActive"
            :items="states"
            :selected="stateSelected"
            @toggle="toggleState"
            @change="changeState"
        />
        <Dropdown
            :menuTitle="'시/군/구 선택'"
            :activate="cityActive"
            :items="cities"
            :selected="citySelected"
            @toggle="toggleCity"
            @change="changeCity"
        />
        <Dropdown
            :menuTitle="'읍/면/동 선택'"
            :activate="districtActive"
            :items="districts"
            :selected="districtSelected"
            @toggle="toggleDistrict"
            @change="change"
        />

        <!-- <div :class="inputClass">
            <select name="" id="" v-model="stateData" @change="changeState">
                <option value="" disabled>시/도 선택</option>
                <option :value="state" v-for="(state, index) in states" :key="index">{{ state }}</option>
            </select>
        </div>
        <div class="mt-8"></div>
        <div :class="inputClass">
            <select name="" id="" v-model="cityData" @change="changeCity">
                <option value="" disabled>시/군/구 선택</option>
                <option :value="city" v-for="(city, index) in cities" :key="index">{{ city }}</option>
            </select>
        </div>
        <div class="mt-8"></div>
        <div :class="inputClass">
            <select name="" id="" v-model="districtIdData" @change="change">
                <option value="" disabled>읍/면/동 선택</option>
                <option :value="district.id" v-for="(district, index) in districts" :key="index">
                    {{ district.district }}
                </option>
            </select>
        </div> -->
    </div>
</template>
<script>
import Dropdown from './dropdown.vue'
export default {
    components: {
        Dropdown,
    },
    props: {
        type: {
            default: ""
        },
        state: {
            default: ""
        },
        city: {
            default: ""
        },
        district: {
            default: ""
        },
        district_id: {
            default: ""
        },
        inputClass: {
            default: "m-input-select type02"
        }
    },
    computed: {
        stateSelected() {
            return !!this.stateData;
        },
        citySelected() {
            return !!this.cityData;
        },
        districtSelected() {
            return !!this.districtIdData;
        }
    },
    data() {
        return {
            stateActive: false,
            cityActive: false,
            districtActive: false,
            states: this.state ? [this.state] : [],
            cities: this.city ? [this.city] : [],
            districts: this.district ? [this.district] : [],
            stateData: this.state,
            cityData: this.city,
            districtIdData: this.district_id,

            orders: {
                "서울" : 1,
                "경기" : 2,
                "인천" : 3,
                "부산" : 4,
                "대구" : 5,
                "광주" : 6,
                "대전" : 7,
                "울산" : 8,
                "세종" : 9,
                "강원" : 10,
                "충북" : 11,
                "충남" : 12,
                "전북" : 13,
                "전남" : 14,
                "경북" : 15,
                "경남" : 16,
                "제주" : 17,
            }
        }
    },

    methods: {
        toggleState() {
            this.stateActive = !this.stateActive;
            this.cityActive = false;
            this.districtActive = false;
        },
        toggleCity() {
            this.cityActive = !this.cityActive;
            this.stateActive = false;
            this.districtActive = false;
        },
        toggleDistrict() {
            this.districtActive = !this.districtActive;
            this.stateActive = false;
            this.cityActive = false;
        },
        changeState(stateData) {
            if(stateData && typeof stateData == 'string') {
                this.stateData = stateData;
            }
            // const data = stateData ? stateData : this.stateData
            this.$axios.get(`/cities?state=${this.stateData}`)
                .then(response => {
                    this.cities = response.data;

                    this.cityData = '';

                    this.districts = [];

                    this.districtIdData = "";

                    this.change();
                });
        },

        changeCity(cityData) {
            if(cityData && typeof cityData == 'string') {
                this.cityData = cityData;
            }
            this.$axios.get(`/districts?state=${this.stateData}&city=${this.cityData}`)
                .then(response => {
                    this.districts = response.data;

                    this.districtIdData = "";

                    this.change();
                });
        },

        change(districtData){
            if(districtData && typeof districtData == 'number') {
                this.districtIdData = districtData;
            }
            this.$emit("change", {
                state: this.stateData,
                city: this.cityData,
                district: this.districts.find(district => district.id == this.districtIdData),
                district_id: this.districtIdData
            });
        },
    },

    mounted() {
        this.$axios.get("/states").then(response => {
            this.states = response.data.sort((a,b) => {
                return this.orders[a] - this.orders[b];
            });
        })
    }
}
</script>
