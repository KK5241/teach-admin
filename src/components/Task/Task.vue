<template>
  <div class="task-contianer">
    <br>
    <el-progress :percentage="progress"  v-if="progress"/>
    <div class="task-table">
      <el-table :data="tasks" border style="width: 100%">
        <el-table-column prop="taskId" label="任务号" align="center" />
        <el-table-column prop="taskName" label="文件名称" align="center" />
        <el-table-column prop="courseName" label="所属课程" align="center" />
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <el-button
              class="status"
              :type="
                row.status === '未上传'
                  ? 'danger'
                  : row.status === '审核中'
                  ? 'warning'
                  : 'success'
              "
              >{{ row.status }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="checked" label="审核结果" align="center">
          <template #default="{ row }">
            <el-button
            v-if="row.checked"
              class="status"
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
        <el-table-column label="文件" align="center">
          <template #default="{ row }">
          <template v-if="row.filePath">
            <font-awesome-icon :icon="['fas', 'file']" />
            <a :href="row.filePath" style="margin-left:5px">查看文件</a>
          </template>
        </template>
         
        </el-table-column>
        <el-table-column prop="opinion" label="建议" align="center" />
        <el-table-column label="文件操作" align="center" width="200">
          <template #default="{ row, $index }">
            <el-button type="primary" @click="handleUpload($index)"
              >上传</el-button
            >
            <input
              type="file"
              accept=".pdf"
              id="uploadFile"
              :ref="
                (el) => {
                  if (el) inputs[$index] = el;
                }
              "
              @change="upload($event, row.taskId)"
            />
            &nbsp;
            <el-button
              type="danger"
              @click="open(row.taskId)"
              :disabled="!row.filePath"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getTasks, uploadFile, deleteFile } from "../../api/task";
import { useUserStore } from "../../store";
import { getCourse } from "@/api/course";
import { ElMessage, ElMessageBox } from "element-plus";
const { userInfo } = useUserStore();
const inputs = ref([]);
//课程信息
let courseInfo = ref([]);
//任务列表
let handleTasks = ref([]);
//扁平化后的人物列表
var tasks = ref([]);
//数据已上传量
let fileLoaded = ref(null);
//数据总量
let fileTotal = ref(null);
//进度
let progress = ref(0);
//当前学期
const currentSemester = localStorage.getItem('currentSemester')
onMounted(async () => {
  const result1 = await getCourse(userInfo[0].id);
  courseInfo.value = result1.data.data.filter(item=>item.semester === currentSemester);
  getTask();
});

function getTask() {
  //遍历课程号，对每个课程号进行查找课程任务的操作
  courseInfo.value.forEach(async (item) => {
    const result2 = await getTasks(item.courseId);
    const arr = result2.data.data.map((item2) => {
      item2.courseName = item.courseName;
      return item2;
    });
    handleTasks.value.push(result2.data.data);
  });
  //等全部查询完后，将数组扁平化
  setTimeout(() => {
    tasks.value = handleTasks.value.flat();
  }, 200);
}
//文件上传 这里的index是所在行的下标，用于区分是哪一行在上传文件
const handleUpload = (index) => {
  inputs.value[index].click();
};
const upload = async (event, id) => {
  //添加一个回调函数目的是为了能够拿到进度监控的数据
  await uploadFile(event.target.files[0], id, (e) => {
    console.log(e);
    fileLoaded.value = e.loaded;
    fileTotal.value = e.total;
    progress.value = Math.floor((e.loaded / e.total) * 100);
  });
  handleTasks.value = [];
  progress.value = 0
  getTask();
};

//消息弹出框
const open = (id) => {
  ElMessageBox.confirm("你确定要删除该任务么", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteFile(id);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      location.reload()
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
.task-contianer {
  .task-table {
    margin-top: 30px;
    .status {
      cursor: auto;
      //取消悬浮样式
      &:hover {
        background-color: var(--el-button-bg-color);
        border-color: var(--el-button-border-color);
        color: var(--el-button-text-color);
      }
    }
  }
}
#uploadFile {
  display: none;
}
</style>
