<template>
  <NavMenu :avatar="avatar">
    <template #Menu>
      <el-sub-menu index="2">
        <template #title>作业</template>
        <el-menu-item index="2-1" route="homework">所有作业</el-menu-item>
        <el-menu-item index="2-2" route="homeworkunfinished"
          >未完成作业</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item index="3" route="userinfo">学生信息</el-menu-item>
    </template>
  </NavMenu>
  <RouterView></RouterView>
</template>
<script lang="ts" setup>
import NavMenu from "@/components/NavMenu.vue";
// import { useStudentStore } from "@/stores/student";
// import { onMounted, ref } from "vue";
// const info = ref({});
// const avatar = ref("");
// onMounted(async () => {
//   info.value = await useStudentStore().getStudentInfo;
//   avatar.value = info.avatarUrl;
//   console.log(1111);
// });
</script>

<style lang="scss" scoped></style>
