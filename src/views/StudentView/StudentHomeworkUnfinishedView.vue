<script lang="ts" setup>
import { useStudentStore } from "@/stores/student";
import { onMounted, ref } from "vue";
const homeworkUnFinishList = ref([]);
const studentStore = useStudentStore();

const getHomeworkUnFinishList = async () => {
  homeworkUnFinishList.value =
    await studentStore.getStudentHomeworkUnFinished();
};

onMounted(async () => {
  getHomeworkUnFinishList();
});
const homeworkInfo = ref({});

const commitVisible = ref(false);
const commitHomework = (id: number) => {
  commitVisible.value = true;
  homeworkInfo.value.homeworkId = id;
};
const cancleCommitHomework = () => {
  commitVisible.value = false;
  homeworkInfo.value = {};
};
const doCommitHomework = async () => {
  await studentStore.commitStudentHomework(homeworkInfo.value);
  commitVisible.value = false;
  homeworkInfo.value = {};
  getHomeworkUnFinishList();
};
</script>

<template>
  <div>
    <h1>未完成作业：</h1>
    <el-row :gutter="12">
      <el-col :span="8" :key="item.id" v-for="item in homeworkUnFinishList">
        <el-card shadow="hover" class="homework-card"
          ><h4>{{ item.title }}</h4>
          <div>
            <div class="bottom">
              <span class="type">作业序列号：{{ item.id }}</span>
              <span class="type">课程名：{{ item.courseName }}</span>
              <span class="type">任课老师：{{ item.teacherName }}</span>
              <span class="type">学生：{{ item.studentName }}</span>
              <span class="type">作业状态：{{ item.status }}</span>
              <span class="type">作业分数：{{ item.score }}</span>
            </div>
          </div>
          <el-button text @click="commitHomework(item.id)">提交作业</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      style="display: flex; flex-direction: column"
      v-model="commitVisible"
      title="提交作业"
      width="600"
    >
      <el-form
        label-width="auto"
        :model="homeworkInfo"
        style="max-width: 600px"
      >
        <el-form-item label="文本答案">
          <el-input
            v-model="homeworkInfo.solution"
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="附件">
          <el-input v-model="homeworkInfo.fileSolutionUrl" type="file" />
        </el-form-item>
        <el-form-item label="疑问">
          <el-input
            v-model="homeworkInfo.question"
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="cancleCommitHomework">取消</el-button>
        <el-button type="primary" @click="doCommitHomework">提交</el-button>
      </div>
    </el-dialog>
  </div>
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
