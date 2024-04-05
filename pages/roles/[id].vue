<script setup>
import { ref } from 'vue';
import { useStore } from '../../store/store';

const store = useStore();
const route = useRoute();

const updateItem = store.updateItem;
const token = store.token;

const pageUrl = 'roles/';
const model = ref({});

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', `Bearer ${token}`);

const response = await $fetch(`https://v2-stage.astra-company.com/api/v2/roles/${route.params.id}`);

model.value = { ...response.data };
</script>

<template>
  <v-sheet class="mx-auto" max-width="300">
    <v-form @submit.prevent="updateItem(model.name, pageUrl, route.params.id)">
      <v-text-field v-model="model.name" :rules="[]" label="User name"> </v-text-field>

      <v-btn class="mt-2" text="Update" type="submit" block></v-btn>
    </v-form>
    <NuxtLink to="/roles">
      <v-btn variant="tonal" class="mt-2" text="Back to roles page" type="submit"></v-btn>
    </NuxtLink>
  </v-sheet>
</template>
