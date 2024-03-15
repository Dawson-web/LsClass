<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { useTeacherStore } from "@/stores/teacher";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const form = ref({});
const departmentList = ref([]);
const courseList = ref([]);

const managerStore = useManagerStore();
const teacherStore = useTeacherStore();

onMounted(async () => {
  form.value = await teacherStore.getTeacherInfo();
  courseList.value = await managerStore.getCourse();
  departmentList.value = await managerStore.getDepartment();
});

const update = ref(true);
const updateTeacherInfo = async () => {
  await teacherStore.updateTeacherInfo(form.value);
  form.value = await teacherStore.getTeacherInfo();
  update.value = true;
  ElMessage({
    message: "个人信息更新成功",
    type: "success",
  });
};
</script>
<template>
  <div>
    <el-card
      style="
        width: 480px;
        margin: 0 auto;
        margin-top: 20vh;
        border-radius: 15px;
      "
      shadow="always"
      ><el-form :model="form" label-width="auto">
        <el-form-item label="名称">
          <el-input v-model="form.nickname" :disabled="update" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender" :disabled="update" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" :disabled="update" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phoneNum" :disabled="update" />
        </el-form-item>
        <el-form-item label="学科">
          <el-select
            v-model="form.subject"
            placeholder="Select"
            size="large"
            style="width: 240px"
            disabled
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.courseName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select
            v-model="form.department"
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
        <el-button type="primary" @click="updateTeacherInfo">确认</el-button>
      </div></el-card
    >
  </div>
</template>

<style lang="scss" scoped></style>
