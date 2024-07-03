<template>
  <div class="content-container">
    <h1>{{ data.title }}</h1>
    <div class="aside" v-show="data.title">
      <span>日期：{{ data.createDate }}</span>
    </div>
    <div class="content">
      <div class="content markdown-body" v-html="data.content"></div>
      <!-- 评论 -->
      <div class="blog-comment-container">
        <MessageFi></MessageFi>
        <!-- <DataList :data="dataList.rows"></DataList> -->
        <!-- <div class="loading" v-loading="isLoading"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
import MessageFi from "./MessageFi.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/markdown.css";
.content-container {
  .content {
    .markdown-body {
      padding: 20px;
    }
  }
}
.aside {
  font-size: 14px;
  color: rgb(169, 167, 167);
  span {
    margin-right: 10px;
  }
  a {
    font-size: 14px;
    color: rgb(169, 167, 167);
    margin-right: 10px;
    &:hover {
      color: rgb(79, 153, 185);
    }
  }
}
.blog-comment-container {
  padding-top:20px;
  border-top: 2px dotted green;
}
</style>
