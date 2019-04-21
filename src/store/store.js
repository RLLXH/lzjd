import Vue from 'vue';
import Vuex from 'vuex';
import loadingstore from './loadingstore'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loadingstore
    },
    state: {
        showFrame: true
    },
    mutations: {

    },
    getters: {

    },
    actions: {

    }
})