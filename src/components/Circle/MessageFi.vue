<template>
  <div class="comment-list">
    <span style="margin-right: 5px; font-size: 22px; font-weight: 700"
      >评论列表</span
    >
    <span>({{ comments.length }})</span>
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 600px; margin: 10px 0"
    >
      <el-form-item>
        <div style="display: flex; padding: 10px; align-items: center">
          <img :src="form.avatar" alt="用户头像" class="avatar" />
          <el-input
            v-model="form.content"
            maxlength="150"
            style="width: 400px; border: none; outline: none"
            class="submit"
            placeholder="这里是评论区，不是无人区;-)"
            show-word-limit
            type="textarea"
            resize="none"
          />
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="button" @click="submit">发布</el-button>
    <ul>
      <li v-for="item in comments" :key="item.id" class="comment-item">
        <div class="user-info">
          <img :src="item.commentUser.avatar" alt="用户头像" class="avatar" />

          <div class="content">
            <span class="username">{{ item.commentUser.name }}</span>
            <div style="margin: 10px 0"></div>
            {{ item.content }}
          </div>
        </div>

        <div class="meta">
          <span class="time">{{ item.createTime }}</span>
          <!-- <button class="like-btn">👍 {{ comment.likes }}</button> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getComment, addComment } from "@/api/comment";
import { getUser } from "../../api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
const form = ref({ content: "" });
const comments = ref([]);
const route = useRoute();
onMounted(async () => {
  const result1 = await getUser();
  getComment1();
  form.value.avatar = `http://www.localhost:3000/assets/uploads/${result1.data[0].avatar}`;
  form.value.id = result1.data[0].id;
});
async function getComment1() {
  const result = await getComment(route.params.id);
  comments.value = result.data.reverse();
  comments.value.map((item) => {
    item.commentUser.avatar = `http://www.localhost:3000/assets/uploads/${item.commentUser.avatar}`;
  });
}
const submit = () => {
    form.value.circleId = route.params.id
  if ((form.value.content === "") | (form.value.content.trim() === "")) {
    ElMessage({
      type: "warning",
      message: "输入内容不能为空",
    });
    form.value.content = "";
    return;
  }
  form.value.createTime = new Date();
  addComment(form.value).then(() => {
    getComment1();
    ElMessage({
      type: "success",
      message: "发布成功",
      appendToBody: true,
    });
    form.value.content = null;
  });
};
</script>

<style scoped>
.comment-list {
  margin: 0;
  padding: 0;
}

.button {
  position: relative;
  left: 410px;
  top: -20px;
}
.comment-item {
  list-style: none;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.submit {
  padding: 10px 0;
  border: 1px solid rgb(201, 196, 196);
  position: relative;
  top: -6px;
  left: 2px;
  border-radius: 8px;
}
.avatar {
  position: relative;
  top: -10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
  color: #333;
}

.level {
  margin-left: 8px;
  color: #999;
}

.content {
  margin-bottom: 8px;
  color: #555;
}

.meta {
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
}

.like-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 14px;
}
</style>
