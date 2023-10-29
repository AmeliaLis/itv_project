<template>
    
</template>


<script>
export default {
    name: "FavMovieComponent",
    props: {
        movieData: {
            typeof: Object,
            required: true
        }
    },

    data() {
        return {
            movie: this.movieData.data().data
        }
    }
}
</script>