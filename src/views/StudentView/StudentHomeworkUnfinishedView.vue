<script lang="ts" setup>
import { useStudentStore } from "@/stores/student";
import { onMounted, ref } from "vue";
const homeworkUnFinishList = ref([]);
const studentStore = useStudentStore();
const homeworkInfo = ref({});

const commitVisible = ref(false);
// 获取未提交作业列表
const getHomeworkUnFinishList = async () => {
  homeworkUnFinishList.value =
    await studentStore.getStudentHomeworkUnFinished();
};
// 预载
onMounted(async () => {
  getHomeworkUnFinishList();
});
// 提交作业
const commitHomework = (id: number) => {
  commitVisible.value = true;
  homeworkInfo.value.homeworkId = id;
};
// 取消提交
const cancleCommitHomework = () => {
  commitVisible.value = false;
  homeworkInfo.value = {};
};
// 确认提交
const doCommitHomework = async () => {
  await studentStore.commitStudentHomework(homeworkInfo.value);
  commitVisible.value = false;
  homeworkInfo.value = {};
  getHomeworkUnFinishList();
};
</script>

<template>
  <div style="background-color: #eee; padding: 30px; border-radius: 15px">
    <h1>未提交作业：</h1>
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
          <el-button text type="primary" @click="commitHomework(item.id)"
            >提交作业</el-button
          >
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
  margin-top: 10px;
  border-radius: 15px;
  &:hover {
    transform: scale(1.02);
  }
  .type {
    align-self: flex-start;
    font-size: 12px;
    color: #999;
  }

  .bottom {
    height: 70px;
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    flex-direction: column;
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
