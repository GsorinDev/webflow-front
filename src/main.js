import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css';
import {createRouter, createWebHistory} from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faAnglesDown,
    faAnglesUp,
    faBars,
    faClose, faEquals,
    faGreaterThan,
    faLessThan,
    faMagnifyingGlass,
    faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import HomeComponent from '@/components/home/HomeComponent'
import DashboardComponent from '@/components/dashboard/DashboardComponent'
import TicketsComponent from '@/components/dashboard/tickets/TicketsComponent'
import GantComponent from '@/components/dashboard/gant/GantComponent'
import BacklogComponent from "@/components/dashboard/backlog/BacklogComponent.vue";
import {createPinia} from "pinia";
import AuthComponent from "@/components/auth/AuthComponent.vue";

library.add(faUserSecret, faBars, faMagnifyingGlass, faClose, faGreaterThan, faLessThan, faAnglesUp, faAnglesDown, faEquals)

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
                    }
                    
                },
                {
                    path: 'gant',
                    name: 'gant',
                    components: {
                        board : GantComponent
                    }
                },
                {
                    path: 'backlog',
                    name: 'backlog',
                    components: {
                        board : BacklogComponent
                    }
                },
            ]
        },
    ]
})

createApp(App)
    .use(router)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
