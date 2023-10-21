import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import HomeView from "@/views/HomeView";
import FeedView from "@/views/FeedView";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView

    },

    {
        path: "/login",
        name: "login",
        component: LoginView
    },

    {
        path: "/register",
        name: "register",
        component: RegisterView
    },

    {
        path: "/feed",
        name: "feed",
        component: FeedView
    }
]

const router = new createRouter({
    routes,
    history: createWebHistory(),
    });

export default router;