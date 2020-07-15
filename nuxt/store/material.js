export const state = () => ({
  list: []
})
export const mutations = {
    axiosData( state, listData ) {
      state.list = Array.isArray(listData) ? listData : [];
    }
}

// export const getters = {
//     changeList: state => {
//         return state.list.map((x)=>{
//             return x;
//         })
//     }
// }

export const actions = {
    searchTest: function(state, searchData ) {
      try {
        return this.$axios.get(`material/search?key=${searchData}`);
      } catch(e) {
        alert("网络错误");
        return [];
      }
    },

    upfileTest: function(state, upfileData) {
      try {
        return this.$axios.post(`material/upload`,upfileData);;
      } catch(e) {
        alert("网络错误");
        return [];
      }
    },

    deleteTest: function(state, key) {
      try {
       return this.$axios.delete(`material/delete?id=${key}`);;
      } catch(e) {
        alert("网络错误");
        return [];
      }
    }
}
