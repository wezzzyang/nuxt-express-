<template>
    <div style="width:100%;height:100%;padding:1.25rem">
        <h1 style="margin-left:13px;font-size:30px;">
          个人信息展示
        </h1>
        <div>
          <a-input-group style="margin:10px 10px;" compact>
            <a-input style="width: 15%;color:#1890ff;" default-value="姓名" disabled/>
            <a-input style="width: 30%" :default-value="user.name" disabled />
          </a-input-group>
          <a-input-group style="margin:10px 10px;" compact>
            <a-input style="width: 15%;color:#1890ff;" default-value="用户号"  disabled/>
            <a-input style="width: 30%" :default-value="user.account"  disabled/>
          </a-input-group>
          <a-input-group style="margin:10px 10px;" compact>
            <a-input style="width: 15%;color:#1890ff;" default-value="身份"  disabled/>
            <a-input style="width: 30%" :default-value="user.type"  disabled/>
          </a-input-group>
          <a-input-group style="margin:10px 10px;" compact>
            <a-input style="width: 15%;color:#1890ff;" default-value="院系"  disabled/>
            <a-input style="width: 30%" :default-value="user.department"  disabled/>
          </a-input-group>
<!-- 不让修改 -->
        </div>
    </div>
</template>

<script>
export default {
    layout: 'mainly',
    head:{
        title:'个人信息展示'
    },
    computed: {
      user: function() {
        let midata = process.client ? JSON.parse(sessionStorage.getItem("user")) : "";
        //从浏览器获取数据
        return midata
      }
    },
    mounted() {

    },
    data(){
        return {
        }
    },

    methods:{
    },

}
</script>
<style scoped>
.login-form {
  width: 300px;
  padding: 10px;
}
</style>
