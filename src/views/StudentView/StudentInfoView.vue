<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { usePublicStore } from "@/stores/public";
import { useStudentStore } from "@/stores/student";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const form = ref({});
const departmentList = ref([]);
const classList = ref([]);
const birth = ref("");
const avatarUrl = ref("");
const update = ref(true);

const publicStore = usePublicStore();
const managerStore = useManagerStore();
const studentStore = useStudentStore();

//预载
onMounted(async () => {
  form.value = await studentStore.getStudentInfo();
  form.value.birth = new Date(form.value.birth);
  classList.value = await managerStore.getClass();
  departmentList.value = await managerStore.getDepartment();
});
// 格式化文件路径
const fixContent = async () => {
  if (avatarUrl.valuel !== "") {
    const fileUrl = new FormData();
    let fileInput = document.getElementById("myFile");
    fileUrl.append("file", fileInput.files[0], avatarUrl.value);
    var pathSegments = await publicStore.fileMethods(fileUrl);
    form.value.avatarUrl =
      "http://8.137.11.172/forest/" + pathSegments.substring(22);
    avatarUrl.value = "";
  }
};
// 更新学生信息
const updateStudentInfo = async () => {
  await fixContent();
  form.value.birth = new Date(Date.parse(birth.value)).getTime();
  await studentStore.updateStudentInfo(form.value);
  form.value = await studentStore.getStudentInfo();
  form.value.birth = new Date(form.value.birth);
  update.value = true;
  ElMessage({
    message: "个人信息更新成功",
    type: "success",
  });
  location.reload();
};
</script>
<template>
  <el-card
    style="width: 480px; margin: 0 auto; margin-top: 20vh; border-radius: 20px"
    shadow="always"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="头像">
        <el-avatar shape="square" :src="form.avatarUrl" />
        <el-input
          style="width: 300px; margin-left: 20px"
          placeholder="请选择头像文件"
          v-model="avatarUrl"
          :disabled="update"
          type="file"
          id="myFile"
        />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="form.name" :disabled="update" />
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="form.gender" :disabled="update" />
      </el-form-item>
      <el-form-item label="生日:">
        <el-input v-if="update" v-model="form.birth" :disabled="update" />
        <div class="block" v-if="!update">
          <el-date-picker
            v-model="birth"
            type="dates"
            placeholder="Pick one or more dates"
          />
        </div>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="form.email" :disabled="update" />
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="form.phoneNum" :disabled="update" />
      </el-form-item>
      <el-form-item label="住址：">
        <el-input v-model="form.address" :disabled="update" />
      </el-form-item>
      <el-form-item label="班级：">
        <el-select
          v-model="form.classMajorId"
          placeholder="Select"
          size="large"
          style="width: 240px"
          disabled
        >
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.className"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学院：">
        <el-select
          v-model="form.departmentId"
          placeholder="Select"
          size="large"
          style="width: 240px"
          disabled
        >
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.department"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button @click="update = false">开始更改</el-button>
      <el-button type="primary" @click="updateStudentInfo">确认</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>
