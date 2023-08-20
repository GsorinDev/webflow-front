import {defineStore} from "pinia";

let apiUrl = 'http://localhost:3000'
if(process.env.VUE_APP_API) {
    apiUrl = 'https://api-webflow.georgio-sorin.fr'
}


const projectsStore = defineStore("projectsStore", {
    state : () => ({
        projects : [],
    }),
    actions : {
        async getAllProjects() {
            this.projects = []
            await fetch(`${apiUrl}/project`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(async (result) => {
                this.projects = await result.json()
            })
        },
        getProjetWhereIdTicket(project_id) {
            return this.projects.find((project) => project._id === project_id)
        }
    }
})

export {
    projectsStore
}