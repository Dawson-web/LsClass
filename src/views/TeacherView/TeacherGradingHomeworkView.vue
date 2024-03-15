<script lang="ts" setup>
import { useTeacherStore } from "@/stores/teacher";
import { onMounted, ref } from "vue";
const editVisible = ref(false);
const gradeHomeWorkForm = ref({});
const teacherStore = useTeacherStore();
const homeworkCondition = ref([]);
const homeworkList = ref([]);
const homeworkId = ref();
const gradeHomeworkInfo = ref({});
const getTeacherHomework = async () => {
  homeworkList.value = await teacherStore.getTeacherHomework();
};

const getHomeworkCondition = async () => {
  homeworkCondition.value = await teacherStore.getHomeworkFishCondition(
    homeworkId.value
  );
};

onMounted(async () => {
  await getTeacherHomework();
  getHomeworkCondition();
});

const gradeHomework = async (id: number) => {
  editVisible.value = true;
  gradeHomeWorkForm.value.homeworkStudentId = id;
};

const cancleGradeHomework = () => {
  gradeHomeworkInfo.value = {};
  editVisible.value = false;
};
const doGradeHomework = async () => {
  await teacherStore.gradeHomework(gradeHomeWorkForm.value);
  editVisible.value = false;
};
</script>

<template>
  <div>
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
              <span class="type">作业序列号：{{ item.title }}</span>
              <span class="type">作业：{{ item.fileSolutionUrl }}</span>
              <a
                href="item.fileSolutionUrl"
                download="abc.png"
                target="view_window"
                >下载</a
              >
              <span class="type">疑问{{ item.question }}</span>
              <span class="type">状态{{ item.status }}</span>
            </div>
          </div>
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
        <el-form-item label="打分">
          <el-input-number
            v-model="gradeHomeWorkForm.score"
            :min="1"
            :max="100"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="答疑">
          <el-input
            v-model="gradeHomeWorkForm.answering"
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <el-button @="cancleGradeHomework">Default</el-button>
      <el-button type="primary" @click="doGradeHomework">Primary</el-button>
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
