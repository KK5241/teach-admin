<template>
  <div class="home-page-container">
    <el-card class="top-card" body-style="display: flex;">
      <div ref="echart1" style="width: 400px; height: 300px"></div>
      <div ref="echart2" style="width: 700px; height: 300px"></div>
    </el-card>
  </div>
</template>

<script setup>
import { text } from "@fortawesome/fontawesome-svg-core";
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { getTasks } from "../../api/task";
import { getCourse } from "../../api/course";
import { useUserStore } from "../../store";
const { userInfo } = useUserStore();
const echart1 = ref(null);
const echart2 = ref(null);
//未上传的任务数量
const noUpload = ref(null);
//已上传
const upload = ref(null);
//合格数
const qualified = ref(null)
//不合格数
const noQualified = ref(null)
//课程信息
let courseInfo = ref([]);
//身份信息
const role = ref(null)
//获取当前学期
const currentSemester  = localStorage.getItem('currentSemester')
onMounted(async () => {
  role.value = userInfo[0].role
  if(role.value === '301'){
    var result1 = await getCourse(userInfo[0].id);
  }else{
    var result1 = await getCourse();
  }
  courseInfo.value = result1.data.data.filter(item=>item.semester===currentSemester);
  getTask();
});
//任务列表
let handleTasks = ref([]);
//扁平化后的人物列表
var tasks = ref([]);

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
    noUpload.value = tasks.value.filter((item) => item.status === "未上传").length;
    upload.value = tasks.value.filter((item) => item.status !== "未上传").length;
    qualified.value = tasks.value.filter(item=>item.checked === '合格').length
    noQualified.value = tasks.value.filter(item=>item.checked === '不合格').length
    getEchart1();
    getEchart2();
  }, 200);
}

const getEchart1 = function () {
  var myChart = echarts.init(echart1.value); // 使用 echart.value 来获取 DOM 元素
  myChart.setOption({
    title: {
      text: "文件上传率",
    },
    tooltip: {
      trigger: "item", // 触发类型，默认为 'item'
      formatter: "{b} : {c} <br> {d}%", // 提示框内容格式器，{a} 表示系列名称，{b} 表示数据项名称，{c} 表示数据项值
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: noUpload.value,
            name: "未上传",
          },
          {
            value: upload.value,
            name: "已上传",
          },
        ],
        radius: "100px",
      },
    ],
  });
};
const getEchart2 = function () {
  var myChart = echarts.init(echart2.value); // 使用 echart.value 来获取 DOM 元素
  myChart.setOption({
    title: {
      text: "文件审核情况",
    },
    tooltip: {
      trigger: "item", // 触发类型，默认为 'item'
      formatter: "{b} : {c} ", // 提示框内容格式器，{a} 表示系列名称，{b} 表示数据项名称，{c} 表示数据项值
    },
    xAxis: {
      data: ["未上传", "不合格", "合格",],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: [noUpload.value, noQualified.value,qualified.value],
      },
    ],
  });
};
</script>

<style lang="scss" scoped>
.top-card {
  width: 1200px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
</style>
