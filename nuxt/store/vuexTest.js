import qs from 'qs'
export const state = () => ({
  list: []
})

export const mutations = {
    add (state, text) {
        state.list.push(text)
    },
    remove (state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
}

export const getters = {
    changeList: state => {
        return state.list.map((x)=>{
            return x + '杨晓龙'
        })
    }
}

export const actions = {
    axoisTest: function() {
        let formdata = {
            account: "admin",
            password: "123456"
        }
        
        return this.$axios.post(`user/login`,formdata)
    }
}