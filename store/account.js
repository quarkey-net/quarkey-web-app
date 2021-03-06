import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    id: null,
    username: null,
    email: null,
    roles: [],
    token: null,
    passwordItems: []
  }),

  actions: {
    logout () {
      this.$patch({
        id: null,
        username: null,
        email: null,
        roles: [],
        token: null
      })
    },

    login (_username, _email, _roles, _token) {
      this.$patch({
        username: _username,
        email: _email,
        roles: _roles,
        token: _token
      })
      localStorage.setItem('accountToken', _token)
    },

    async fetchPasswordItems () {
      axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
      await axios({
        method: 'GET',
        baseURL: 'http://localhost:8080/api/account/item/password',
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: this.token
        },
        params: {
          what: 'sd'
        }
      }).then((response) => {
        this.$patch({ passwordItems: response.data.content.items })
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Failed to get password items')
      })
    }
  },

  getters: {
    getToken (state) {
      return state.token
    },

    getPasswordItems (state) {
      return state.passwordItems
    },

    getAccountInfos (state) {
      return {
        id: state.id,
        username: state.username,
        email: state.email,
        roles: state.roles
      }
    }
  }
})
