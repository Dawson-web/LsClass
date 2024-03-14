<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { useTeacherStore } from "@/stores/teacher";
import { Edit } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
const editVisible = ref(false);
const homeWorkForm = ref({});
const teacherStore = useTeacherStore();
const managerStore = useManagerStore();
const courseList = ref([]);
const homeworkList = ref([]);

const getTeacherHomework = async () => {
  homeworkList.value = await teacherStore.getTeacherHomework();
};

onMounted(async () => {
  getTeacherHomework();
  courseList.value = await managerStore.getCourse();
});

const cancleCreateHomework = async () => {
  editVisible.value = false;
  homeWorkForm.value = {};
};

const doCreateHomework = async () => {
  homeWorkForm.value.dueDate =
    homeWorkForm.value.dueDate * 60 * 60 * 1000 + Date.now();
  await teacherStore.createHomework(homeWorkForm.value);
  editVisible.value = false;
  getTeacherHomework();
};
</script>

<template>
  <div>
    <h1>学生作业：</h1>
    <el-row :gutter="12">
      <el-col :span="8" :key="item.homeworkId" v-for="item in homeworkList">
        <el-card shadow="hover" class="homework-card"
          ><h4>{{ item.title }}</h4>
          <div>
            <div class="bottom">
              <span class="type">作业序列号：{{ item.homeworkId }}</span>
              <span class="type">作业描述：{{ item.description }}</span>
              <span class="type">发布时间：{{ item.dueDate }}</span>
              <span class="type">截止时间：{{ item.assignmentDate }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-button
    @click="editVisible = true"
    style="position: fixed; margin-left: 95vw"
    type="primary"
    :icon="Edit"
    circle
  />
  <el-dialog v-model="editVisible" title="发布作业" width="600">
    <el-form label-width="auto" :model="homeWorkForm" style="max-width: 600px">
      <el-form-item label="标题">
        <el-input v-model="homeWorkForm.title" />
      </el-form-item>
      <el-form-item label="班级">
        <el-select
          v-model="homeWorkForm.courseId"
          placeholder="Select"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in courseList"
            :key="item.courseId"
            :label="item.courseName"
            :value="item.courseId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="完成用时">
        <el-input-number v-model="homeWorkForm.dueDate" :min="1" :max="120" />
      </el-form-item>
      <el-form-item label="作业描述">
        <el-input v-model="homeWorkForm.description" />
      </el-form-item>
      <el-form-item label="附件">
        <el-input v-model="homeWorkForm.fileUrl" type="file" />
      </el-form-item>
    </el-form>
    <el-button @="cancleCreateHomework">Default</el-button>
    <el-button type="primary" @click="doCreateHomework">Primary</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
.homework-card {
  .type {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
  }

  .desc {
    height: 80px;
    width: 100%;
    overflow: hidden;
  }
  .link {
    float: right;
    margin-top: 8px;
    padding: 0;
    min-height: auto;
  }
}
</style>
