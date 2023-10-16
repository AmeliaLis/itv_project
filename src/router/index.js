import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/views/HelloWorld.vue"
const routes = [
    {
        path: "/hello",
        name: "hello",
        component: HelloWorld
    }
]