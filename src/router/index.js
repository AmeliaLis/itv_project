import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged} from "firebase/auth"

import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import HomeView from "@/views/HomeView";
import FeedView from "@/views/FeedView";
import MovieView from "@/views/MovieView";


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
        component: FeedView,
        meta: {
            requiresAuth: true,
        }
    },

    {
        path: "/movie/:id",
        name: "movie",
        component: MovieView,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new createRouter({
    routes,
    history: createWebHistory(),
    });

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            alert("you dont have access");
            next("/");
        }
    } else {
        next();
    }
})

export default router;