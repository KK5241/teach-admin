<template>
  <div class="login-container">
    <div class="login-show">
      <div class="logo">
        <img
          src="https://xiaoban.hebau.edu.cn/__local/A/F1/C3/C5E6614D598EF966D8B1EB13127_B6BAB821_9D78.gif?e=.gif"
          alt=""
        />
        <h1>河北农业大学</h1>
      </div>
      <div class="login">
        <h1>Login</h1>
        <el-form :inline="true"  class="demo-form-inline">
          <label>
            <font-awesome-icon :icon="['fas', 'user']" style="color: #ffffff" />
            <input type="text" placeholder="请输入账号" v-model="loginData.loginId" />
          </label>
          <br />
          <label>
            <font-awesome-icon :icon="['fas', 'key']" style="color: #ffffff" />
            <input type="password" class="password" placeholder="请输入密码" v-model="loginData.loginPwd" />
          </label>
          <br />

          <div class="button">
            <el-button type="warning" style="width: 100px; margin-right: 17px" @click="handleSubmit"
              >登陆</el-button
            >
            <el-button type="warning" style="width: 100px; margin-left: 17px" @click="handleRegister"
              >注册</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../router/router";
import { getLogin } from "../../api/login";
import { useUserStore } from "../../store";
import { storeToRefs } from "pinia";
let userInfo = useUserStore()
const loginData = ref({
    loginId:'',
    loginPwd:'',
})
const handleRegister = function(){

}
const handleSubmit = async function(){
  const res = await getLogin(loginData.value)
  if(res.data.code === '0'){
    console.log(res.data.token)
    userInfo.userInfo = res.data.data
    console.log('@',userInfo);
    sessionStorage.setItem('token',res.data.token)
    router.push('/')
  }else{
    alert(res.data.msg)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-show {
    width: 800px;
    display: flex;
    height: 400px;
    border-radius: 15px;
    background-image: url("https://file.moyublog.com/d/file/2021-12-03/d51d4b0634efda302264607796f60238.jpg");
    box-shadow: -2px 2px 13px rgb(150, 149, 149);
  }
  .logo {
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 180px;
      height: 180px;
      margin-bottom: 15px;
      border-radius: 50% 20%;
    }
    h1 {
      color: rgba(255, 255, 255);
    }
  }
  .login {
    flex: 1 1 auto;
    text-align: center;
    padding: 50px;
    h1 {
      color: white;
      margin: 35px 0;
    }
    input {
      height: 30px;
      width: 200px;
      padding: 0px 10px;
      border-radius: 30px;
      margin-bottom: 18px;
      margin-left: 10px;
      border: 0;
      outline: 0;
    }
    .password {
      position: relative;
      top: -3px;
      left: -1px;
    }
  }
}
.role {
  position: relative;
  top: -6px;
  left: 13px;
}

.demo-form-inline .el-input {
  --el-input-width: 200px;
}

.demo-form-inline .el-select {
  --el-select-width: 210px;

  margin-left: 10px;
  position: relative;
  left: 10px;
}
</style>