//此文件用于封装axios
import DoRequest from "./index";
const getToken = () => {
  return localStorage.getItem("token");
};

export const fileMethodsAPI = (form: any) => {
  return DoRequest({
    url: `/file/uploadFile`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};

// 公用
export const registerAPI = (form: any) => {
  return DoRequest({
    url: `/${localStorage.getItem("usertype")}/register`,
    method: "POST",
    data: form,
  });
};
export const loginAPI = (form: any) => {
  return DoRequest({
    url: `/${localStorage.getItem("usertype")}/login`,
    method: "POST",
    data: form,
  });
};
export const getEmailCodeAPI = (email: string) => {
  return DoRequest({
    url: `/${localStorage.getItem("usertype")}/getEmailCode`,
    method: "POST",
    params: { email },
  });
};
export const backPasswordAPI = (form: any) => {
  return DoRequest({
    url: `/${localStorage.getItem("usertype")}/backPassword`,
    method: "POST",
    data: form,
  });
};
// 获取老师列表
export const getTeacherListAPI = () => {
  return DoRequest({
    url: `/teacher/getTeachers`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const getStudentListAPI = (courseId: number) => {
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
    url: `/announcement/createAnnouncement`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const updateAnnouncementAPI = (form: any) => {
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
    url: `/department/getDepartments`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteDepartmentAPI = (id: number) => {
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
    url: `/class/createClass`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getClassAPI = () => {
  return DoRequest({
    url: `/class/getClasses`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteClassAPI = (id: number) => {
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
    url: `/course/createCourse`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getCourseAPI = () => {
  return DoRequest({
    url: `/course/getCourses`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const deleteCourseAPI = (id: number) => {
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
    url: `/manager/getManagerInfo`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
// 学生
export const getStudentInfoAPI = () => {
  return DoRequest({
    url: `/student/getStudentInfo`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const updateStudentInfoAPI = (form: any) => {
  return DoRequest({
    url: `/student/updateStudentInfo`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getStudentHomeworkAPI = () => {
  return DoRequest({
    url: `/student/getHomeworks`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const getStudentHomeworkUnFinishedAPI = () => {
  return DoRequest({
    url: `/student/checkFishedStatus`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const commitStudentHomeworkAPI = (form: any) => {
  return DoRequest({
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
  return DoRequest({
    url: `/teacher/getTeacherInfo`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const updateTeacherInfoAPI = (form: any) => {
  return DoRequest({
    url: `/teacher/updateTeacherInfo`,
    method: "PUT",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const createHomeworkAPI = (form: any) => {
  return DoRequest({
    url: `/teacher/createHomework`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
    data: form,
  });
};
export const getTeacherHomeworkAPI = () => {
  return DoRequest({
    url: `/teacher/getHomeworks`,
    method: "POST",
    headers: {
      Authorization: getToken(),
    },
  });
};
export const getHomeworkFishConditionAPI = (homeworkId: number) => {
  return DoRequest({
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
export const gradeHomeworkAPI = (form: any) => {
  return DoRequest({
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
  return DoRequest({
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
  return DoRequest({
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
