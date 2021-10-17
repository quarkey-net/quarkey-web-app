<template>
  <div>
    <HeaderWelcom @change-display-mode="updateState" />
    <div class="top-content" />
    <div class="bot-content">
      <form v-if="state === 'register'" class="register-form">
        <h1>Sign Up</h1>
        <p>Welcome among us! We just need a few details and your account will be ready in a minute!</p>
        <div class="separator" />
        <div class="in">
          <input v-model="form.register.username" type="text" placeholder="Username" :disabled="form.block">
        </div>
        <div class="in">
          <input v-model="form.register.email" type="email" placeholder="Email Address" :disabled="form.block">
        </div>
        <div class="in">
          <input v-model="form.register.password.value" :type="form.register.password.type" placeholder="Password" :disabled="form.block">
          <img src="~/assets/show-password-input.svg" @click="form.register.password.type === 'password' ? form.register.password.type = 'text' : form.register.password.type = 'password'">
        </div>
        <div class="in">
          <input v-model="form.register.confirmPassword.value" :type="form.register.confirmPassword.type" placeholder="Confirm Password" :disabled="form.block">
          <img src="~/assets/show-password-input.svg" @click="form.register.confirmPassword.type === 'password' ? form.register.confirmPassword.type = 'text' : form.register.confirmPassword.type = 'password'">
        </div>
        <div class="in">
          <input v-model="form.register.key" type="text" placeholder="Activation Key" :disabled="form.block">
        </div>
        <a href="#" :disabled="form.block" @click="fetchRegister">Continue</a>
      </form>

      <div v-else-if="state === 'send-verification'">
        <p>A verification link has been sent to you by email. Please verify your account before logging in</p>
      </div>

      <form v-if="state === 'login'">
        <h1>Sign In</h1>
        <p>Nice to see you again! Log in to access your credentials. No account? Register now and get one instantly!</p>
        <div class="separator" />

        <div class="in">
          <input v-model="form.login.email" type="email" placeholder="Email Address" :disabled="form.block" required>
        </div>
        <div class="in">
          <input v-model="form.login.password.value" :type="form.login.password.type" placeholder="Password" :disabled="form.block" required>
          <img src="~/assets/show-password-input.svg" @click="form.login.password.type === 'password' ? form.login.password.type = 'text' : form.login.password.type = 'password'">
        </div>
        <a href="#" :disabled="form.block" @click="fetchLogin">
          Continue
          <img src="~/assets/continue.svg">
        </a>
      </form>
      <div v-else-if="state === 'login-suspend'">
        l
      </div>
    </div>
  </div>
</template>

<script>
import { useAccountStore } from '@/store/account'

export default {
  inject: ['state'],

  data () {
    return {
      state: 'login',
      userStore: useAccountStore(),
      passwordType: 'password',
      form: {
        login: {
          email: 'powersosig@riseup.net',
          password: {
            type: 'password',
            value: 'Patate#38'
          }
        },
        register: {
          username: '',
          email: '',
          password: {
            type: 'password',
            value: ''
          },
          confirmPassword: {
            type: 'password',
            value: ''
          },
          key: '',
          block: false
        }
      }
    }
  },
  /*
  computed: {
    ...mapState(['state'])
  },
  */
  methods: {

    updateState (_state) {
      this.state = _state
    },

    async fetchRegister () {
      // eslint-disable-next-line no-console
      console.log('Register !')
      this.form.block = true
      await this.$axios.$post('/auth/register', {
        username: this.form.register.username,
        email: this.form.register.email,
        password: this.form.register.password.value,
        key: this.form.register.key
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('success register')
        this.$toast.show(response.description, {
          position: 'bottom-center',
          type: 'success',
          duration: 1000
        })
        this.form.login.email = this.form.register.email
        this.state = 'login'
        this.$toast.show('Please verify your account by clicking on the confirmation link that was sent to you by email', {
          position: 'bottom-center',
          type: 'info',
          duration: 3500
        })
      }).catch((err) => {
        this.$toast.show(err.response.data.description, {
          position: 'bottom-center',
          type: err.response.status === 1200 ? 'info' : 'error',
          duration: 1000
        })
      })
      this.form.block = false
    },

    async fetchLogin () {
      this.form.block = true
      try {
        await this.$axios.post('/auth/login', {
          email: this.form.login.email,
          password: this.form.login.password.value
        }).then((response) => {
          console.dir(response)
          this.userStore.login(
            response.data.content.username,
            response.data.content.email,
            response.data.content.roles,
            response.data.content.token
          )
          this.$toast.show(response.data.description, {
            position: 'bottom-center',
            type: 'success',
            duration: 1000
          })
          this.$router.push('/mainPanel')
        }).catch((err) => {
          console.dir(err)
          this.$toast.show(err.response.data.description, {
            position: 'bottom-center',
            type: err.response.status === 350 ? 'info' : 'error',
            duration: 2000
          })
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Failed to login, content : ' + error)
      }
      this.form.block = false
    }
  }
}
</script>

<style scoped>
  .top-content {
    margin: 0;
    width: 100%;
    height: 115px;
    background-color: #30A1DB;
  }

  .bot-content {
    position: absolute;
    top: 192px;
    right: 0;
    left: 0;
    bottom: 0px;
    text-align: center;

    background-color: #1D1D2A;
  }

  .separator {
    margin: 0 2rem 1.25rem 2rem;
    border: 1px solid #242734;
    background-color: grey;
    width: 100%;
  }

  form {
    display: flex;
    color: white;
    justify-content: flex-start;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin:  2rem auto;
    padding: 1rem;
    width: 15rem;
    background-color: white;
    background-color: #1D1D2A;
  }

  form p {
    color: #4D4E61;
    margin-bottom: 2rem;
    text-align: left;
    font-size: 13px;
    font-family: 'Montserrat', sans-serif;
  }

  .btn {
    display: flex;
    align-items: center;
    grid-gap: 8px;
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    line-height: 16px;
    text-decoration: none;
    transition: 0.3s;
  }
  /*
  form input {
    text-decoration: none;
    border: 1px solid #353648;
    width: 100%;
    height: 32px;
    padding-left: 0.75rem;
    border-radius: 8px;
    margin-bottom: 13px;
    background-color: transparent;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    font-size: 14px;
  }
  */
  form .in {
    position: relative;
    text-decoration: none;
    border: 1px solid #353648;
    width: 100%;
    height: 32px;
    padding-left: 12px;
    border-radius: 8px;
    margin-bottom: 13px;
    background-color: transparent;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    font-size: 14px;
  }

  form .in:hover {
    border: 1px solid white;
  }

  form .in input {
    position: absolute;
    top: 22%;
    left: 15px;
    right: 5px;
    color: white;
    background-color: transparent;
    font-size: 14px;
    outline: none;
    border: none;
    text-decoration: none;
  }

  form .in img {
    position: absolute;
    right: 20px;
    top: 11px;
  }

  form a {
    color: white;
    text-decoration: none;
    border-radius: 8px;
    height: 34px;
    margin-top: 5px;
    background-color: #30A1DB;
    width: 106%;
    line-height: 33px;
  }

  form a img {
    margin-left: 3px;
  }
</style>
