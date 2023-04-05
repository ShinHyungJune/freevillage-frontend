// import {getDistrict, setDistrict} from '../utils/LocalStorage';

import { fetchStores, fetchNearCoords } from '../api/index'

export const state = () => ({
    district: {
        id: 0,
        district: "자유마을"
    },
    postItems: [],
    postLinks: {
        first: null,
        last: null,
        next: null,
        prev: null
    },
    postMeta: {},
    postCurrentY: '',

    //for mapView
    coords: [],
    currentAddr: '',
    currentStoreList: [],
});

export const getters = {
    getDistrict: (state) => {
        return state.district
    },
    getPostItems(state) {
        return state.postItems;
    },
    getPostLinks(state) {
        return state.postLinks;
    },
    getPostMeta(state) {
        return state.postMeta;
    },
    getPostCurrentY(state) {
        return state.postCurrentY;
    }
}

export const actions = {
    //TODO axios codes would be needed here
    FETCH_POST_ITEMS({ commit }, items) {
        commit('SET_POST_ITEMS', items);
    },
    FETCH_POST_LINKS({ commit }, links) {
        commit('SET_POST_LINKS', links);
    },
    FETCH_POST_META({ commit }, meta) {
        commit('SET_POST_META', meta);
    },
    FETCH_POST_Y({ commit }, y) {
        commit("SET_Y", y);
    },
    CLEAR_POST_STATE({ commit }) {
        commit('INIT_POST_STATE')
    },

    async fetchCurrentStores({ commit }, payload) {
        const { data } = await fetchStores(payload);
        commit('setCurrentStores', data);
    },
    async fetchNearCoords({ commit }, payload) {
        const { data } = await fetchNearCoords(payload.data);
        commit('setCoords', data);
    },
}

export const mutations = {
    changeDistrict(state, data) {
        state.district = data;
    },

    SET_POST_ITEMS(state, items) {
        state.postItems = items;
    },
    SET_POST_LINKS(state, links) {
        state.postLinks = links;
    },
    SET_POST_META(state, meta) {
        state.postMeta = meta;
    },
    SET_Y(state, y) {
        state.postCurrentY = y;
    },
    INIT_POST_STATE(state) {
        state.postItems = [];
        state.postLinks = {
            first: null,
            last: null,
            next: null,
            prev: null
        };
        state.postMeta = {};
        state.postCurrentY = 0;
    },

    setCurrentStores(state, stores) {
        state.currentStoreList = stores;
    },
    setCurrentAddr(state, addr) {
        state.currentAddr = addr;
    },
    setCoords(state, coords) {
        state.coords = [...coords];
    },
}
