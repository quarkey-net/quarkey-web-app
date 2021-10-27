<template>
  <div v-if="mode === 'normal'">
    <input :style="{width: width}" :value="value" :class="isValid ? 'in brd' : 'in brd-red'" :placeholder="placeholder" type="text" @input="(event) => $emit('update:value', event.target.value)" @keyup="validateInput">
  </div>
  <div v-else-if="mode === 'select'" class="selector">
    <select @input="(event) => $emit('update:value', event.target.value)">
      <option v-for="slot in slots" :key="slot.id">
        {{ slot.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'QInput',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    slots: {
      type: Array,
      required: false,
      default: () => []
    },
    width: {
      type: String,
      required: true,
      default: '223px'
    },
    mode: {
      type: String,
      required: false,
      default: 'normal'
    },
    regex: {
      type: String,
      required: false,
      default: '.*'
    },
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String
    }
  },
  setup (props, { emit }) {
    const isValid = ref(true)
    const validateInput = () => {
      isValid.value = new RegExp(props.regex).test(props.value)
    }

    return {
      isValid,
      validateInput
    }
  }
})
</script>

<style scoped>
  .brd {
    border: 1px solid #4D4E61;
  }

  .brd-red {
    border: 1px solid rgb(255, 72, 0);
  }

  div {
    padding: 0;
  }

  .in {
    background-color: transparent;
    /* border: 1px solid #4D4E61; */
    border-radius: 8px;
    text-decoration: none;
    outline: none;
    padding: 0 8px;
    color: #4D4E61;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    height: 31px;
  }

  /* .selector {
    outline: none;
    text-decoration: none;
    border: 1px solid white;
    background-color: transparent;
    border-radius: 8px;
    height: 32px;
    width: 223px;
  } */

  .selector select {
    border: 1px solid #4D4E61;
    width: 243px;
    height: 35px;
    color: #4D4E61;
    background-color: transparent;
    padding: 0 8px;
    color: white;
    outline: none;
    border-radius: 8px;
  }

  .selector select option {
    color: #9d9eb6;
    background-color: #353648;
  }
</style>
