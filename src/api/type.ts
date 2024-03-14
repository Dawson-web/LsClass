//此文件用于封装axios
import request from "./index";
const getToken = () => {
  return localStorage.getItem("token");
};
// 公用
export const registerAPI = (form: any) => {
  return request({
    url: `/${localStorage.getItem("usertype")}/register`,
    method: "POST",
    data: form,
  });
};
export const loginAPI = (form: any) => {
  return request({
    url: `/${localStorage.getItem("usertype")}/login`,
    method: "POST",
    data: form,
  });
};
export const getEmailCodeAPI = (email: string) => {
  return request({
    url: `/${localStorage.getItem("usertype")}/getEmailCode`,
    method: "POST",
    params: { email },
  });
};
export const backPasswordAPI = (form: any) => {
  return request({
    url: `/${localStorage.getItem("usertype")}/backPassword`,
    method: "POST",
    data: form,
  });
};
// 获取老师列表
export const getTeacherListAPI = () => {
  return request({
    url: `/teacher/getTeachers`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const getStudentListAPI = (courseId: number) => {
  return request({
    url: `/student/getStudents`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    params: {
      courseId,
    },
  });
};

//公告
export const getAnnouncementAPI = (type: number) => {
  return request({
    url: `/announcement/getAnnouncements`,
    method: "POST",
    params: {
      type: type,
      title: "",
    },
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteAnnouncementAPI = (id: number) => {
  return request({
    url: `/announcement/deleteAnnouncement`,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    params: {
      id,
    },
  });
};
export const createAnnouncementAPI = (form: any) => {
  return request({
    url: `/announcement/createAnnouncement`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const updateAnnouncementAPI = (form: any) => {
  return request({
    url: `/announcement/updateAnnouncement`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
// 院系
export const createDepartmentAPI = (departmentName: string) => {
  return request({
    url: `/department/createDepartment`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    params: {
      departmentName,
    },
  });
};
export const getDepartmentAPI = () => {
  return request({
    url: `/department/getDepartments`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteDepartmentAPI = (id: number) => {
  return request({
    url: `/department/deleteDepartment`,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    params: {
      id,
    },
  });
};
export const updateDepartmentAPI = (form: any) => {
  return request({
    url: `/department/updateDepartment`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
// 班级
export const createClassAPI = (form: any) => {
  return request({
    url: `/class/createClass`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getClassAPI = () => {
  return request({
    url: `/class/getClasses`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteClassAPI = (id: number) => {
  return request({
    url: `/class/deleteClass`,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    params: {
      id,
    },
  });
};
export const updateClassAPI = (form: any) => {
  return request({
    url: `/class/updateClass`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
// 课程
export const createCourseAPI = (form: any) => {
  return request({
    url: `/course/createCourse`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getCourseAPI = () => {
  return request({
    url: `/course/getCourses`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteCourseAPI = (id: number) => {
  return request({
    url: `/course/deleteCourse`,
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
    params: {
      id,
    },
  });
};
export const updateCourseAPI = (form: any) => {
  return request({
    url: `/course/updateCourse`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
// 管理员
export const getManagerInfoAPI = () => {
  return request({
    url: `/manager/getManagerInfo`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
// 学生
export const getStudentInfoAPI = () => {
  return request({
    url: `/student/getStudentInfo`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const updateStudentInfoAPI = (form: any) => {
  return request({
    url: `/student/updateStudentInfo`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getStudentHomeworkAPI = () => {
  return request({
    url: `/student/getHomeworks`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const getStudentHomeworkUnFinishedAPI = () => {
  return request({
    url: `/student/checkFishedStatus`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const commitStudentHomeworkAPI = (form: any) => {
  return request({
    url: `/student/commitHomework`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
// 老师
export const getTeacherInfoAPI = () => {
  return request({
    url: `/teacher/getTeacherInfo`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const updateTeacherInfoAPI = (form: any) => {
  return request({
    url: `/teacher/updateTeacherInfo`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const createHomeworkAPI = (form: any) => {
  return request({
    url: `/teacher/createHomework`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getTeacherHomeworkAPI = () => {
  return request({
    url: `/teacher/getHomeworks`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const getHomeworkFishConditionAPI = (homeworkId: number) => {
  return request({
    url: `/teacher/getFishCondition`,
    method: "POST",
    params: {
      homeworkId,
    },
    headers: {
      Authorization: getToken(),
    },
  });
};
export const checkoutHomeworkAPI = (form: any) => {
  return request({
    url: `/teacher/correctHomework`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
// 作业
export const getHomeworkRankAPI = (homeworkId: string) => {
  return request({
    url: `/homework/getRank`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    params: {
      homeworkId,
    },
  });
};
export const getHomeworkScoreDistributionAPI = (homeworkId: string) => {
  return request({
    url: `/homework/getScoreDistribution`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    params: {
      homeworkId,
    },
  });
};
