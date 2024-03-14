<template>
  <NavMenu>
    <template #Menu>
      <el-menu-item index="2" route="homework">学生作业</el-menu-item>
      <el-menu-item index="3" route="userinfo">教师信息</el-menu-item>
      <el-menu-item index="4" route="studentlist">学生列表</el-menu-item>
    </template>
  </NavMenu>
  <RouterView></RouterView>
</template>
<script lang="ts" setup>
import NavMenu from "@/components/NavMenu.vue";
</script>

<style lang="scss" scoped></style>
