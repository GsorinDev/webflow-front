import {defineStore} from "pinia";

const apiUrl = 'http://localhost:3000'

const ticketsStore = defineStore("ticketsStore", {
    state : () => ({
        tickets : [],
    }),
    actions : {
        async getAllTickets() {
            await fetch(`${apiUrl}/ticket`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(async (result) => this.tickets = await result.json())
        },
    }
})

export {
    ticketsStore
}