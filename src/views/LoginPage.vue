<template>
    <div class="row g-0" style="min-height: 100vh;">
        <div class="pt-2 col-md-6 d-flex flex-column justify-content-center align-items-center"
            style="background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
            <div class=" rounded-circle d-flex justify-content-center"
                style="height: 150px; width: 150px; background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
                <img :src="`${publicPath}${logo}`" style="width: 100%; object-fit: contain;">
            </div>
            <div class="d-flex justify-content-center">
                <p class="mt-2 m-0 fw-bold icon">Fabricator</p>
            </div>
        </div>
        <div class="container d-flex flex-column align-items-center justify-content-center col-md-6 bg-light pt-2">
            <p class="fs-5">Login Your Account </p>

            <div class="w-100 p-2 form-floating container">
                <input type="email" class="form-control" id="floatingInput" placeholder="Email" v-model="Email">
                <label for="floatingInput" class="text-muted">Enter your Email</label>
            </div>

            <div class="w-100 p-2 form-floating container">
                <input type="password" class="form-control" id="floatingInput" placeholder="Password" v-model="Password">
                <label for="floatingInput" class="text-muted">Password</label>
            </div>

            <div class="d-flex justify-content-center align-items-center w-100 px-2 mt-2">
                <button class="btn text-white py-2 fs-5 w-100"
                    style="padding: 10px 12px !important;background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">Submit</button>
            </div>

            <RouterLink to="/forgot-password-page" style="text-decoration: none;">
                <div class="text-end mt-1">
                    Forgot your password?
                </div>
            </RouterLink>
            <div class="text-center container my-3">
                <p>By proceeding, you agree to <RouterLink to="/">Terms & Conditions</RouterLink> & <RouterLink to="/">
                        Privacy policy</RouterLink>
                </p>
            </div>
            <div class="d-flex justify-content-center p-2">
                <router-link to="/registration-page" class="w-100 rounded"
                    style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
                    <button class="btn w-100 fs-5 text-white"
                        style="background: linear-gradient(113deg, #1FAB89  31%,  #28CC9E 97%);padding: 14px 12px ;">
                        Click here for Register
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logo: "img/fablogo.png",
            publicPath: process.env.BASE_URL,
            Email: "",
            Password: "",
        };
    },
}
</script>

<style scoped>
.icon {
    /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    color: white;
    /* background: -webkit-linear-gradient(113deg, #28CC9E 31%, #1FAB89 97%); */
    padding: 14px 12px;
    /* -webkit-text-fill-color: transparent; */
    background-clip: text;
}
</style>