<template>
  <div class="header-container">
    <!-- 左边图标和你标题 -->
    <h1>
      <el-icon size="25"><HomeFilled /></el-icon>
      <span class="title">欢迎来到“ 咱村那点事 ”系统</span>
    </h1>
    <!-- 右边头像 -->
    <div class="block">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar class="a" :size="50" :src="formLabelAlign.avatar" />
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
        <el-card style="width: 500px; height: 500px">
          <el-avatar
            class="a avatar"
            :size="100"
            :src="formLabelAlign.avatar"
          />
          <br />
          <el-button
            type="primary"
            plan
            class="button"
            @click.stop="handleAvatar"
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
            <el-form-item label="年龄">
              <el-input v-model="formLabelAlign.age" />
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="formLabelAlign.loginId" disabled />
            </el-form-item>
            <el-form-item label="身份">
              <el-select v-model="formLabelAlign.role" placeholder="请选择身份">
                <el-option label="村民" :value="201"></el-option>
                <el-option
                  label="村管理"
                  :value="202"
                ></el-option> </el-select
              >
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
import { onMounted, reactive, ref } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUser, modifyUser } from "../../api/user";
import { updateAvatar } from "../../api/user";
//绑定上传头像dom按钮
const avatar1 = ref(null);

const a = [];
const formLabelAlign = reactive({});
onMounted(async () => {
  getUserInfo();
});

//获取用户信息
async function getUserInfo() {
  const result = await getUser();
  formLabelAlign.name = result.data[0].name;
  formLabelAlign.sex = result.data[0].sex;
  formLabelAlign.loginId = result.data[0].loginId;
  formLabelAlign.role = result.data[0].roleId;
  formLabelAlign.age = result.data[0].age;
  formLabelAlign.avatar = `http://www.localhost:3000/assets/uploads/${result.data[0].avatar}`;
}

const isVisibled = ref(false);

//更改用户信息
const handleModify = () => {
  modifyUser(formLabelAlign).then(()=>{
    isVisibled.value = false
    ElMessage({
      type: "success",
      message: "更新成功",
      appendToBody: true,
    });
    getUserInfo();
  });
};

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

//处理上传头像
const handleAvatar = () => {
  avatar1.value.click();
};
const update = async (event) => {
  updateAvatar(event.target.files[0]).then(() => {
    ElMessage({
      type: "success",
      message: "上传成功",
      appendToBody: true,
    });
    getUserInfo();
  });
};
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
    z-index: 100;
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
.el-message {
  z-index: 999999 !important;
}
</style>
