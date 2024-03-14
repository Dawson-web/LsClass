<script setup>
import { usePublicStore } from "@/stores/public";
import { onMounted, ref } from "vue";

const studentlist = ref([]);
const publicStore = usePublicStore();
onMounted(async () => {
  studentlist.value = await publicStore.getStudentList();
});
</script>

<template>
  <div v-for="item in studentlist" :key="item.id">
    <span>{{ item.name }}</span
    ><span>{{ item.gender }}</span
    ><span></span><span></span><span></span>
  </div>
</template>

<style scoped lang="scss"></style>
