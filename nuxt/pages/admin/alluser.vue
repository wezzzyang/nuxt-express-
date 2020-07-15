<template>
  <div style="width:100%;height:100%;overflow:auto;">
    <a-table
      bordered
      rowKey='bookID'
      :data-source="dataSource"
      :columns="columns">
      <template slot="title">
        <div style="width:100%;
            display:flex;
            justify-content:space-between;">
          <div  style="display:flex;
                align-items:center;
                justify-content:space-between;">
            <h1 style="margin:0">人员查询</h1>
            <a-input-search placeholder="input search text" style="width: 300px;margin-left:30px" @search="onSearch" />
          </div>
        </div>
      </template>

    </a-table>
  </div>
</template>

<script>

import {  mapActions, mapState, mapMutations } from 'vuex'

export default {
    layout: 'mainly',
    head:{
      title:'人员展示'
    },

    data(){
      return {
        midata: [],
        columns: [{
            title: '账号',
            dataIndex: 'account',
          },
          {
            title: '密码',
            dataIndex: 'password',
          },
          {
            title: '姓名',
            dataIndex: 'name',
          },
          {
            title: '院系',
            dataIndex: 'department',
          },
          {
            title: '专业',
            dataIndex: 'major',
          },
        //  {"type":"Admin","account":"0001","name":"管理员","department":"人工智能"}
        ]
      }
    },
    // [{},{}]
    async mounted() {
        try {
            this.midata = Array.isArray((await this.$axios.get(`Admin/QueryAllUsers`)).data) ? (await this.$axios.get(`Admin/QueryAllUsers`)).data : [];
            //发送请求获取数据
        } catch(e) {
            this.midata = [];
            alert("网络错误, 请稍候再试!")
        }

    },
    computed: {
      dataSource: function () {
        return this.midata;
        //计算 数据属性
      },
    },//变量
    methods:{
      async onSearch(searchData) {
        try {
          let data = (await this.$axios.post(`Admin/searchUser`,{keyword : searchData})).data
          this.midata = Array.isArray(data) ? data : []  ;
        } catch(err) {
          console.log('err: ', err);
        }

      },
    },
  }
</script>
<style scoped>
</style>
