<template>
    <div style="width:100%;height:100%;padding:1.25rem">
        <h1 style="margin-left:13px;font-size:30px;">
          修改密码
        </h1>
        <a-form
          id="components-form-demo-normal-edit"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
        <!--
            form:用来存放数据
            @submit 点击提交触发的事件
         -->
          <a-form-item label="账号">
            <a-input
              v-decorator="[
                'account',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              disabled>
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"  />
            </a-input>
            <!--
                v-decorator="[
                'account', //form里的account数据
                {
                    rules: [{ required: true, message: 'Please input your username!' }] //规则
                },
              ]"
             -->
          </a-form-item>
          <a-form-item label="新密码">
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button">
              修改
            </a-button>
          </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    layout: 'mainly',
    head:{
        title:'用户密码修改'
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_edit' });
      //数据与方法都未创建时
    },
    data(){//基本数据
        return {
        }
    },
    computed: {//计算数据
      user: function() {

        let midata = process.client ? JSON.parse(sessionStorage.getItem("user")) : "";
        //{"type":"Student","account":"0001","name":"管理员","department":"人工智能"}
        //从浏览器获取数据
        return midata
      },
    },
    mounted() {
      this.form.setFieldsValue({
        account: this.user.account
      });
      //给组件的form设置初始值
    },

    methods:{
      handleSubmit(e) {
        e.preventDefault();

        this.form.validateFields(async (err, values) => {
          if (!err) {
            try {
              let midata = await this.$axios.put(`/user/ChangePwd`,values);
              //根据用户的的不同，分别向三个网页发送请求
              //学生\教师\管理员
              midata.data.judge == 'success' ? alert('修改密码成功!') : alert('修改密码失败!')
              //判断是否修改成功
            } catch(err) {
              alert('修改密码失败!');
            }
          }
        });
      },
    },

}
</script>
<style scoped>
.login-form {
  width: 300px;
  padding: 10px;
}
</style>
