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
    isPasswordUnlock: false,
    unlockingPasswordTimeout: 120,
    tagSlots: [],
    targetViewTag: 'global',
    step: 'none',
    cryptoPin: ''
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

    async fetchAccountInfos () {
      await axios({
        method: 'GET',
        baseURL: 'http://localhost/api/account/info'
      }).then((response) => {
        try {
          this.$patch({
            uid: response.data.content.uid,
            username: response.data.content.username,
            email: response.data.content.email,
            step: response.data.content.step,
            roles: response.data.content.roles
          })
        } catch (e) {
          // this.$nuxt.$router.push('/authentication')
        }
      }).catch(() => {
        // eslint-disable-next-line no-console
        // sthis.$nuxt.redirect('/authentication')
        console.log('Failed to get password items')
      })
    },

    async fetchPasswordItems () {
      // axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
      await axios({
        method: 'GET',
        baseURL: 'http://localhost/api/account/item/password',
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
            tagSlots: response.data.content.tag_slot,
            username: response.data.content.username
          })
        } catch (e) {
          // this.$nuxt.$router.push('/authentication')
          this.$patch({
            passwordItems: [],
            tagSlots: []
          })
        }
      }).catch(() => {
        // eslint-disable-next-line no-console
        // sthis.$nuxt.redirect('/authentication')
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
        baseURL: 'http://localhost/api/account/item/password',
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
    },

    async fetchAccountActivation () {
      await axios({
        method: 'GET',
        baseURL: 'http://localhost/api/account/activate',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          qs: 'kkf'
        }
      }).then((response) => {
        this.step = response.data.content.user_step
      }).catch(() => {
        console.log('Failed to activate account')
      })
    },

    applyCryptoTimeout () {
      let timeout // On vas stocker le timeout ici
      // Fonction pour démarer le timeout
      const start = () => {
        timeout = setTimeout(() => {
          console.log('popup')
          this.setSystemNotification('LOGIN_CRYPTO_PIN')
          start() // On redemarre le timeout
        }, this.unlockingPasswordTimeout * 1000)
      }
      // Fonction pour reset le timeout
      const reset = () => {
        clearTimeout(timeout)
        start()
      }
      start() // Initialization

      // Si la sourie bouge, on reset le timeout
      window.addEventListener('mousemove', () => {
        reset()
      })
    },

    setSystemNotification (type) {
      // Use this function to set high level notification
      if (type === 'OVERLAY_ONLY') {
        // Show only overlay and block web page pending other notification
        this.passwordItems = []
        this.tagSlots = []
        this.step = null
      } else if (type === 'REGISTER_CRYPTO_PIN') {
        // store init to register first crypto pin
        this.passwordItems = []
        this.tagSlots = []
        this.step = 'SETUP_CRYPTO_PIN'
        this.isPasswordUnlock = false
        this.cryptoPin = ''
      } else if (type === 'LOGIN_CRYPTO_PIN') {
        // store init to login crypto pin
        this.passwordItems = []
        this.tagSlots = []
        this.step = 'ACTIVATED'
        this.isPasswordUnlock = false
        this.cryptoPin = ''
      }
    },

    setActionNotification (type) {
      // Use this function to set low level popup actions
      if (type === 'ADD_PASSWORD_ITEM') {
        this.actionNotification = type
      }
    },

    setCryptoPin (cryptoPin) {
      this.cryptoPin = cryptoPin
    },

    setStep (step) {
      this.step = step
    },

    setIsPasswordUnlock (a) {
      this.isPasswordUnlock = a
    }
  },

  getters: {
    getToken (state) {
      return state.token
    },

    getPasswordItems: (state) => {
      return state.passwordItems
    },

    getAccountInfos (state) {
      return {
        id: state.id,
        username: state.username,
        email: state.email,
        roles: state.roles
      }
    },

    getCryptoPin (state) {
      return state.cryptoPin
    },

    getTagSlots (state) {
      return state.tagSlots
    },

    getSystemNotificationType (state) {
      return state.systemNotificationType
    },

    getSystemNotificationOverlay (state) {
      return state.systemNotificationOverlay
    },

    getSystemNotificationState (state) {
      if (state.isPasswordUnlock && state.step === 'ACTIVATED') {
        return 'NO_NOTIFICATION'
      } else if (state.step === null || state.step === 'none') {
        return 'OVERLAY_ONLY'
      } else if (state.step === 'SETUP_CRYPTO_PIN') {
        return 'REGISTER_CRYPTO_PIN'
      } else if (!state.isPasswordUnlock && state.step === 'ACTIVATED') {
        return 'LOGIN_CRYPTO_PIN'
      }
    }
  }
})
