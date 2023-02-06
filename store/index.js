// import {getDistrict, setDistrict} from '../utils/LocalStorage';

export const state = () => ({
    district: {
        id: 0,
        district: "지역마을"
    },
});

export const getters = {
    getDistrict: (state) => {
        return state.district
    }
}

export const mutations = {
    changeDistrict(state, data) {
        state.district = data;
    },
}
