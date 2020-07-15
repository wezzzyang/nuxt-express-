//状态保存
export const state = () => ({
  user: {
  }
})
//
export const mutations = {
    userMessage (state, user) {
        state.user = user;
    },
}

export const actions = {
    loginAxios: async function  (state,loginData) {
        return await this.$axios.post(`user/login`,loginData);
        //this.$axios.post 发送Post请求
        //user/login页面, loginData
        // success
    }
}
