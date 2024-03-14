<template>
  <div class="class-box">
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>{{ form.courseName }}</span>
        </div>
      </template>
      <p class="text item">{{ form.departmentName }}</p>
      <template #footer>发布者：{{ form.className }}</template>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.class-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
<script lang="ts" setup>
const form = {
  courseId: 13,
  courseName: "数据结构与算法",
  departmentName: "计算机科学与工程学院",
  teacherName: "张老师",
  startDate: 1677772800000,
  endDate: 1677753600000,
  description: "本课程将深入研究数据结构和算法的基本原理和应用。",
  className: "计科221",
};
</script>
