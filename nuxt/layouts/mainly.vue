<template>
    <div
      class="gird-layout"
      :style="
        isCollapse ? 'grid-template-columns: 80px auto;':'grid-template-columns: 180px auto;'">

      <article>
        <nuxt/>
      </article>

      <aside>
        <slider :isCollapse="isCollapse"></slider>
      </aside>

      <header>
        <span class="iconFlod" @click="isCollapse=!isCollapse">
          <a-icon :type="flodIcon" />
        </span>
        <span style="margin-right:40px">
          <a-dropdown>
            <a-avatar
              shape="square"
              size="large"
              :style="{
                backgroundColor: '#6dbdf4',
                width:'60px',height:'30px',
                boxShadow:'grey 3px 3px 1px',
                lineHeight: '30px',
                letterSpace: '2px',
                transform:'scale(0.85)'}">{{ user.name }}</a-avatar>
            <a-menu slot="overlay">
              <a-menu-item  v-if="user.type !== 'Admin'">
                  <nuxt-link to="/user/edit">
                    修改密码
                  </nuxt-link>
              </a-menu-item>
              <a-menu-item>
                  <nuxt-link to="/user/message">
                    个人信息
                  </nuxt-link>
              </a-menu-item>
              <a-menu-item @click="outLogin">
                  退出
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </header>

    </div>
</template>

<script>
import slider from '@/components/slider'

export default {
    head:{
        title:'高校教学资料管理系统'
    },
    components: {
        slider
    },
    data(){
        return {
            isCollapse: false,
        }
    },
    computed: {
      flodIcon() {
          return this.isCollapse?'menu-unfold':'menu-fold'
      },
      user: function() {
        return process.client ? JSON.parse(window.sessionStorage.getItem("user")) : "" || { name:'管理员' }
        
      }
    },
    mounted() {
      console.log(this.user)
    },
    methods:{
      outLogin:function (e) {
          process.client ? window.sessionStorage.setItem("user",null) : "";
          this.$axios.get('/user/quit')
          this.$router.push({
            path:'/user/login'
          })
      },
    }
}
</script>
<style scoped>
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gird-layout {
    height: 100vh;
    display: grid;
    grid-template-columns: 200px auto;
    grid-template-rows: 40px auto;
    background-color: #f2f2f2;
    min-width: 1000px;
    min-height: 670px;
  }
  article {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 2/3;
    grid-row: 2/3;
    margin: 10px 40px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: -1px 1px 5px grey;
    overflow: hidden;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    grid-column: 2/3;
    grid-row: 1/2;
    box-shadow: -1px 1px 5px grey;
  }
  header .iconFlod {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 50px;
    font-size: 27px;
    color: black;
  }
  aside {
    background: #16181d;
    grid-column: 1/2;
    grid-row: 1/3;
  }
  .ant-avatar:hover {
    background-color: #1691fe !important;
    transform: scale(1.05);
  }
</style>
