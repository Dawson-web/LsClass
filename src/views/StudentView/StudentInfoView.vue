<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { useStudentStore } from "@/stores/student";
import { onMounted, ref } from "vue";

const form = ref({});
const departmentList = ref([]);
const classList = ref([]);

const managerStore = useManagerStore();
const studentStore = useStudentStore();

onMounted(async () => {
  form.value = await studentStore.getStudentInfo();
  classList.value = await managerStore.getClass();
  departmentList.value = await managerStore.getDepartment();
});

const onSubmit = () => {
  console.log("submit!");
};
const update = ref(true);
const updateStudentInfo = async () => {
  await studentStore.updateStudentInfo(form.value);
  form.value = await studentStore.getStudentInfo();
  update.value = true;
};
</script>
<template>
  <el-card
    style="width: 480px; margin: 0 auto; margin-top: 20vh"
    shadow="always"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名：">
        <el-input v-model="form.name" :disabled="update" />
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="form.gender" :disabled="update" />
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
    <el-button @click="update = false">开始更改</el-button>
    <el-button type="primary" @click="updateStudentInfo">确认</el-button>
  </el-card>
</template>

<style lang="scss" scoped></style>
