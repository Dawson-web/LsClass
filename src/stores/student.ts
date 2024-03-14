import {
  commitStudentHomeworkAPI,
  getStudentHomeworkAPI,
  getStudentHomeworkUnFinishedAPI,
  getStudentInfoAPI,
  updateStudentInfoAPI,
} from "@/api/type";
import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", () => {
  async function getStudentInfo() {
    const res = await getStudentInfoAPI();
    return res.data.data;
  }
  async function updateStudentInfo(form: any) {
    await updateStudentInfoAPI(form);
  }

  async function getStudentHomework() {
    const res = await getStudentHomeworkAPI();
    return res.data.data;
  }
  async function getStudentHomeworkUnFinished() {
    const res = await getStudentHomeworkUnFinishedAPI();
    return res.data.data;
  }
  async function commitStudentHomework(form: any) {
    await commitStudentHomeworkAPI(form);
  }
  return {
    getStudentInfo,
    updateStudentInfo,
    getStudentHomeworkUnFinished,
    getStudentHomework,
    commitStudentHomework,
  };
});
