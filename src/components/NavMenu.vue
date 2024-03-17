<template>
  <div class="nav-menu">
    <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      router="true"
      style="min-width: 800px"
      @select="handleSelect"
    >
      <el-menu-item index="1" route="announce">公告</el-menu-item>
      <slot name="Menu"></slot>
    </el-menu>

    <div
      style="
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 120px;
      "
    >
      <el-avatar shape="square" :src="info.avatarUrl" />
      <el-popconfirm title="确认退出账号？" @confirm="logout">
        <template #reference>
          <el-button>退出</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useManagerStore } from "@/stores/manager";
import { useStudentStore } from "@/stores/student";
import { useTeacherStore } from "@/stores/teacher";
import { onMounted, ref } from "vue";
const info = ref({});
// 获取头像
onMounted(async () => {
  let userType = localStorage.getItem("usertype");

  if (userType === "student") {
    info.value = await useStudentStore().getStudentInfo();
  } else if (userType === "teacher") {
    info.value = await useTeacherStore().getTeacherInfo();
  } else if (userType === "manager") {
    info.value = await useManagerStore().getManagerInfo();
  } else {
    info.value.avatarUrl =
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
  }
});
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  location.reload();
};
</script>

<style lang="scss" scoped>
.nav-menu {
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
</style>
