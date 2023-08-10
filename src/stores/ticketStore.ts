import {defineStore} from "pinia";
import _ from 'lodash'

const apiUrl = 'http://localhost:3000'

const ticketsStore = defineStore("ticketsStore", {
    state : () => ({
        tickets : [{name: 'being', list: []},{name: 'blocked', list: []},{name: 'finish', list: []},{name: 'production', list: []}],
        backlog : []
    }),
    actions : {
        async getAllTickets() {

            this.tickets = [{name: 'being', list: []},{name: 'blocked', list: []},{name: 'finish', list: []},{name: 'production', list: []}]
            this.backlog = []
            await fetch(`${apiUrl}/ticket`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(async (result) => {
                const tickets = await result.json()

                tickets.filter(ticket => {
                    switch (_.last(ticket.events)?.type) {
                        case "being":
                            this.tickets[0].list.push(ticket)
                            break;
                        case "blocked":
                            this.tickets[1].list.push(ticket)
                            break;
                        case "finish":
                            this.tickets[2].list.push(ticket)
                            break;        
                        case "production":
                            this.tickets[3].list.push(ticket)
                            break;
                        default:
                            this.backlog.push(ticket)
                            break;
                    }
                })
            })
        },
        async updateEtatTicket(listName, ticket) {
            await fetch(`${apiUrl}/ticket/event/${ticket._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({type : listName})
            }).then(result => {
                if(result.ok) {
                    const arrayOfExistingTicket = this.tickets.find(list => list.name === _.last(ticket.events)?.type).list

                    const index = arrayOfExistingTicket.map(x => x._id).indexOf(ticket._id);
                    arrayOfExistingTicket.splice(index, 1)

                    this.tickets.find(list => list.name === listName).list.push(ticket)
                    ticket.events.push({type : listName, date: new Date()})
                }
            })
        }
    }
})

export {
    ticketsStore
}