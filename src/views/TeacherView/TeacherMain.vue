<template>
  <NavMenu>
    <template #Menu>
      <el-sub-menu index="2">
        <template #title>作业</template>
        <el-menu-item index="2-1" route="homework">发布作业</el-menu-item>
        <el-menu-item index="2-2" route="homeworkcontidion"
          >批改作业</el-menu-item
        >
      </el-sub-menu>
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
