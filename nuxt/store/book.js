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
        return this.$axios.post(`book/searchBook`,{
          keyword : searchData
        });
      } catch(e) {
        alert("网络错误");
        return [];
      }
    },

    addTest: function(state, upfileData) {
      try {
        return this.$axios.post(`book/addBook`,upfileData);
      } catch(e) {
        alert("网络错误");
        return [];
      }
    },

    deleteTest: function(state, key) {
      try {
       return this.$axios.post(`book/deleteBook`,{ bookID:key });
      } catch(e) {
      console.log('e: ', e);
        alert("网络错误");
        return [];
      }
    },

    modifyTest: function(state, modifyData) {
      try {
       return this.$axios.post(`book/updateBook`,modifyData);
      } catch(e) {
      console.log('e: ', e);
        alert("网络错误");
        return [];
      }
    },

    searchMyMajorBook: function(state, myMajor) {
      try {
       return this.$axios.post(`book/searchMyMajorBook?major=${myMajor}`);
      } catch(e) {
      console.log('e: ', e);
        alert("网络错误");
        return [];
      }
    }
}
