<template>
  <div class="sliderMenu">
    <h1 class="siderTitle">admin</h1>
    <a-menu
      :default-selected-keys="['0']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="isCollapse">
      <a-menu-item key="1" @click="Goto('/admin')">
        <a-icon type="desktop" />
        <span >主页</span>
      </a-menu-item>
      <a-menu-item key="2" @click="Goto('/admin/material')">
        <a-icon type="file" />
        <span>教学资料</span>
      </a-menu-item>
      <a-menu-item key="3" @click="Goto('/admin/book')">
        <a-icon type="book" />
        <span>教科书</span>
      </a-menu-item>
      <a-menu-item key="4" @click="Goto('/admin/alluser')" v-if="user.type == 'Admin'">
        <a-icon type="user" />
        <span>人员列表</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>


<style scoped>
    .siderTitle  {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 100%;
      color: white;
      background-color: #11264d;
      margin: 0;
    }
    .ant-layout-sider-children {
      height: 100vh;
    }
</style>

<script>

    export default {
        name:'slider',
        props: ['isCollapse'],
        computed: {
          user: function() {
            let midata = process.client ? JSON.parse(window.sessionStorage.getItem("user")) : "" || { name:'' };
            return midata;
          }
        },
        methods: { //储藏函数的
            Goto(url) {
              this.$router.push(url);
              // this.$router.push(/admin/material);
              // localhost:3000/admin/material;
            }
        }
    }
</script>
