<template>
  <div class="navbar-welcom">
    <div class="content">
      <div id="breadcrumbs">
        <img src="~/assets/logo.svg" height="20px">
      </div>
      <div id="top-bar-actions">
        <a href="#" :class="state === 'login' ? 'btn btn-active' : 'btn'" @click="updateDisplay('login')">
          Login
          <img src="~/assets/login-logo.svg">
        </a>

        <a href="#" :class="state === 'register' ? 'btn btn-active' : 'btn'" @click="updateDisplay('register')">
          Create an account
          <img src="~/assets/register-logo.png">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
export default {
  emits: ['change-display-mode'],
  setup (props, { emit }) {
    const state = ref('login')

    const setRegisterEvent = () => {
      emit('setRegisterEvent', 'register')
    }

    const setLoginEvent = () => {
      emit('setLoginEvent', 'login')
    }

    const updateDisplay = (_state) => {
      state.value = _state
      emit('change-display-mode', _state)
    }

    return {
      state,
      setRegisterEvent,
      setLoginEvent,
      updateDisplay
    }
  }
}
</script>

<style scoped>
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

    background-color: white;
    color: #30A1DB;
    border: 1px solid #30A1DB;
  }

  .btn-active {
    background-color: #30A1DB;
    color: white;
    border: 1px solid #88cdf0;
  }

  .navbar-welcom {
    position: static;
    background-color: #30A1DB;
    color: white;
    margin: 0;
    width: 100%;
    height: 77px;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    position: absolute;
    display: flex;
    left: 32px;
    right: 32px;
    top: 21px;
    /*bottom: 22px;*/
    align-items: center;
  }

  .navbar-welcom .content div {
    flex: 1 1 auto;
  }

  #breadcrumbs {
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }

  #top-bar-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 16px;
  }
</style>
