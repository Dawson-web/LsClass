import {
  createAnnouncementAPI,
  createClassAPI,
  createCourseAPI,
  createDepartmentAPI,
  deleteAnnouncementAPI,
  deleteClassAPI,
  deleteCourseAPI,
  deleteDepartmentAPI,
  getClassAPI,
  getCourseAPI,
  getDepartmentAPI,
  getManagerInfoAPI,
  getTeacherListAPI,
  updateAnnouncementAPI,
  updateClassAPI,
  updateCourseAPI,
  updateDepartmentAPI,
} from "@/api/type";
import { defineStore } from "pinia";
export const useManagerStore = defineStore("manager", () => {
  async function getManagerInfo() {
    const res = await getManagerInfoAPI();
    return res.data.data;
  }
  async function getTeacherList() {
    const res = await getTeacherListAPI();
    return res.data.data;
  }

  //公告
  async function deleteAnnouncement(id: number) {
    await deleteAnnouncementAPI(id);
  }
  async function createAnnouncement(form: any) {
    await createAnnouncementAPI(form);
  }
  async function updateAnnouncement(form: any) {
    await updateAnnouncementAPI(form);
  }
  // 院系
  async function createDepartment(departmentName: string) {
    await createDepartmentAPI(departmentName);
  }
  async function getDepartment() {
    const res = await getDepartmentAPI();
    return res.data.data;
  }
  async function deleteDepartment(id: number) {
    await deleteDepartmentAPI(id);
  }
  async function updateDepartment(form: any) {
    await updateDepartmentAPI(form);
  }
  // 班级
  async function createClass(form: any) {
    await createClassAPI(form);
  }
  async function getClass() {
    const res = await getClassAPI();
    return res.data.data;
  }
  async function deleteClass(id: number) {
    await deleteClassAPI(id);
  }
  async function updateClass(form: any) {
    await updateClassAPI(form);
  }
  // 课程
  async function createCourse(form: any) {
    await createCourseAPI(form);
  }
  async function getCourse() {
    const res = await getCourseAPI();
    return res.data.data;
  }
  async function deleteCourse(id: number) {
    await deleteCourseAPI(id);
  }
  async function updateCourse(form: any) {
    await updateCourseAPI(form);
  }
  return {
    getManagerInfo,
    deleteAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    createDepartment,
    getDepartment,
    deleteDepartment,
    updateDepartment,
    createClass,
    getClass,
    deleteClass,
    updateClass,
    createCourse,
    getCourse,
    deleteCourse,
    updateCourse,
    getTeacherList,
  };
});
