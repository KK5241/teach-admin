<template>
  <el-button
    type="primary"
    style="float: right; margin: 20px 0"
    @click="isVisible = true"
    >添加事件</el-button
  >

  <div class="dialog" v-show="isVisible">
    <div class="message">
      <el-card style="width: 600px; height: 550px">
        <el-form
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 600px"
        >
          <h1 style="margin-bottom: 25px">上传通知</h1>
          <el-form-item label="标题:">
            <el-input v-model="formLabelAlign.title" placeholder="请填写标题" />
          </el-form-item>
          <el-form-item label="描述:">
            <el-input
              v-model="formLabelAlign.description"
              placeholder="请填写描述"
            />
          </el-form-item>
          <el-form-item label="文章内容:">
            <el-input
              type="textarea"
              v-model="formLabelAlign.content"
              placeholder="请填写内容"
            />
          </el-form-item>

          <el-form-item label="发生时间:">
            <div class="demo-datetime-picker" style="width: 100%">
              <div class="block" style="width: 100%">
                <el-date-picker
                  v-model="formLabelAlign.createTime"
                  type="datetime"
                  placeholder="请选择时间"
                  style="width: 100%"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="上传首图:">
            <el-button
              type="primary"
              plan
              style="float: left"
              @click="handlePicture"
              >上传首图</el-button
            >
            <input
              type="file"
              accept=".jpg,.png"
              ref="picture"
              style="display: none"
              @change="upload($event)"
            />
          </el-form-item>
          <img
            alt=""
            ref="uploadImg"
            style="width: 150px; width: 150px; margin-left: 70px"
          />
        </el-form>
        <!-- 底部确定和取消按钮 -->
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleModify"> 确定 </el-button>
        </div>
      </el-card>
    </div>
  </div>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      prop="id"
      label="序号"
      width="180"
    ></el-table-column>
    <el-table-column prop="title" label="标题" width="250"></el-table-column>
    <el-table-column prop="description" label="描述" width="320"></el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间"
      width="250"
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="deleteRow(scope.row)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { addCircle, getCircle,deleteCircle } from "../../api/circle";
import { ElMessage, ElMessageBox } from "element-plus";
const isVisible = ref(false);
const picture = ref(null);
const formLabelAlign = ref({});
const file = ref(null);
const uploadImg = ref(null);
const tableData = ref([
]);

onMounted(async ()=>{
    getCircle1()
})

async function getCircle1() {
  const result = await getCircle();
  tableData.value = result.data;
  tableData.value.map((item) => {
    item.picture = `http://www.localhost:3000/assets/uploads/${item.picture}`;
  });
}

function editRow(row) {
  // 修改行的逻辑
}

const deleteRow = (row) => {
  ElMessageBox.confirm("请问您确定要删除改事件么么", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteCircle(row.id);
      getCircle1();
      ElMessage({
        type: "success",
        message: "删除成功",
        appendToBody: true,
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
};

const handlePicture = () => {
  picture.value.click();
  ElMessage({
      type: "success",
      message: "添加成功",
      appendToBody: true,
    });
};


// 添加新文章
const handleModify = async () => {
  addCircle(formLabelAlign.value,file.value).then(() => {
    isVisible.value = false;
    getCircle1();
    formLabelAlign.value = {};
    file.value = null;
    ElMessage({
      type: "success",
      message: "添加成功",
      appendToBody: true,
    });
  });
};

const handleCancel = () => {
  isVisible.value = false;
  uploadImg.value.src = null;
  formLabelAlign.value = {};
  file.value = null;
};

//上传图片
const upload = async (event) => {
  //这个方法将一个二进制文件转化为url地址 重要！！
  const url = URL.createObjectURL(event.target.files[0]);
  uploadImg.value.src = url;
  file.value = event.target.files[0];
};
</script>

<style lang="scss" scoped>
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
.demo-datetime-picker .el-date-editor.el-input {
  width: 100%;
}
</style>