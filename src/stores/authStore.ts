import {defineStore} from "pinia";
import _ from "lodash";

let apiUrl = 'http://localhost:3000'
if(process.env.VUE_APP_API) {
    apiUrl = 'https://api-webflow.georgio-sorin.fr'
}

const authStore = defineStore("authStore", {
    state : () => ({
        error : "",
        success : "",
        token: localStorage.getItem("token") ? localStorage.getItem("token") : ""
    }),
    actions : {
        async login(user) {
            if(user.email === "" || user.password === "") {
                this.error = "Please fill out all required fields"
            } else {
                await fetch(`${apiUrl}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(user)
                }).then(async (result) => {
                    const token = await result.json()
                    if (result.ok) {
                        localStorage.setItem('token', _.get(token, "access_token"))
                    } else {
                        this.error = token.message
                    }
                })
            }
        },
        async register(user) {
            if(user.email === "" || user.password === "" || user.confirmPassword === "") {
                this.error = "Please fill out all required fields"
            } else if (user.password !== user.confirmPassword) {
                this.error = "Password need to be same"
            } else {
                await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(user)
                }).then(async (result) => {
                    const register = await result.json()
                    if (result.ok) {
                        this.success = "User created"
                    } else {
                        this.error = register.message
                    }
                })
            }
        }
    }
})

export {
    authStore
}