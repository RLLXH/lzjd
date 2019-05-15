import axios from "axios"
const state = {
    loadingData:false,
    userInfo:{},
}
const mutations = {
    setloadingData(state, loadingData) {
        state.loadingData = loadingData
    },
    setuserInfo(state, userInfo) {
        state.userInfo = userInfo
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
    setuserInfo({
        commit
    }, userInfo) {
        commit('setuserInfo', userInfo)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
