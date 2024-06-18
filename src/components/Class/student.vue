<template>
  <div class="student-container">
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="card" label="学号" width="180" align="center" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="sex" label="性别" width="180" align="center" />
        <el-table-column prop="college" label="学院" align="center" />
        <el-table-column prop="class" label="班级" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row, $index }">
            <el-button size="mini" @click="handleEdit($index, row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete($index, row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>

const tableData = [
  {
    card: "2020225100302",
    name: "周荣浩",
    sex: "男",
    college: "信息科学与技术学院",
    class: "计科2106班",
  },
  {
    card: "2020225100302",
    name: "周荣浩",
    sex: "男",
    college: "信息科学与技术学院",
    class: "计科2106班",
  },
  {
    card: "2020225100302",
    name: "周荣浩",
    sex: "男",
    college: "信息科学与技术学院",
    class: "计科2106班",
  },
  {
    card: "2020225100302",
    name: "周荣浩",
    sex: "男",
    college: "信息科学与技术学院",
    class: "计科2106班",
  },
];


</script>

<style lang="scss" scoped>
.student-container {
  .content {
    margin-top: 20px;
  }
}
</style>