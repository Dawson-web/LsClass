import ManagerMain from "@/views/ManagerView/ManagerMain.vue";
import RegisterView from "@/views/RegisterView.vue";
import StudentMain from "@/views/StudentView/StudentMain.vue";
import TeacherMain from "@/views/TeacherView/TeacherMain.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/register",
      component: RegisterView,
    },
    {
      path: "/backpassword",
      component: () => import("@/views/BackPasswordView.vue"),
    },
    {
      path: "/manager",
      component: ManagerMain,
      redirect: "/manager/announce",
      children: [
        {
          path: "/manager/userinfo",
          component: () => import("@/views/ManagerView/ManagerInfoView.vue"),
        },
        {
          path: "/manager/announce",
          component: () => import("@/components/Announce.vue"),
        },
        {
          path: "/manager/course",
          component: () => import("@/views/ManagerView/ManagerCourseView.vue"),
        },
        {
          path: "/manager/department",
          component: () =>
            import("@/views/ManagerView/ManagerDepartmentView.vue"),
        },
        {
          path: "/manager/class",
          component: () => import("@/views/ManagerView/ManagerClassView.vue"),
        },
        {
          path: "/manager/userlist",
          component: () => import("@/views/StudentListView.vue"),
        },
      ],
    },
    {
      path: "/student",
      component: StudentMain,
      redirect: "/student/announce",
      children: [
        {
          path: "/student/userinfo",
          component: () => import("@/views/StudentView/StudentInfoView.vue"),
        },
        {
          path: "/student/announce",
          component: () => import("@/components/Announce.vue"),
        },
        {
          path: "/student/homework",
          component: () =>
            import("@/views/StudentView/StudentHomeworkView.vue"),
        },
        {
          path: "/student/homeworkunfinished",
          component: () =>
            import("@/views/StudentView/StudentHomeworkUnfinishedView.vue"),
        },
      ],
    },
    {
      path: "/teacher",
      component: TeacherMain,
      redirect: "/teacher/announce",
      children: [
        {
          path: "/teacher/userinfo",
          component: () => import("@/views/TeacherView/TeacherInfoView.vue"),
        },
        {
          path: "/teacher/announce",
          component: () => import("@/components/Announce.vue"),
        },
        {
          path: "/teacher/homework",
          component: () =>
            import("@/views/TeacherView/TeacherHomeworkView.vue"),
        },
        {
          path: "/teacher/studentlist",
          component: () => import("@/views/StudentListView.vue"),
        },
        {
          path: "/teacher/homeworkcontidion",
          component: () =>
            import("@/views/TeacherView/TeacherGradingHomeworkView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (
    token ||
    to.path === "/login" ||
    to.path === "/register" ||
    to.path === "/" ||
    to.path === "/backpassword"
  ) {
    if (to.path === "/login" && token) {
      next(`/${localStorage.getItem("usertype")}`);
    } else next();
  } else {
    next("/login");
  }
});
export default router;
