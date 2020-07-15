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
            <h1 style="margin:0">教科书</h1>
            <a-input-search placeholder="input search text" style="width: 300px;margin-left:30px" @search="onSearch" />
          </div>
          <div>
            <a-button type="primary" @click="buttonSearch" style="margin-right:20px" v-if="user.type == 'Student' ">
              查找本专业所用教材
            </a-button>
            <a-button type="primary" @click="showModal"  v-if="user.type != 'Student' ">
              添加书籍
            </a-button>
          </div>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button  style="height:30px;margin-left:20px" @click="addData(record)"  v-if="user.type != 'Student' ">
          修改
        </a-button>
        <a-button type="danger" style="height:30px;margin-left:20px" @click="deleteData(record.bookID)"  v-if="user.type != 'Student' ">
          删除
        </a-button>
      </template>
    </a-table>

    <a-modal v-model="visible" :title="bookIDJudge?'资料上传':'资料上传(书号无法修改,请删除)'" ok-text="确认" cancel-text="取消" @ok="upFile" @cancel="quxiao">
        <a-input-group style="margin:10px 10px;" compact v-if="bookIDJudge">
          <a-input style="width: 70px;color:#1890ff;" default-value="书号" disabled/>
          <a-input style="width: 50%" v-model="book.bookID" placeholder="输入书号"/>
        </a-input-group>
        <a-input-group style="margin:10px 10px;" compact>
          <a-input style="width: 70px;color:#1890ff;" default-value="作者" disabled/>
          <a-input style="width: 50%" v-model="book.author" placeholder="输入书本作者"/>
        </a-input-group>
        <a-input-group style="margin:10px 10px;" compact>
          <a-input style="width: 70px;color:#1890ff;" default-value="书名" disabled/>
          <a-input style="width: 50%" v-model="book.bookName" placeholder="输入书名"/>
        </a-input-group>
        <a-input-group style="margin:10px 10px;" compact>
          <a-input style="width: 70px;color:#1890ff;" default-value="专业" disabled/>
          <a-input style="width: 50%" v-model="book.major" placeholder="输入专业"/>
        </a-input-group>
        <a-input-group style="margin:10px 10px;" compact>
          <a-input style="width: 70px;color:#1890ff;" default-value="出版商" disabled/>
          <a-input style="width: 50%" v-model="book.publisher" placeholder="输入出版商姓名"/>
        </a-input-group>
        <a-input-group style="margin:10px 10px;" compact>
          <a-input style="width: 70px;color:#1890ff;" default-value="备注" disabled/>
          <a-input style="width: 50%" v-model="book.beiZhu" placeholder="输入备注"/>
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
        book: {
          bookID: '',
          bookName: '',
          author: '',
          major: '',
          publisher: '',
          beiZhu: '',
        },
        visible: false,
        bookIDJudge: false,
      }
    },
    async mounted() {
        try {
            let midata = Array.isArray((await this.$axios.get(`book/findAllBook`)).data) ? (await this.$axios.get(`book/findAllBook`)).data : [];
            this.$store.commit('book/axiosData',midata);
        } catch(e) {
          console.log('e: ', e);
            this.$store.commit('book/axiosData',[]);
        }

    },
    computed: {
      dataSource: function () {
        return this.$store.state.book.list;
      },
      user: function() {
        let midata = process.client ? JSON.parse(sessionStorage.getItem("user")) : "";
        return midata
      },
      columns: function() {
        if (this.user.type=='Student')  { return [{
            title: '书号',
            dataIndex: 'bookID',
          },
          {
            title: '书名',
            dataIndex: 'bookName',
          },
          {
            title: '专业',
            dataIndex: 'major',
          },
          {
            title: '作者',
            dataIndex: 'author',
          },
          {
            title: '上传者',
            dataIndex: 'publisher',
          },
          {
            title: '备注',
            dataIndex: 'beiZhu',
          },
        ] }else { return [{
              title: '书号',
              dataIndex: 'bookID',
            },
            {
              title: '书名',
              dataIndex: 'bookName',
            },
            {
              title: '专业',
              dataIndex: 'major',
            },
            {
              title: '作者',
              dataIndex: 'author',
            },
            {
              title: '出版商',
              dataIndex: 'publisher',
            },
            {
              title: '备注',
              dataIndex: 'beiZhu',
            },
            {
              title: '操作',
              dataIndex: 'operation',
              scopedSlots: { customRender: 'operation' },
            },
          ]
        }
      }
    },
    methods:{
      ...mapMutations({
        axiosData: 'book/axiosData'
      }),
      ...mapActions({
        searchTest: 'book/searchTest',
        deleteTest: 'book/deleteTest',
        addTest: 'book/addTest',
        searchMyMajorBook: 'book/searchMyMajorBook',
        modifyTest: 'book/modifyTest'
      }),

      async deleteData(key) {
        let midata = await this.deleteTest(key);
        this.$store.commit('book/axiosData',midata.data)
      },

      addData(addBookData) {
        this.visible = true;
        this.bookIDJudge = false;
        this.book = JSON.parse(JSON.stringify(addBookData));

      },

      async onSearch(searchData) {
        let midata = await this.searchTest(searchData)
        this.$store.commit('book/axiosData',midata.data)
      },


      async upFile() {
        let book = this.book;
        try {
          if(book.bookID != '' && book.author!=''&&book.major!=''&&book.publisher!=''&&book.bookName!='') {
            let midata = this.bookIDJudge ?  await this.addTest(this.book) : await this.modifyTest(this.book);
            this.$store.commit('book/axiosData',midata.data)
            this.visible = false;
            this.book = {
              bookID: '',
              bookName: '',
              author: '',
              major: '',
              publisher: '',
              beiZhu: '',
            }
          } else {
            alert("除备注外不能为空,重新输入")
          }
        } catch(err) {
          console.log('err:',err)
        }

      },
      async buttonSearch() {
        let midata = await this.searchMyMajorBook(this.user.major);
        this.$store.commit('book/axiosData',midata.data)
      },

      downloadData(key) {
      },

      showModal() {
        this.visible = true;
        this.bookIDJudge = true;
      },
      quxiao() {
        this.visible = false;
          this.book = {
            bookID: '',
            bookName: '',
            author: '',
            major: '',
            publisher: '',
            beiZhu: '',
          }
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
</style>
