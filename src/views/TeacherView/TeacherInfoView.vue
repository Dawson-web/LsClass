<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { useTeacherStore } from "@/stores/teacher";
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

const onSubmit = () => {
  console.log("submit!");
};
const update = ref(true);
const updateTeacherInfo = async () => {
  await teacherStore.updateTeacherInfo(form.value);
  form.value = await teacherStore.getTeacherInfo();
  update.value = true;
};
</script>
<template>
  <el-card
    style="width: 480px; margin: 0 auto; margin-top: 20vh"
    shadow="always"
    ><el-form :model="form" label-width="auto">
      <el-form-item label="Activity nickname">
        <el-input v-model="form.nickname" :disabled="update" />
      </el-form-item>
      <el-form-item label="Activity gender">
        <el-input v-model="form.gender" :disabled="update" />
      </el-form-item>
      <el-form-item label="Activity email">
        <el-input v-model="form.email" :disabled="update" />
      </el-form-item>
      <el-form-item label="Activity phoneNum">
        <el-input v-model="form.phoneNum" :disabled="update" />
      </el-form-item>
      <el-form-item label="Activity subject">
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
      <el-form-item label="学院：">
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
    <el-button @click="update = false">开始更改</el-button>
    <el-button type="primary" @click="updateTeacherInfo"
      >确认</el-button
    ></el-card
  >
</template>

<style lang="scss" scoped></style>
