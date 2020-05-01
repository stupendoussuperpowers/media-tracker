<template>
    <div class="app">
        Login to Media Tracker
        <form @submit="onSubmit">
            <div class="username">
                <input type="text" class="text-input" v-model="username" />
            </div>
            <div class="password">
                <input type="password" class="text-input" v-model="password" />
            </div>
            <div class="submit">
                <button type="submit" @click.stop.prevent="onSubmit()"> Log In </button>
            </div>
        </form>
        <div class="error">{{ this.username }} {{ this.password }}</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            password: '',
            message: ''
        }
    }, 
    methods: {
        onSubmit(){
            fetch(`/api/auth/login`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            })
            .then(resp => {
                console.log(resp);
                return resp.json()
            })
            .then(data => {
                console.log(data)
                this.$router.push({name:"App"})
            })
        }
    }
}
</script>

<style scoped>

</style>