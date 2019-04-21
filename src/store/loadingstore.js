import axios from "axios"
const state = {
    loadingData:false,
}
const mutations = {
    setloadingData(state, loadingData) {
        state.loadingData = loadingData
    },
}
const getters = {

}
const actions = {
    setloadingData({
        commit
    }, loadingData) {
        commit('setloadingData', loadingData)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
