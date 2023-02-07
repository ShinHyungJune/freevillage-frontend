<template>
    <div>
        <div :class="inputClass">
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
        </div>
    </div>
</template>
<script>
export default {
    props: {
        state: {
            default: ""
        },
        city: {
            default: ""
        },
        district_id: {
            default: ""
        },
        inputClass: {
            default: "m-input-select type02"
        }
    },
    data() {
        return {
            states: [],
            cities: [],
            districts: [],
            stateData: this.state,
            cityData: this.city,
            districtIdData: this.district_id
        }
    },

    methods: {
        changeState() {
            this.$axios.get("/cities?state=" + this.stateData)
                .then(response => {
                    this.cities = response.data;

                    this.districts = [];

                    this.districtIdData = "";

                    this.change();
                });
        },

        changeCity() {
            this.$axios.get(`/districts?state=${this.stateData}&city=${this.cityData}`)
                .then(response => {
                    this.districts = response.data;

                    this.districtIdData = "";

                    this.change();
                });
        },

        change(){
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
            this.states = response.data;
        })
    }
}
</script>
