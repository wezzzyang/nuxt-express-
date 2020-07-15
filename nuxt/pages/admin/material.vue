<template>
  <div style="width:100%;height:100%;overflow:auto;">
    <a-table
      bordered
      rowKey='id'
      :data-source="dataSource"
      :columns="columns">
      <template slot="title">
        <div style="width:100%;
            display:flex;
            justify-content:space-between;">
          <div  style="display:flex;
                align-items:center;
                justify-content:space-between;">
            <h1 style="margin:0">教学资料</h1>
            <a-input-search placeholder="input search text" style="width: 300px;margin-left:30px" @search="onSearch" />
          </div>
          <div>
            <a-button type="primary" @click="showModal" v-if="user.type != 'Student' ">
              资料上传
            </a-button>
          </div>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button icon="download" style="height:30px"  @click="downloadData(record.id)">
          Download
        </a-button>
        <a-button type="danger" style="height:30px;margin-left:20px" @click="deleteData(record.id)" v-if="user.type != 'Student' ">
          删除
        </a-button>
      </template>

    </a-table>
    <a-modal v-model="visible" title="资料上传" ok-text="上传" cancel-text="取消" @ok="subFile">
          <input type="file" name="file" id="file" multiple="multiple" style="margin-bottom:30px" @change="changeFile($event)">
          <a-input-group compact>
            <a-input style="width: 100px; color:#1890ff;" default-value="上传者姓名" disabled />
            <a-input style="width: 50%" placeholder="请输入上传者" v-model="uploadFile.uploader" disabled/>
          </a-input-group>
    </a-modal>
  </div>
</template>

<script>

import {  mapActions, mapState, mapMutations } from 'vuex'

export default {
    layout: 'mainly',
    head:{
      title:'教学资料'
    },
    data(){
      return {
        headers: {
          authorization: 'authorization-text',
        },
        uploadFile: {
          uploader:'',
          file:'',
        },
        visible: false,
        columns: [
          {
            title: '资料名',
            dataIndex: 'name',
          },
          {
            title: '大小',
            dataIndex: 'size',
          },
          {
            title: '上传者',
            dataIndex: 'uploader',
          },
          {
            title: '上传时间',
            dataIndex: 'uploadTime',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: 300,
            scopedSlots: { customRender: 'operation' },
          },
        ],
      }
    },
    async mounted() {
        try {
            let midata = Array.isArray((await this.$axios.get(`material/search?key`)).data) ? (await this.$axios.get(`material/search?key`)).data :[];
            this.$store.commit('material/axiosData',midata);
        } catch(e) {
            this.$store.commit('material/axiosData',[]);
        }

    },
    computed: {
      dataSource: function () {
        return this.$store.state.material.list;
      },
      user: function() {
        let midata = process.client ? JSON.parse(sessionStorage.getItem("user")) : "";
        this.uploadFile.uploader = midata.name;
        return midata
      }
    },
    methods:{
      ...mapMutations({
        axiosData: 'material/axiosData'
      }),
      ...mapActions({
        searchTest: 'material/searchTest',
        deleteTest: 'material/deleteTest',
      }),
      changeFile(e) {
        this.uploadFile.file = e.target.files[0]
      },
      async subFile(e) {
        if(this.uploadFile.file !== '' && this.uploadFile.uploader !== '') {
          let formData = new FormData();
          formData.append("file",this.uploadFile.file);
          formData.append("uploader",this.uploadFile.uploader);

          try {
            let midata = (await this.$axios.post(`material/upload`,formData)).data;
            midata = Array.isArray(midata) ? midata : [];
            this.$store.commit('material/axiosData',midata)
          } catch(e) {
            alert('网络错误');
            this.$store.commit('material/axiosData',[])
          }
          this.visible = false;
        } else {
          alert("数据不能为空")
        }

      },
      async deleteData(key) {
        let midata = (await this.deleteTest(key)).data;
        this.$store.commit('material/axiosData',midata)
      },

      async onSearch(searchData) {
        let midata = (await this.searchTest(searchData)).data;
        this.$store.commit('material/axiosData',midata)
      },

      async upFile(fileData) {
        let midata = (await this.upfileTest(fileData)).data;
        this.$store.commit('material/axiosData',midata)
      },

      downloadData(key) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.id === key);
        window.open(target.downloadUrl)
      },

      showModal() {
        this.visible = true;
      },

      confirm() {
        this.$confirm({
          okText: '确认',
          cancelText: '取消',
        });
      },
    },
  }
</script>
<style scoped>
.formFile {
  display:flex;
  flex-direction: column;
  width: 50%;
  margin-left: 25%;
}
</style>
