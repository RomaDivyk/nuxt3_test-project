const url = `https://v2-stage.astra-company.com/api/v2/`;

const defaultValue = {
  user: {
    phone: '+380666753282',
    password: 'Code@321',
    remember: 'true',
  },
  token: '',
  dataRoles: [],
  dataPermissions: [],
  dataTeams: [],
};

export const useStore = defineStore('auth', {
  state: () => defaultValue,
  actions: {
    // вхід
    async login() {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('X-API-Key', '');

        const formdata = new FormData();
        formdata.append('phone', this.user.phone);
        formdata.append('password', this.user.password);
        formdata.append('remember:', this.user.remember);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        const response = await $fetch(`${url}login`, requestOptions);
        localStorage.setItem('token', `${response.data.token}`);
        this.token = localStorage.getItem('token');
        console.log(this.token);

        await navigateTo('/');
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },

    // вихід
    async logout() {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', `Bearer ${this.token}`);

        const formdata = new FormData();
        formdata.append('all_devices', 'true');

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        await $fetch(`${url}logout`, requestOptions);
        localStorage.removeItem('token');
        this.token = '';
        await navigateTo('/login');
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },

    //  завантаження ролей
    async fetchDataRoles(pageUrl) {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const response = await $fetch(`${url}${pageUrl}`);

        this.dataRoles = [...response.data];
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },

    //  завантаження дозволів
    async fetchDataPermissions(pageUrl) {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const response = await $fetch(`${url}${pageUrl}`);

        this.dataPermissions = [...response.data];
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },

    //  завантаження команд
    async fetchDataTeams(pageUrl) {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const response = await $fetch(`${url}${pageUrl}`);

        this.dataTeams = [...response.data];
      } catch (error) {}
    },

    //  створення нової ролі, дозволу чи команди
    async createItem(newData, pageUrl) {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const raw = JSON.stringify(newData);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        await $fetch(`${url}${pageUrl}`, requestOptions);
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },

    //  редагування нової ролі, дозволу чи команди
    async updateItem(updatedData, pageUrl, id) {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const raw = JSON.stringify({
          name: updatedData,
        });

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        alert(`New ${pageUrl.slice(0, -2)}: ${updatedData}`);

        await $fetch(`${url}${pageUrl}${id}`, requestOptions);
        await navigateTo(`/${pageUrl}`);
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },

    //  видалення нової ролі, дозволу чи команди
    async deleteItem(id, pageUrl) {
      try {
        const requestOptions = {
          method: 'DELETE',
        };

        await $fetch(`${url}${pageUrl}${id}`, requestOptions);
      } catch (error) {
        alert(`Something went wrong...
        ${error.message}
        `);
      }
    },
  },
});
