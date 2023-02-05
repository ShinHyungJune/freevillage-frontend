import {getDistrict, setDistrict} from '../utils/LocalStorage';

export const state = () => ({
    district: getDistrict(),
});

export const getters = {}

export const mutations = {
    changeDistrict(state, data) {
        setDistrict(data);
        state.district = data;
    },
}
