<script lang="ts" setup>
import { usePublicStore } from "@/stores/public";
import { useStudentStore } from "@/stores/student";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const studentStore = useStudentStore();
const publicStore = usePublicStore();
const homeworkList = ref([]);
const homeworkInfo = ref({});
const fileUrl = new FormData();
const commitVisible = ref(false);
const topic = ref("");

// 预载
onMounted(async () => {
  homeworkList.value = await studentStore.getStudentHomework();
  console.log(homeworkList.value);
});
// 提交作业
const commitHomework = (id: number, _description: string) => {
  commitVisible.value = true;
  homeworkInfo.value.homeworkId = id;
  topic.value = _description;
  console.log(topic.value);
};
// 取消提交
const cancleCommitHomework = () => {
  homeworkInfo.value = {};
  commitVisible.value = false;
  ElMessage({
    message: "取消提交",
  });
};
// 格式化文件路径
const fixContent = async () => {
  let fileInput = document.getElementById("myFile");
  fileUrl.append(
    "file",
    fileInput.files[0],
    homeworkInfo.value.fileSolutionUrl
  );
  var pathSegments = await publicStore.fileMethods(fileUrl);
  homeworkInfo.value.fileSolutionUrl =
    "http://8.137.11.172/forest/" + pathSegments.substring(22);
};
// 确认提交
const doCommitHomework = async () => {
  await fixContent();
  await studentStore.commitStudentHomework(homeworkInfo.value);
  commitVisible.value = false;
  ElMessage({
    message: "作业提交成功",
    type: "success",
  });
};
</script>

<template>
  <div style="background-color: #eee; padding: 30px; border-radius: 15px">
    <el-row :gutter="12">
      <el-col :span="8" :key="item.id" v-for="item in homeworkList">
        <el-card shadow="hover" class="homework-card"
          ><h4>{{ item.title }}</h4>
          <div>
            <div class="bottom">
              <el-text class="type">作业序列号：{{ item.id }}</el-text>
              <el-text class="type">课程名：{{ item.courseName }}</el-text>
              <el-text class="type">任课老师：{{ item.teacherName }}</el-text>
              <el-text class="type">作业状态：{{ item.status }}</el-text>
              <el-text class="type">作业分数：{{ item.score }}</el-text>
              <el-text class="type"
                >答疑：{{ item.answering ? item.answering : "待答疑" }}</el-text
              >
              <el-text class="type">
                附件:
                <el-link
                  type="primary"
                  :href="item.homeWorkInfo.fileUrl"
                  target="_blank"
                  style="font-size: 12px"
                  >下载附件</el-link
                ></el-text
              >
            </div>
          </div>
          <el-button
            text
            type="primary"
            @click="commitHomework(item.id, item.homeWorkInfo.description)"
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
        label-position="right"
        :model="homeworkInfo"
        style="max-width: 600px"
      >
        <el-form-item label="题目">
          <el-input
            style="width: 500px"
            v-model="topic"
            :rows="2"
            type="textarea"
            disabled
          />
        </el-form-item>
        <el-form-item label="文本答案">
          <el-input
            style="width: 500px"
            v-model="homeworkInfo.solution"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>

        <el-form-item label="附件">
          <el-input
            v-model="homeworkInfo.fileSolutionUrl"
            type="file"
            id="myFile"
          />
        </el-form-item>
        <el-form-item label="疑问">
          <el-input
            style="width: 500px"
            :rows="2"
            type="textarea"
            v-model="homeworkInfo.question"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="cancleCommitHomework">取消</el-button>
        <el-button type="primary" @click="doCommitHomework">确认</el-button>
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
