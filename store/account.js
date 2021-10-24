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
        this.$patch({
          passwordItems: response.data.content.items,
          tagSlots: response.data.content.tag_slot
        })
      }).catch(() => {
        // eslint-disable-next-line no-console
        console.log('Failed to get password items')
      })
    },

    changeTargetItems (_targetTag) {
      console.log('old target : ' + this.targetViewTag + ', new target : ' + _targetTag)
      this.$patch({ targetViewTag: _targetTag })
    }
  },

  getters: {
    getToken (state) {
      return state.token
    },

    getPasswordItems (state) {
      console.log('getPasswordItems()')
      console.dir(state.passwordItems)
      return state.passwordItems.filter(function (e) {
        for (let i = 0; i < e.tags.length; i++) {
          if (e.tags[i] === state.targetViewTag) {
            console.dir(e)
            return true
          }
        }
        return false
      })
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
