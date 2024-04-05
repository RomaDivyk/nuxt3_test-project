<script setup>
import { useStore } from '../store/store';
import { computed, onMounted } from 'vue';
import { useDisplay } from 'vuetify';

const { name } = useDisplay();
const store = useStore();
const fetchDataRoles = store.fetchDataRoles;
const fetchDataPermissions = store.fetchDataPermissions;
const fetchDataTeams = store.fetchDataTeams;

onMounted(() => {
  fetchDataRoles('roles'), fetchDataPermissions('permissions'), fetchDataTeams('teams');
});

const height = computed(() => {
  switch (name.value) {
    case 'xs':
      return 220;
    case 'sm':
      return 400;
    case 'md':
      return 500;
    case 'lg':
      return 600;
    case 'xl':
      return 800;
    case 'xxl':
      return 1200;
  }

  return undefined;
});
</script>

<template>
  <v-card class="mx-auto pa-2" max-width="300">
    <v-list>
      <v-list-subheader>MAIN PAGE</v-list-subheader>

      <NuxtLink to="/roles"
        ><v-list-item prepend-icon="mdi-account" title="Roles" value="roles"> </v-list-item>
      </NuxtLink>
      <NuxtLink to="/permissions"
        ><v-list-item prepend-icon="mdi-information" title="Permissions" value="permissions"> </v-list-item>
      </NuxtLink>
      <NuxtLink to="/teams"
        ><v-list-item prepend-icon="mdi-check-circle" title="Teams" value="teams"> </v-list-item>
      </NuxtLink>
    </v-list>
    <v-container>
      <v-row align="center" justify="center"><v-btn @click="store.logout" variant="outlined"> Logout </v-btn></v-row>
    </v-container>
  </v-card>
</template>
