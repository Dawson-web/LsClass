<script setup>
import { useManagerStore } from "@/stores/manager";
import { usePublicStore } from "@/stores/public";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const options = [
  {
    value: "student",
    label: "学生",
  },
  {
    value: "teacher",
    label: "教师",
  },
];

const type = ref("student");
const userlist = ref([]);

const publicStore = usePublicStore();

const getStudentList = async () => {
  userlist.value = await publicStore.getStudentList();
};
const getTeacherList = async () => {
  const mangerStore = useManagerStore();
  userlist.value = await mangerStore.getTeacherList();
};

onMounted(async () => {
  await getStudentList();
});

const getUserList = async () => {
  if (type.value === "student") {
    await getStudentList();
  } else if (
    localStorage.getItem("usertype") === "manager" &&
    type.value === "teacher"
  ) {
    await getTeacherList();
  } else {
    ElMessage.error("您没有权限查看");
  }
};
</script>

<template>
  <el-select
    v-model="type"
    placeholder="Select"
    style="width: 140px"
    @change="getUserList"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div v-for="item in userlist" :key="item.id">
    <p>{{ item.name ? item.name : item.nickname }}</p>
    <p>{{ item.gender }}</p>
    <p>{{ item.email }}</p>
    <p>{{ item.phoneNum }}</p>
    <p></p>
  </div>
</template>

<style scoped lang="scss"></style>
