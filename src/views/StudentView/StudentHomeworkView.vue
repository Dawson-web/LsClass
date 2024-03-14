<script lang="ts" setup>
import { useStudentStore } from "@/stores/student";
import { onMounted, ref } from "vue";

const studentStore = useStudentStore();

const homeworkList = ref([]);

const updateVisible = ref(false);

onMounted(async () => {
  homeworkList.value = await studentStore.getStudentHomework();
  console.log(homeworkList.value);
});

const updateHomework = (form: any) => {
  updateVisible.value = true;
};
</script>

<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8" :key="item.id" v-for="item in homeworkList">
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
          <el-button text @click="updateHomework(form)">提交作业</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      style="display: flex; flex-direction: column"
      v-model="updateVisible"
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
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="作业文件">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">select file</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
              upload to server
            </el-button>
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="疑问">
          <el-input
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
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
