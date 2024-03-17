<script lang="ts" setup>
import { useTeacherStore } from "@/stores/teacher";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const editVisible = ref(false);
const gradeHomeWorkForm = ref({});
const teacherStore = useTeacherStore();
const homeworkCondition = ref([]);
const homeworkList = ref([]);
const homeworkId = ref();
const gradeHomeworkInfo = ref({});
// 获取作业列表
const getTeacherHomework = async () => {
  homeworkList.value = await teacherStore.getTeacherHomework();
};
// 获取作业详情
const getHomeworkCondition = async () => {
  homeworkCondition.value = await teacherStore.getHomeworkFishCondition(
    homeworkId.value
  );
};
// 预载
onMounted(async () => {
  await getTeacherHomework();
  getHomeworkCondition();
});
// 批改作业
const gradeHomework = async (id: number) => {
  editVisible.value = true;
  gradeHomeWorkForm.value.homeworkStudentId = id;
};
// 取消批改
const cancleGradeHomework = () => {
  gradeHomeworkInfo.value = {};
  editVisible.value = false;
  ElMessage({
    message: "取消批改",
  });
};
// 确认批改
const doGradeHomework = async () => {
  await teacherStore.gradeHomework(gradeHomeWorkForm.value);
  editVisible.value = false;
  getHomeworkCondition();
  ElMessage({
    message: "完成作业批改",
    type: "success",
  });
};
</script>

<template>
  <div class="correct-box">
    <h1>批改作业</h1>
    <el-select
      v-model="homeworkId"
      placeholder="Select"
      style="width: 140px"
      @change="getHomeworkCondition"
    >
      <el-option
        v-for="item in homeworkList"
        :key="item.homeworkId"
        :label="item.title"
        :value="item.homeworkId"
      />
    </el-select>
    <el-row :gutter="12">
      <el-col
        :span="8"
        :key="item.homeworkId"
        v-for="item in homeworkCondition"
      >
        <el-card shadow="hover" class="homework-card"
          ><h4>{{ item.studentName }}</h4>
          <div>
            <div class="bottom">
              <el-text class="type">作业序列号：{{ item.title }}</el-text>
              <el-text class="type">疑问：{{ item.question }}</el-text>
              <el-text class="type">状态：{{ item.status }}</el-text>
              <el-text class="type">分数：{{ item.score }}</el-text>
              <el-text class="type">答疑：{{ item.answering }}</el-text>
              <el-link
                style="align-self: flex-start; font-size: 12px"
                type="primary"
                :href="item.fileSolutionUrl"
                target="_blank"
                >下载附件</el-link
              >
            </div>
          </div>
          <br />
          <el-button @click="gradeHomework(item.id)">批改</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      style="display: flex; flex-direction: column"
      v-model="editVisible"
      title="批改作业"
      width="600"
    >
      <el-form label-width="auto" style="max-width: 600px">
        <el-form-item label="打分:">
          <el-input-number
            v-model="gradeHomeWorkForm.score"
            :min="1"
            :max="100"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="答疑:">
          <el-input
            v-model="gradeHomeWorkForm.answering"
            style="width: 500px"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="cancleGradeHomework">取消</el-button>
        <el-button type="primary" @click="doGradeHomework">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.correct-box {
  background-color: #eee;
  padding: 30px;
  border-radius: 15px;

  .homework-card {
    gap: 10px;
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
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      flex-direction: column;
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
}
</style>
