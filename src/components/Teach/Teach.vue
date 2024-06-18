<template>
  <div class="teach-container">
    <div class="teach-table">
      <el-table :data="course" border style="width: 100%">
          <el-table-column
            prop="courseId"
            label="课程号"
            width="180"
            align="center"
          />
          <el-table-column
            prop="courseNum"
            label="课序号"
            width="180"
            align="center"
          />
          <el-table-column prop="courseName" label="课程名称" align="center" />
          <el-table-column prop="count" label="课程人数" align="center" />
          <el-table-column prop="class" label="上课班级" align="center" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 4]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="courseInfo.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { getCourse } from "@/api/course";
import { useUserStore } from "@/store";
import { computed, onMounted, ref } from "vue";
const currentPage = ref(1);
const pageSize = ref(1);
const { userInfo } = useUserStore();
let courseInfo = ref([]);
const course = computed(() => {
  const start = pageSize.value * (currentPage.value - 1);
  const end = pageSize.value * currentPage.value;
  return courseInfo.value.slice(start, end);
});
onMounted(async () => {
  const currentSemester = localStorage.getItem("currentSemester");
  const result = await getCourse(userInfo[0].id);
  courseInfo.value = result.data.data.filter(item=>item.semester === currentSemester);
  console.log(courseInfo.value);
});

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
};
</script>

<style lang="scss" scoped>
.teach-table {
  margin-top: 30px;
}
.pagination {
  float: right;
  margin-top: 15px;
}
</style>
