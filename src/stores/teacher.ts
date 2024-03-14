import {
  checkoutHomeworkAPI,
  createHomeworkAPI,
  getHomeworkFishConditionAPI,
  getTeacherHomeworkAPI,
  getTeacherInfoAPI,
  updateTeacherInfoAPI,
} from "@/api/type";
import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teacher", () => {
  async function getTeacherInfo() {
    const res = await getTeacherInfoAPI();
    return res.data.data;
  }
  async function updateTeacherInfo(form: any) {
    await updateTeacherInfoAPI(form);
  }
  async function createHomework(form: any) {
    await createHomeworkAPI(form);
  }
  async function getTeacherHomework() {
    const res = await getTeacherHomeworkAPI();
    return res.data.data;
  }
  async function getHomeworkFishCondition(homeworkId: number) {
    await getHomeworkFishConditionAPI(homeworkId);
  }
  async function checkoutHomework(form: any) {
    await checkoutHomeworkAPI(form);
  }
  return {
    getTeacherInfo,
    updateTeacherInfo,
    createHomework,
    getTeacherHomework,
    getHomeworkFishCondition,
    checkoutHomework,
  };
});
