<template>
  <div>
    <div class="user-table">
      <el-table :data="userInfo" border style="width: 100%">
        <el-table-column prop="id" label="用户id" width="180" align="center" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="loginId" label="用户名" align="center" />
        <el-table-column prop="userRole.roleName" label="角色" align="center" />
        <el-table-column prop="title" label="职称" align="center" />
        <el-table-column prop="main" label="主攻方向" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" @click="handleModify(row)"
              >修改</el-button
            >
            &nbsp;
            <el-button type="danger" @click="open(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 点击弹出修改框 -->
      <div class="dialog" v-if="isVisibled">
        <div class="message">
          <el-card style="width: 500px; height: 400px">
            <el-form
              label-width="auto"
              :model="formLabelAlign"
              style="max-width: 600px; margin-top: 40px"
            >
            <el-form-item label="用户ID" >
                <el-input v-model="formLabelAlign.id" disabled/>
              </el-form-item>
              <el-form-item label="姓名" >
                <el-input v-model="formLabelAlign.name" />
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.loginId" />
              </el-form-item>
              <el-form-item label="角色">
                <el-select v-model="formLabelAlign.role" placeholder="请选择角色">
                  <el-option label="教师" value="301"></el-option>
                  <el-option label="教学秘书" value="302" ></el-option>
                  <el-option label="系主任" value="303"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职称">
                <el-input v-model="formLabelAlign.title" />
              </el-form-item>
              <el-form-item label="主攻方向">
                <el-input v-model="formLabelAlign.main" />
              </el-form-item>
            </el-form>
            <!-- 底部确定和取消按钮 -->
            <div class="dialog-footer">
              <el-button @click="isVisibled = false">取消</el-button>
              <el-button type="primary" @click="modify"> 确定 </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getUser,deleteUser,modifyUser1} from "@/api/user";
import { ElMessage, ElMessageBox } from "element-plus";
const userInfo = ref(null);
let isVisibled = ref(false);
let formLabelAlign = ref(null);
onMounted(async () => {
  const result = await getUser();
  userInfo.value = result.data.data;
});
const handleModify = (row) => {
  isVisibled.value = true;
  formLabelAlign.value = {...row};
  console.log(formLabelAlign.value);
};

//修改用户信息
const modify = async ()=>{
  await modifyUser1(formLabelAlign.value)
  const result = await getUser();
  userInfo.value = result.data.data;
  isVisibled.value = false
}
//删除  消息弹出
const open = (id) => {
  ElMessageBox.confirm("你确定要删除该用户么", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteUser(id);
      location.reload()
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
};
</script>

<style lang="scss" scoped>
.user-table {
  margin-top: 30px;
}
.dialog {
  z-index: 10;
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
    z-index: 1;
    .button {
      margin: 15px 0;
      position: relative;
      left: 30%;
      transform: translate(-50%);
    }
  }
  .dialog-footer {
    position: absolute;
    right: 20px;
  }
}
</style>
