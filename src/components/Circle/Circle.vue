<template>
  <div class="blog-list-container" ref="container">
    <h1 style="margin-bottom: 10px">通知公告</h1>
    <ul>
      <li v-for="item in newCircleList" :key="item.id">
        <div class="thumb">
          <router-link
            :to="{
              name: 'circleDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              :src="item.thumb"
              :title="item.title"
              style="width: 100px; height: 100px"
            />
          </router-link>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'circleDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>发布日期：{{ item.createDate }}</span>
          </div>
          <div class="desc">
            <span>文章详情：{{ item.description }}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <div class="demo-pagination-block" style="float: right; margin-top: 10px">
      <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3"
        layout="prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getCircle } from "../../api/circle";
const circleList = ref(null);
const currentPage3 = ref(1);
const pageSize3 = ref(4);
const total = ref(0);
onMounted(async () => {
  const result = await getCircle();
  circleList.value = result.data;
  circleList.value.map((item) => {
    item.thumb = `http://www.localhost:3000/assets/uploads/${item.thumb}`;
  });
  total.value = circleList.value.length;
});

const newCircleList = computed(() => {
  const start = (currentPage3.value - 1) * pageSize3.value;
  const end = currentPage3.value * pageSize3.value;
  if (circleList.value) return circleList.value.slice(start, end);
  else {
    return [];
  }
});
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
a {
  text-decoration: none;
  color: rgb(62, 62, 62);
}
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  box-sizing: border-box;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 5px 0;
    font-size: 14px;
  }
}
</style>
