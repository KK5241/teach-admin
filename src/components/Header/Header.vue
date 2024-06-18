<template>
  <div class="header-container">
    <!-- 左边图标和你标题 -->
    <h1>
      <el-icon size="25"><HomeFilled /></el-icon>
      <span class="title">欢迎来到教学文件管理系统</span>
    </h1>
    <!-- 右边头像 -->
    <div class="block" @click="handleAvatar">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar class="a" :size="50" :src="avatarPath" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <!-- 头像的下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="isVisibled = true"
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="layout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 点击个人信息弹出的消息框 -->
    <div class="dialog" v-show="isVisibled">
      <div class="message">
        <el-card style="width: 500px; height: 600px">
          <el-avatar class="a avatar" :size="100" :src="avatarPath" />
          <br />
          <el-button type="primary" plan class="button"
            >上传头像</el-button
          >
          <input
            type="file"
            accept=".jpg,.png"
            ref="avatar1"
            style="display: none"
            @change="update($event)"
          />
          <el-form
            label-width="auto"
            :model="formLabelAlign"
            style="max-width: 600px"
          >
            <el-form-item label="姓名">
              <el-input v-model="formLabelAlign.name" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="formLabelAlign.sex" class="ml-4">
                <el-radio value="男" size="default">男</el-radio>
                <el-radio value="女" size="default">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="formLabelAlign.loginId" disabled />
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="formLabelAlign.title" />
            </el-form-item>
            <el-form-item label="身份">
              <el-input v-model="formLabelAlign.role" />
            </el-form-item>
            <el-form-item label="所授课程">
              <el-input v-model="formLabelAlign.course" />
            </el-form-item>
            <el-form-item label="主攻方向">
              <el-input v-model="formLabelAlign.main" />
            </el-form-item>
          </el-form>
          <!-- 底部确定和取消按钮 -->
          <div class="dialog-footer">
            <el-button @click="isVisibled = false">取消</el-button>
            <el-button type="primary" @click="handleModify"> 确定 </el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { useUserStore } from "../../store";
let userInfo = useUserStore();
console.log('#',userInfo);
import { ElMessage, ElMessageBox } from "element-plus";
import {getLogin} from '../../api/login'
import { updateAvatar} from "../../api/user";
//绑定上传头像dom按钮
const avatar1 = ref(null)

const avatarPath = userInfo.  userInfo[0].avatar

const a = [];

const isVisibled = ref(false);
const formLabelAlign = reactive({
  name: userInfo.userInfo[0].name,
  sex: userInfo.userInfo[0].sex,
  loginId: userInfo.userInfo[0].loginId,
  title: userInfo.userInfo[0].title,
  role: userInfo.userInfo[0]["roleAlias.roleName"],
  course: userInfo.userInfo[0].course,
  main: userInfo.userInfo[0].main,
});

const layout = () => {
  ElMessageBox.confirm("请问您确定要退出登录么", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      location.reload();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
};

// //处理上传头像
// const handleAvatar1 = ()=>{
//   avatar1.value.click()
// }
// const update = async (event) =>{
//     await updateAvatar(userInfo[0].id,event.target.files[0])
//     const result = await getLogin()
//     userInfo.value = result.data.data[0]
// }
// //修改用户信息
// const handleModify = ()=>{

// }
</script>

<style lang="scss" scoped>
.header-container {
  height: 50px;
  display: flex;
  padding: 10px 40px;
  justify-content: space-between;
  align-items: center;
  color: black;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .title {
    position: relative;
    margin-left: 10px;
    top: -4px;
  }
  .block {
    cursor: pointer;
    .a {
      box-sizing: border-box;
      &:hover {
        border: 2px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .dialog {
    z-index: 10000;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($color: #605e5e, $alpha: 0.7);
    .message {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      .avatar {
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
      .button {
        margin: 15px 0;
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
    }
    .dialog-footer {
      position: absolute;
      right: 20px;
    }
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
