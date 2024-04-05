<script setup>
import { ref } from 'vue';
import { useStore } from '../../store/store';

const store = useStore();

const fetchDataRoles = store.fetchDataRoles;
const createItem = store.createItem;
const deleteItem = store.deleteItem;
const data = store.dataRoles;
const pageUrl = 'roles/';

fetchDataRoles(pageUrl);

const valid = ref(false);

const nameRules = [
  (value) => {
    if (value) return true;

    return 'Name is required.';
  },
  (value) => {
    if (value?.length <= 10) return true;

    return 'Name must be less than 10 characters.';
  },
];

const newRole = ref({
  name: '',
  display_name: '',
  description: '',
  permissions: [1, 2],
  team_id: 1,
  trans_title: {
    uk: 'test role uk',
    ru: 'test role ru',
    en: 'test role en',
  },
});

const routeTo = (id) => {
  navigateTo(`/${pageUrl}${id}`);
};
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Role</th>
        <th class="text-left">Id</th>
        <th class="text-left">Update</th>
        <th class="text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.id }}</td>
        <td @click="routeTo(item.id)"><v-btn> update </v-btn></td>
        <td><v-btn @click="deleteItem(item.id, pageUrl)" variant="outlined"> delete </v-btn></td>
      </tr>
    </tbody>
  </v-table>
  <v-form v-model="valid" @submit.prevent="createItem(newRole, pageUrl)">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newRole.description"
            :counter="10"
            :rules="nameRules"
            label="Description"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="newRole.display_name"
            :counter="10"
            :rules="nameRules"
            label="Display_name"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="newRole.name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row align="center" justify="center">
        <v-btn class="mt-2" text="Add new role" type="submit"></v-btn>
      </v-row>
    </v-container>
    <v-container>
      <v-row align="center" justify="center">
        <NuxtLink to="/">
          <v-btn variant="tonal" class="mt-2" text="Back to main page" type="submit"></v-btn>
        </NuxtLink>
      </v-row>
    </v-container>
  </v-form>
</template>
