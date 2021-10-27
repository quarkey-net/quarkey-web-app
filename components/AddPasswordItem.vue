<template>
  <div id="add-password-item" class="overlay">
    <div class="popup">
      <div class="area-left">
        <input v-model="form.name" class="itm-name" placeholder="Entry name">
        <div class="f-column">
          <q-input class="mrg-b-15" :value="form.login" placeholder="Login name" @update:value="form.login = $event" />
          <div class="f-row">
            <q-input class="mrg-b-15" :value="form.password" regex="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,60}$" width="180px" placeholder="Password" @update:value="form.password = $event" />
            <img src="~/assets/icons/gen-password.svg" height="32px" width="32px">
          </div>
          <div class="separator mrg-b-15" />
          <q-input mode="select" :value="form.category" :slots="form.dataTest" class="mrg-b-15" @update:value="form.category = $event" />
          <q-input class="mrg-b-15" :value="form.url" placeholder="Link" @update:value="form.url = $event" />
        </div>
      </div>
      <div class="area-right">
        <textarea placeholder="Add description..." />
        <div class="separator-right" />
        <div class="f-row-right button-area">
          <a href="#" class="btn secondary">Cancel</a>
          <a href="#" class="btn primary" @click="userStore.addPasswordItem(form.name, form.description, form.login, form.password, form.url)">Add Entry</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import { useAccountStore } from '@/store/account'

export default defineComponent({
  setup () {
    const userStore = useAccountStore()
    const form = reactive({
      name: '',
      login: '',
      url: '',
      category: 'All Category',
      password: '',
      dataTest: [{ id: 'test', name: 'All Category' }, { id: 'test1', name: 'Games' }, { id: 'test2', name: 'Pro' }],
      test: computed(() => {
        console.log('name : ' + form.name + ', login : ' + form.login + ', url : ' + form.url)
        return form.login.length
      })
    })

    return {
      form,
      userStore
    }
  }
})
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
    visibility: hidden;
    opacity: 0;
    z-index: 10;
  }

  .overlay:target {
    visibility: visible;
    opacity: 1;
  }

  .popup {
    display: flex;
    margin: 70px auto;
    background: #fff;
    border-radius: 5px;
    width: 574px;
    height: 381px;
    border-radius: 8px;
    border: 1px solid #242734;
    box-sizing: border-box;
    position: relative;
    transition: all 5s ease-in-out;
  }

  .area-left {
    margin: 0;
    padding: 32px;
    width: calc(297px - 64px);
    background-color: #242734;
    color: white;
  }

  .area-right {
    position: relative;
    width: 277px;
    background-color: #353648;
  }

  .area-left input[class="itm-name"] {
    color: #353648;
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 45px 0;
    outline: none;
    background-color: transparent;
    text-decoration: none;
    border: none;
  }

  .q-input {
    background-color: transparent;
    border: 1px solid #4D4E61;
    border-radius: 8px;
    text-decoration: none;
    outline: none;
    width: 223px;
    padding: 0 8px;
    color: #4D4E61;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    height: 31px;
  }

  .f-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    height: 100%;
  }

  textarea {
    position: absolute;
    margin: 0;
    top: 20px;
    left: 20px;
    height: 260px;
    resize: none;
    outline: none;
    border: none;
    background-color: transparent;
    width: 230px;
    color: #727280;
  }

  .f-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    margin-left: 23px;
    margin-right: 23px;
  }

  .f-row img {
    margin-left: 12px;
    margin-top: 1px;
  }

  .button-area {
    height: 30%;
  }

  .separator {
    border: 1px solid #353648;
    background-color: grey;
    width: 100%;
  }

  .f-row-right {
    position: absolute;
    display: flex;
    padding-right: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    bottom: 0;
    left: 0;
    right: 0;
    height: 75px;
    grid-gap: 25px;
    border-top: 1px solid #4D4E61;
    background-color: transparent;
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
    background-color: var(--color-grey-3);
    color: var(--color-white)
  }
  .btn:hover {
    opacity: 0.75;
  }

  /*
  .btn:active {
    font-size: 11.7px;
  }
  */
  .btn:disabled, .btn.disabled {
    opacity: 0.25;
    cursor: default;
  }

  .btn.primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .btn.secondary {
    background-color: transparent;
    border: 1px solid var(--color-white-025);
    color: var(--color-white);
  }

</style>
