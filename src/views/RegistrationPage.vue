<template>
    <div class="row g-0" style="min-height:100vh;">
        <div class="pt-2 col-md-6 d-flex flex-column justify-content-center align-items-center"
            style=" background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
            <div class="d-flex justify-content-center">
                <div class="rounded-circle d-flex justify-content-center"
                    style="height: 150px; width: 150px; background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
                    <img :src="`${publicPath}${logo}`" style="width: 100%; object-fit: contain;">
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <p class="mt-2 m-0 fw-bold icon">Fabricator</p>
            </div>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center pt-2">
            <p class="text-cetner fs-5">Register Your Account </p>
            <form @submit.prevent="registerUser()">
                <div class="container">
                    <div class="w-100 p-2 form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="Email" v-model="name">
                        <label for="floatingInput" class="text-muted">Enter your Name</label>
                    </div>
                    <div class="w-100 p-2 form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="Email" v-model="email">
                        <label for="floatingInput" class="text-muted">Enter your Email</label>
                    </div>
                    <div class="w-100 p-2 form-floating">
                        <input type="password" class="form-control" id="floatingInput" placeholder="Email"
                            v-model="password">
                        <label for="floatingInput" class="text-muted">Password</label>
                    </div>
                    <div class="w-100 p-2 form-floating">
                        <input type="password" class="form-control" id="floatingInput" placeholder="Email"
                            v-model="confirmPassword">
                        <label for="floatingInput" class="text-muted">Confirm Password</label>
                    </div>
                    <div class="p-2">
                        <!-- <router-link to="/email-verification-page"> -->
                            <button class="btn text-white w-100 fs-5" type="submit"
                                style="padding: 10px 12px;background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">Submit</button>
                        <!-- </router-link> -->
                    </div>
                </div>
            </form>
            <div class="text-center mt-2">
                <span>By creating an account or logging in, you agree to DeshiGirl <span style="cursor: pointer;"
                        class="text-primary">Terms & Conditions</span> and <span style="cursor: pointer;"
                        class="text-primary">Privacy
                        policy</span> </span>
            </div>

            <div class="d-flex justify-content-center mt-4 p-2">
                <router-link to="/login" class="w-100 rounded"
                    style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
                    <button class="btn text-white w-100 fs-5"
                        style="background: linear-gradient(113deg, #1FAB89  31%,  #28CC9E 97%);padding: 13px 12px !important;">
                        Click here for Login
                    </button>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            logo: "img/fablogo.png",
            publicPath: process.env.BASE_URL,
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        registerUser() {
            axios.post('https://pwa.clobug.co.in/api/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirmPassword
            }).then((response) => {
                console.log('data sent', response)
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('login succesful token stored', token)
            }).catch((error) => {
                console.log('error', error)
            })
        }
    }

}
</script>
<style scoped>
.icon {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2rem;
    /* background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%); */
    color: white;
    background-clip: text;
    /* -webkit-text-fill-color: transparent */
}
</style>