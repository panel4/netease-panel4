import FooPage from "@/views/Foo/FooPage.vue";
import HomePage from "@/views/Home/HomePage.vue";
import LoginPage from "@/views/Login/LoginPage.vue";

export default [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/foo",
    component: FooPage,
  },
];
