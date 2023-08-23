<script setup>

import {defineEmits, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ticketsStore} from "@/stores/ticketStore.ts";
import {projectsStore} from "@/stores/projectStore.ts";
import TitleComponent from "@/components/updateTicketModal/titleComponent.vue";
import PriorityComponent from "@/components/updateTicketModal/priorityComponent.vue";

const emit = defineEmits(['closeModalTicket'])
const closeModal = () => emit('closeModalTicket');
const storeTickets = ticketsStore()
const storeProjects = projectsStore()
const format = (date) => {

// Créez un objet Date en utilisant la date ISO
  const dateObj = new Date(date);

// Obtenez les composants de date (jour, mois, année)
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1; // Les mois en JavaScript sont indexés à partir de 0
  const year = dateObj.getUTCFullYear();

// Formatez la date au format "DD-MM-YYYY"
  const formattedDate = `${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  return formattedDate
}

const iconClass = () => {

  let icon = ''

  switch (storeTickets.ticket.priority) {
    case 'low':
      icon = 'fa-angles-down'
      break;
    case 'medium':
      icon = 'fa-equals'
      break;
    case 'high':
      icon = 'fa-angles-up'
      break;
  }

  return ['fa-solid', icon]
}

const barColor = (event) => {

  let color = ''

  switch (event.type) {
    case "backlog" :
      color = 'border-pink-600'
      break;
    case "being":
      color = 'border-orange-400'
      break;
    case "blocked":
      color = 'border-red-400'
      break;
    case "finish":
      color = 'border-green-400'
      break;
    case "production":
      color = 'border-sky-400'
      break;
  }

  return color
}

const project = ref(storeProjects.getProjetWhereIdTicket(storeTickets.ticket.project_id))

const titleModification = ref(false)
const descriptionModification = ref(false)
const priorityModification = ref(false)
const options = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'align': [] }],
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],

  ['clean']
]

const description = ref("")
const descriptionUpdate = (content) => {
  description.value = content
  console.log(description.value)
}

const updateTicketDescription = () => {
  const ticket = {title: storeTickets.ticket.title, description: description.value, priority: storeTickets.ticket.priority}
  if (ticket.description !== "") {
    storeTickets.updateTicket(ticket, storeTickets.ticket._id)
    descriptionModification.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="flex flex-col bg-[#201c2c] w-[80%] h-[80%] rounded-lg shadow-lg text-white overflow-hidden" >
        <div class="flex">
          <div class="flex items-center mt-4 h-10" v-if="!titleModification">
            <span class="text-3xl ml-8 font-bold">{{storeTickets.ticket.id}} / {{storeTickets.ticket.title}}</span>
            <div class="w-10 h-10 ml-4 rounded bg-sky-500 flex justify-center items-center" @click="titleModification = true"><font-awesome-icon icon="fa-solid fa-pen"></font-awesome-icon></div>
          </div>

          <div class="flex items-center mt-4 h-10 w-full" v-if="titleModification">
            <title-component :ticket="storeTickets.ticket" @titleModification="titleModification = false"></title-component>
          </div>

          <div class="flex w-8 h-8 ml-auto items-center justify-center bg-[#28293d] rounded cursor-pointer">
            <font-awesome-icon @click="closeModal" class=" text-white" icon="fa-solid fa-close"></font-awesome-icon>
          </div>
        </div>

        <div class="flex h-[80%] mt-4">
          <div class="flex flex-col w-[65%] h-auto overflow-y-auto">

            <div  class="ml-8 mt-4 h-auto mx-8">
              <div class="flex items-center">
                <span class="font-bold">Description</span>
                <div v-if="!descriptionModification" class="w-7 h-7 ml-2 rounded bg-sky-500 flex justify-center items-center" @click="descriptionModification = true"><font-awesome-icon icon="fa-solid fa-pen"></font-awesome-icon></div>
                <div v-if="descriptionModification" class="w-7 h-7 ml-2 rounded bg-sky-500 flex justify-center items-center" @click="updateTicketDescription()"><font-awesome-icon icon="fa-solid fa-save"></font-awesome-icon></div>
                <div v-if="descriptionModification" class="w-7 h-7 ml-2 rounded bg-red-500 flex justify-center items-center" @click="descriptionModification = false"><font-awesome-icon icon="fa-solid fa-close"></font-awesome-icon></div>

              </div>

              <div v-if="!descriptionModification" class="h-auto border-2 border-[#28293d] description px-4 py-4 mt-2" v-html="storeTickets.ticket.description"></div>
            </div>
            <div v-if="descriptionModification" class="ml-8 mt-4 mb-16 mx-8">
              <QuillEditor :toolbar="options" :content="storeTickets.ticket.description" contentType="html" @update:content="descriptionUpdate"/>
            </div>
            <div class="ml-8 mt-4 h-auto">
              <span class="font-bold">Historiques</span>
              <div class="h-auto border-2 border-[#28293d] description mt-2 mr-8">
                <div class="bg-[#201c2c] h-10 mb-2 rounded text-white flex items-center grid grid-cols-4" v-for="history in storeTickets.ticket.events" :key="history">
                    <div class="col-start-1 col-end-2 mx-auto flex w-full ml-4">
                      <div class="h-6 border mr-4 my-auto" :class="barColor(history)"></div>
                      <span class="mr-8">{{history.type}}</span>
                    </div>
                    <span class="col-start-2">{{format(history.date)}}</span>
                  </div>
              </div>
            </div>
          </div>
          <div class="w-[35%] flex flex-col items-center h-auto overflow-y-auto">
            <div class="border-2 border-[#28293d] w-[90%] h-aut flex flex-col">
              <div class="flex flex-col my-4">
                <h2 class="font-bold mx-auto mb-2">Informations</h2>
                <div class="flex flex-col ml-4">
                  <div class="flex items-center mb-4">
                    <span class="bg-sky-500 rounded-3xl flex items-center justify-center w-8 h-8 mr-2">
                      <font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon>
                    </span>
                    <span>{{storeTickets.ticket.creator.email}}</span>
                  </div>

                  <div class="flex justify-between mr-4 mb-4">
                    <div class="flex items-center justify-center">
                    <span class="bg-sky-500 rounded flex items-center justify-center w-8 h-8 mr-2">
                      <font-awesome-icon icon="fa-solid fa-newspaper"></font-awesome-icon>
                    </span>
                      <span>{{format(storeTickets.ticket.created_at)}}</span>
                    </div>
                    <div class="flex items-center justify-center">
                    <span class="bg-sky-500 rounded flex items-center justify-center w-8 h-8 mr-2">
                      <font-awesome-icon icon="fa-solid fa-calendar-day"></font-awesome-icon>
                    </span>
                      <span>{{format(storeTickets.ticket.updated_at)}}</span>
                    </div>
                  </div>

                  <div class="flex items-center mb-4">
                    <span class="bg-sky-500 rounded flex items-center justify-center w-auto h-8 px-2">
                      <font-awesome-icon icon="fa-solid fa-folder" class="mr-2"></font-awesome-icon>
                      <span>{{project.title}}</span>
                    </span>
                  </div>

                  <div class="flex items-center h-8 mb-4" v-if="!priorityModification">
                    <span class=" rounded bg-sky-500 flex items-center justify-center w-8 h-8 mr-2">
                      <font-awesome-icon :icon="iconClass()"></font-awesome-icon>
                    </span>
                    <span>{{storeTickets.ticket.priority}}</span>
                    <div class="w-8 h-8 ml-2 rounded bg-sky-500 flex justify-center items-center" @click="priorityModification = true"><font-awesome-icon icon="fa-solid fa-pen"></font-awesome-icon></div>
                  </div>
                  <div class="flex items-center mb-4" v-if="priorityModification">
                    <priority-component :ticket="storeTickets.ticket" @priorityModification="priorityModification = false"></priority-component>
                  </div>
                </div>
              </div>
            </div>
            <div class="border-2 border-[#28293d] w-[90%] h-aut flex flex-col">
              <div class="flex flex-col my-4">
                <h2 class="font-bold mx-auto mb-2">Github</h2>
                <div class="flex flex-col mx-4">
                  <label for="github_branch">Créer branche :</label>
                  <div class="relative mt-2">
                    <input type="text" class="border border-transparent text-sm text-white w-full px-2 py-2 w-[90%] rounded-lg bg-[#28293d]" disabled :value="`git checkout -b '${storeTickets.ticket.id}/${storeTickets.ticket.title.trim().replaceAll(' ','_')}'`">
                    <font-awesome-icon class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" icon="fa-solid fa-copy"></font-awesome-icon>
                  </div>
                  <span class="mt-2" for="">Url : <a class="text-sky-600 hover:text-sky-500 hover:underline" :href="project.github_url">{{project.github_url}}</a></span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.description {
  font-size: 16px;
  line-height: 1.2;
}

/* Styles pour les titres */
.description h1 {
  font-size: 28px; /* Taille pour h1 */
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.description h2 {
  font-size: 24px; /* Taille pour h2 */
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.description h3 {
  font-size: 20px; /* Taille pour h3 */
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.description h4 {
  font-size: 18px; /* Taille pour h4 */
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.description h5 {
  font-size: 16px; /* Taille pour h5 */
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.description h6 {
  font-size: 14px; /* Taille pour h6 */
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.description p,
.description span,
.description a {
  margin-top: 4px;
  margin-bottom: 4px;
}

/* Styles pour les listes à puces et les éléments de liste */
.description ul,
.description ol {
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 40px;
}

.description li {
  margin-top: 4px;
  margin-bottom: 4px;
  list-style-type: circle;
  padding-left: 4px;
}

/* Styles pour les tableaux */
.description table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 4px;
  margin-bottom: 4px;
}

.description th,
.description td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

/* Styles pour les éléments en italique et en gras */
.description em {
  font-style: italic;
}

.description strong {
  font-weight: bold;
}

/* Styles pour les images */
.description img {
  max-width: 100%;
  height: auto;
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>