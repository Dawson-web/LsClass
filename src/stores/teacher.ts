import {
  createHomeworkAPI,
  getHomeworkFishConditionAPI,
  getHomeworkScoreDistributionAPI,
  getTeacherHomeworkAPI,
  getTeacherInfoAPI,
  gradeHomeworkAPI,
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
    const res = await getHomeworkFishConditionAPI(homeworkId);
    return res.data.data;
  }
  async function gradeHomework(form: any) {
    await gradeHomeworkAPI(form);
  }
  async function getHomeworkScoreDistribution(id: number) {
    const res = await getHomeworkScoreDistributionAPI(id);
    return res.data.data;
  }
  return {
    getTeacherInfo,
    updateTeacherInfo,
    createHomework,
    getTeacherHomework,
    getHomeworkFishCondition,
    gradeHomework,
    getHomeworkScoreDistribution,
  };
});
