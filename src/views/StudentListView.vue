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
    type.value = "student";
  }
};
</script>

<template>
  <div class="app-container">
    <el-select
      v-model="type"
      placeholder="Select"
      class="custom-select"
      @change="getUserList"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        class="custom-option"
      />
    </el-select>
    <div class="user-list">
      <div v-for="item in userlist" :key="item.id" class="user-card">
        <h1 class="user-name">
          用户：{{ item.name ? item.name : item.nickname }}
        </h1>
        <p class="user-info">性别：{{ item.gender }}</p>
        <p class="user-info">邮箱：{{ item.email }}</p>
        <p class="user-info">电话：{{ item.phoneNum }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  background-color: #eee;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-select {
  width: 200px;
  font-size: 16px;
  background-color: #fafafa;
  color: #333333;
  margin-bottom: 30px;
  border-radius: 4px;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
}

.user-card {
  background-color: #fafafa;
  color: #333333;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  width: 28%;
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
}

.user-name {
  font-size: 18px;
}

.user-info {
  font-size: 14px;
}
</style>
