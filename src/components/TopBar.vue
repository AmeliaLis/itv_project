<template>
    <div>
        <a><router-link :to="{name: 'login'}">Login</router-link></a>
    </div>
    <div>
        <a><router-link :to="{name: 'register'}">Register</router-link></a>
    </div>
    <div><button @click="handleSignOut">Sign Out</button></div>
</template>


<script>
    export default {
        name: "TopBar"
}
</script>
