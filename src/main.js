import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css';
import {createRouter, createWebHistory} from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faAnglesDown,
    faAnglesUp,
    faBars, faCalendarDay,
    faClose, faCopy, faEquals, faEye, faFloppyDisk, faFolder,
    faGreaterThan,
    faLessThan,
    faMagnifyingGlass, faNewspaper, faPen, faUser,
    faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import HomeComponent from '@/components/home/HomeComponent'
import DashboardComponent from '@/components/dashboard/DashboardComponent'
import TicketsComponent from '@/components/dashboard/tickets/TicketsComponent'
import GantComponent from '@/components/dashboard/gant/GantComponent'
import BacklogComponent from "@/components/dashboard/backlog/BacklogComponent.vue";
import {createPinia} from "pinia";
import AuthComponent from "@/components/auth/AuthComponent.vue";
import {authStore} from "@/stores/authStore.ts";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

library.add(faUserSecret, faBars, faMagnifyingGlass, faClose, faGreaterThan, faLessThan, faAnglesUp, faAnglesDown, faEquals, faCopy, faNewspaper, faPen, faUser, faFolder, faFloppyDisk, faCalendarDay, faEye)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component :HomeComponent
        },
        {
            path: '/auth',
            name: 'auth',
            component: AuthComponent
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardComponent,
            redirect: {name: 'tickets'},
            children: [
                {
                    path: '',
                    name: 'tickets',
                    components: {
                        board : TicketsComponent
                    },
                    meta: { requiresConnected: true }
                },
                {
                    path: 'gantt',
                    name: 'gantt',
                    components: {
                        board : GantComponent
                    },
                    meta: { requiresConnected: true }
                },
                {
                    path: 'backlog',
                    name: 'backlog',
                    components: {
                        board : BacklogComponent
                    },
                    meta: { requiresConnected: true }
                },
            ]
        },
    ]
})

function isTokenExpired(token) {
    try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(tokenData.exp * 1000); // Convertir en millisecondes
        const currentDate = new Date();

        return currentDate > expirationDate;
    } catch (error) {
        console.error('Erreur lors de la vérification de la date d\'expiration du token:', error);
        return true; // En cas d'erreur, considérons le token comme expiré par sécurité.
    }
}

if (isTokenExpired(localStorage.getItem("token"))) {
    localStorage.removeItem("token")
}

router.beforeEach((to, from, next) => {
    const isAuthenticated = authStore().token
    const requiresConnected = to.matched.some(record => record.meta.requiresConnected)

    if (isAuthenticated !== '') {
        next()
    } else if (requiresConnected) {
        next('/auth')
    } else {
        next()
    }
})

createApp(App)
    .use(router)
    .use(createPinia())
    .component('QuillEditor',QuillEditor)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
