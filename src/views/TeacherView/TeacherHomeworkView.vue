<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { usePublicStore } from "@/stores/public";
import { useTeacherStore } from "@/stores/teacher";
import { onMounted, ref } from "vue";
const editVisible = ref(false);
const homeWorkForm = ref({});
const publicStore = usePublicStore();
const teacherStore = useTeacherStore();
const managerStore = useManagerStore();
const courseList = ref([]);
const homeworkList = ref([]);
const fileUrl = new FormData();
// 获取作业列表
const getTeacherHomework = async () => {
  homeworkList.value = await teacherStore.getTeacherHomework();
};
// 挂载
onMounted(async () => {
  getTeacherHomework();
  courseList.value = await managerStore.getCourse();
});
// 取消创建作业
const cancleCreateHomework = async () => {
  editVisible.value = false;
  homeWorkForm.value = {};
};
// 格式化url
const fixContent = async () => {
  let fileInput = document.getElementById("myFile");
  fileUrl.append("file", fileInput.files[0], homeWorkForm.value.fileUrl);
  var pathSegments = await publicStore.fileMethods(fileUrl);
  console.log(pathSegments);

  homeWorkForm.value.fileUrl =
    "http://8.137.11.172/forest/" + pathSegments.substring(22);
  console.log(homeWorkForm.value.fileUrl);
};
// 创建作业
const doCreateHomework = async () => {
  await fixContent();
  homeWorkForm.value.dueDate =
    homeWorkForm.value.dueDate * 60 * 60 * 1000 + Date.now();
  await teacherStore.createHomework(homeWorkForm.value);
  editVisible.value = false;
  getTeacherHomework();
};

const timeConvert = (time: number) => {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScript months range from 0 to 11, hence the "+1" and then "0" + to add leading zero
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1>学生作业：</h1>
      <el-button
        @click="editVisible = true"
        type="primary"
        class="update-button"
        >发布作业</el-button
      >
    </div>
    <el-row :gutter="12">
      <el-col :span="8" :key="item.homeworkId" v-for="item in homeworkList">
        <el-card shadow="hover" class="homework-card info-card">
          <h4>{{ item.title }}</h4>
          <div class="homework-info">
            <el-text class="type">作业序列号：{{ item.homeworkId }}</el-text>
            <el-text class="type">作业描述：{{ item.description }}</el-text>
            <el-text class="type"
              >截止时间：{{ timeConvert(item.dueDate) }}</el-text
            >
            <el-text class="type"
              >发布时间：{{ timeConvert(item.assignmentDate) }}</el-text
            >
            <el-link
              type="primary"
              :href="item.fileUrl"
              target="_blank"
              class="link"
              >下载附件</el-link
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      v-model="editVisible"
      title="发布作业"
      width="600"
      class="info-card"
    >
      <el-form label-width="auto" :model="homeWorkForm" class="info-form">
        <el-form-item label="标题">
          <el-input v-model="homeWorkForm.title" class="input-field" />
        </el-form-item>
        <el-form-item label="班级">
          <el-select
            v-model="homeWorkForm.courseId"
            placeholder="Select"
            size="large"
            style="width: 240px"
            class="custom-select"
          >
            <el-option
              v-for="item in courseList"
              :key="item.courseId"
              :label="item.className"
              :value="item.courseId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="完成用时">
          <el-input-number
            v-model="homeWorkForm.dueDate"
            :min="1"
            :max="120"
            class="custom-select"
          />
        </el-form-item>
        <el-form-item label="作业描述">
          <el-input
            v-model="homeWorkForm.description"
            type="textarea"
            class="input-field"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="附件">
          <el-input
            v-model="homeWorkForm.fileUrl"
            type="file"
            id="myFile"
            class="input-field"
          />
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button @click="cancleCreateHomework" class="update-button"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="doCreateHomework"
          class="confirm-button"
          >发布</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  background-color: #eee;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.update-button {
  color: #333333;
  background-color: #fafafa;
  border-color: #333333;
  &:hover {
    color: #fafafa;
    background-color: #333333;
  }
}

.info-card {
  background-color: #fafafa;
  color: #333333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  width: 90%;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
}

.homework-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .type {
    color: #333333;
    font-size: 16px;
  }
}

.input-field,
.custom-select {
  color: #333333;
  font-size: 16px;
  background-color: #fafafa;
  border-radius: 4px;
  width: 200px;
  margin-bottom: 10px;
}

.button-container {
  text-align: center;
}

.confirm-button {
  color: #333333;
  background-color: #fafafa;
  border-color: #333333;
  margin: 10px;
  &:hover {
    color: #fafafa;
    background-color: #333333;
  }
}
</style>
