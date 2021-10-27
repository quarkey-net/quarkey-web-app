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
    passwordItems: [],
    tagSlots: [],
    targetViewTag: 'global'
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
      // axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
      await axios({
        method: 'GET',
        baseURL: 'https://quarkey.net/api/account/item/password',
        withCredentials: true,
        headers: {
          // 'Access-Control-Allow-Origin': 'http://localhost:8080',
          // 'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: this.token
        },
        params: {
          what: 'sd'
        }
      }).then((response) => {
        try {
          this.$patch({
            passwordItems: response.data.content.items,
            tagSlots: response.data.content.tag_slot
          })
        } catch (e) {
          this.$patch({
            passwordItems: [],
            tagSlots: []
          })
        }
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Failed to get password items')
      })
    },

    changeTargetItems (_targetTag) {
      console.log('old target : ' + this.targetViewTag + ', new target : ' + _targetTag)
      this.$patch({ targetViewTag: _targetTag })
    },

    async addPasswordItem (_name, _description, _login, _password, _url) {
      await axios({
        method: 'POST',
        baseURL: 'https://quarkey.net/api/account/item/password',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          name: _name,
          description: _description,
          login: _login,
          password: _password,
          url: _url
        }
      }).then((response) => {
        this.passwordItems.push(response.data.content)
      }).catch(() => {
        console.warn('Failed to password item')
      })
    }
  },

  getters: {
    getToken (state) {
      return state.token
    },

    getPasswordItems: (state) => {
      try {
        return state.passwordItems.filter((itm) => {
          return itm.filter((tag) => {
            return tag.name === state.targetViewTag
          })
        })
      } catch (e) {
        return state.passwordItems
      }
    },

    getAccountInfos (state) {
      return {
        id: state.id,
        username: state.username,
        email: state.email,
        roles: state.roles
      }
    },

    getTagSlots (state) {
      return state.tagSlots
    }
  }
})
