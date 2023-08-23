<script setup>

import {defineEmits, ref} from "vue";
import {ticketsStore} from "@/stores/ticketStore.ts";
import {projectsStore} from "@/stores/projectStore.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


const emit = defineEmits(['closeModalCreateTicket'])
const closeModal = () => emit('closeModalCreateTicket');


const storeTickets = ticketsStore()
const storeProjects = projectsStore()

const ticket = ref({title: "", description: "", priority: storeTickets.priority[0], project_id: storeProjects.projects[0]._id})

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
const descriptionUpdate = (content) => {
  ticket.value.description = content
}

const createTicket = () => {
  if (ticket.value.project_id.trim() !== "" && ticket.value.description.trim() !== "" && ticket.value.priority.trim() !== "" && ticket.value.title.trim() !== "") {
    storeTickets.createTicket(ticket.value).then(() => closeModal())
  }
}

</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="flex flex-col bg-[#201c2c] w-[80%] h-[80%] rounded-lg shadow-lg text-white overflow-y-auto">
        <div class="flex">
          <h1 class="text-3xl mt-2 font-bold ml-auto">Create Ticket</h1>
          <div class="flex w-8 h-8 ml-auto items-center justify-center bg-[#28293d] rounded cursor-pointer">
            <font-awesome-icon @click="closeModal" class=" text-white" icon="fa-solid fa-close"></font-awesome-icon>
          </div>
        </div>

        <label class="mx-8 mt-4 mb-2" for="">Title :</label>
        <input class="border border-transparent text-white px-2 py-1 w-auto rounded-lg bg-[#28293d] text-3xl mx-8 font-bold" type="text" v-model="ticket.title">
        <div class="flex mx-8 mt-4">
          <label for="">Priority : </label>
          <select name="choosePriority" class="border border-transparent text-sm text-white px-2 py-1 w-24 mx-8 rounded-lg bg-[#28293d] outline-0" v-model="ticket.priority">
            <option v-for="priorityItem in storeTickets.priority" :key="priorityItem" :value="priorityItem">{{priorityItem}}</option>
          </select>

          <label for="">Project : </label>
          <select name="chooseProject" class="border border-transparent text-sm text-white px-2 py-1 w-40 mx-8 rounded-lg bg-[#28293d] outline-0" v-model="ticket.project_id">
            <option v-for="project in storeProjects.projects" :key="project" :value="project._id">{{project.title}}</option>
          </select>
        </div>
        <label class="mx-8 mt-4 mb-2" for="">Description :</label>
        <div class="mx-8 h-auto mb-12">
          <QuillEditor :toolbar="options" contentType="html" @update:content="descriptionUpdate"/>
        </div>
        <button class="mr-auto ml-8 bg-sky-600 rounded px-2 py-1" @click="createTicket()">Save</button>
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