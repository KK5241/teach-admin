<template>
  <div class="Statistics-container">
    <el-input
      v-model="input"
      style="width: 240px; margin: 20px 0; float: left"
      placeholder="请输入关键字"
      @input="searchThrottle"
    />
    <el-select
      v-model="typeValue"
      style="width: 240px; float: left; margin: 20px 15px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- <el-button
      type="primary"
      style="float: right; margin: 20px 0"
      @click="isVisible = true"
      >添加事件</el-button
    > -->

    <!-- 搜索框无内容的表单 -->
    <el-table :data="newTableData" stripe style="width: 100%">
      <el-table-column prop="id" label="序号" width="100" align="center" />
      <el-table-column prop="address" label="地点" width="100" align="center" />
      <el-table-column label="事件类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.type === 1">种植情况</el-tag>
          <el-tag type="warning" v-else-if="row.type === 2"
            >周围道路情况</el-tag
          >
          <el-tag type="success" v-else>新鲜事情</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="eventUser.name" label="村民" align="center" />
      <el-table-column prop="content" label="内容" align="center" />
      <el-table-column
        prop="createTime"
        label="发生时间"
        width="150"
        align="center"
      />
      <el-table-column label="照片" align="center">
        <template #default="{ row }">
          <a :href="row.picture"
            ><img :src="row.picture" alt="" style="width: 120px; height: 80px"
          /></a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row, $index }">
          <el-button type="danger" @click="handleDelete($index, row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页放到这里 -->
    <div class="demo-pagination-block" style="float: right; margin-top: 10px">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import throttle from "../../utils/throttle";
import { getEvent, addEvent, deleteEvent } from "@/api/event.js";
import { useUserStore } from "../../store";
import { ElMessage, ElMessageBox } from "element-plus";
const currentPage = ref(1);
const typeList = ref([]);
const pageSize = ref(4);
const total = ref(null);
let { userInfo } = useUserStore();
const typeValue = ref("0");
const tableData = ref([]);
const input = ref("");
const searchList = ref([]);
const isVisible = ref(false);
const formLabelAlign = ref({});
const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
const picture = ref(null);
const uploadImg = ref(null);
const file = ref(null);
// 挂载时获取数据
onMounted(async () => {
  getEvents();
  
});

async function getEvents() {
  const result = await getEvent();
  tableData.value = result.data;
  tableData.value.map((item) => {
    item.picture = `http://www.localhost:3000/assets/uploads/${item.picture}`;
  });
  typeList.value = tableData.value;
  searchList.value = typeList.value;
  total.value = searchList.value.length;
  console.log('123',tableData.value);
}
//分页新数据
const newTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = currentPage.value * pageSize.value;
  if (tableData.value) return searchList.value.slice(start, end);
  else {
    return [];
  }
});

//整体搜索和类型选择的逻辑有点乱 可以多看看记住这种模式

//监听事件类型
watch(typeValue, (newValue) => {
  if (newValue == "0") typeList.value = tableData.value;
  else {
    typeList.value = tableData.value.filter((item) => {
      return item.type == typeValue.value;
    });
  }
  searchThrottle();
});

//类型选择框选项
const options = [
  {
    value: "0",
    label: "全部",
  },
  {
    value: "1",
    label: "种植情况",
  },
  {
    value: "2",
    label: "周边道路情况",
  },
  {
    value: "3",
    label: "新鲜事情",
  },
];
const option = [
  {
    value: "1",
    label: "种植情况",
  },
  {
    value: "2",
    label: "周边道路情况",
  },
  {
    value: "3",
    label: "新鲜事情",
  },
];
// 做了节流的搜索函数
const searchThrottle = throttle(() => {
  searchList.value = typeList.value.filter((item) => {
    if (item.content.includes(input.value)) {
      return item;
    }
  });
  total.value = searchList.value.length;
}, 500);
//处理上传图片
const handlePicture = () => {
  picture.value.click();
};

//上传图片
const upload = async (event) => {
  //这个方法将一个二进制文件转化为url地址 重要！！
  const url = URL.createObjectURL(event.target.files[0]);
  uploadImg.value.src = url;
  file.value = event.target.files[0];
};

const handleCancel = () => {
  isVisible.value = false;
  uploadImg.value.src = null;
  formLabelAlign.value = {};
  file.value = null;
};

//添加新事件
const handleModify = async () => {
  formLabelAlign.value.userId = userInfo[0].id;
  addEvent(formLabelAlign.value, file.value).then(() => {
    isVisible.value = false;
    getEvents();
    formLabelAlign.value = {};
    file.value = null;
    typeValue.value = "0";
    input.value = "";
    ElMessage({
      type: "success",
      message: "添加成功",
      appendToBody: true,
    });
  });
};

//删除事件
const handleDelete = (index, row) => {
  ElMessageBox.confirm("请问您确定要删除改事件么么", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteEvent(row.id);
      typeValue.value = "0";
      input.value = "";
      getEvents();
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
