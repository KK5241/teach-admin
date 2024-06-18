<template>
  <div class="fileManage-table">
    <el-table :data="tasksInfo" border style="width: 100%">
      <el-table-column
        prop="taskId"
        label="任务id"
        width="180"
        align="center"
      />
      <el-table-column
        prop="taskName"
        label="文件名"
        width="180"
        align="center"
      />
      <el-table-column
        prop="taskCourse.courseName"
        label="所属课程"
        align="center"
      />
      <el-table-column label="审核结果" align="center">
        <template #default="{ row }">
          <el-button
            class="status"
            v-if="row.checked"
            :type="
              row.checked === '未审核'
                ? 'danger'
                : row.checked === '不合格'
                ? 'warning'
                : 'success'
            "
            >{{ row.checked }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="taskPath" label="文件" align="center">
        <template #default="{ row }">
          <template v-if="row.filePath">
            <font-awesome-icon :icon="['fas', 'file']" />
            <a :href="row.filePath" style="margin-left: 5px">查看文件</a>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="opinion" label="建议" align="center"  />
      <el-table-column label="操作" align="center" v-if="role==='303'" >
        <template #default="{ row }" >
          <el-button type="primary" @click="handleModify(row)">审核</el-button>
          &nbsp;
          <el-button type="danger" @click="open(row.taskId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 点击弹出修改框 -->
    <div class="dialog" v-if="isVisibled">
      <div class="message">
        <el-card style="width: 500px; height: 380px">
          <el-form
            label-width="auto"
            :model="formLabelAlign"
            style="max-width: 600px; margin-top: 40px"
          >
            <el-form-item label="文件id">
              <el-input v-model="formLabelAlign.taskId" disabled />
            </el-form-item>
            <el-form-item label="文件名">
              <el-input v-model="formLabelAlign.taskName" disabled />
            </el-form-item>
            <el-form-item label="所属课程">
              <el-input
                v-model="formLabelAlign.taskCourse.courseName"
                disabled
              />
            </el-form-item>
            <el-form-item label="审核结果">
              <el-select
                v-model="formLabelAlign.checked"
                placeholder="请选择审核结果"
              >
                <el-option label="不合格" value="不合格" />
                <el-option label="合格" value="合格" />
              </el-select>
            </el-form-item>
            <el-form-item label="建议">
              <el-input v-model="formLabelAlign.opinion" />
            </el-form-item>
            <!-- 底部确定和取消按钮 -->
            <div class="dialog-footer" >
              <el-button @click="isVisibled = false">取消</el-button>
              <el-button type="primary" @click="modify(formLabelAlign)">
                确定
              </el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { getTasks, deleteTask,modifyTask } from "../../api/task";
import { ElMessage, ElMessageBox } from "element-plus";
import {useUserStore} from '@/store/index.js'
const userInfo = useUserStore()
const role = ref(null)
role.value = userInfo.userInfo[0].role
console.log('fff',role);
const tasksInfo = ref(null);
const isVisibled = ref(false);
let formLabelAlign = ref(null);

onMounted(async () => {
  const result = await getTasks();
  tasksInfo.value = result.data.data;
});
const handleModify = (row) => {
  isVisibled.value = true;
  formLabelAlign.value = {...row};
};
const modify = async (row) => {
  console.log(row);
  await modifyTask(row)
  const result = await getTasks();
  tasksInfo.value = result.data.data;
  isVisibled.value = false
};
const open = (id) => {
  ElMessageBox.confirm("你确定要删除该任务么", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteTask(id);
      location.reload();
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
.fileManage-table {
  margin-top: 30px;
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
