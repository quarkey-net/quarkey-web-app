<template>
  <div>
    load...
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const test = ref(null)
    // const route = useRouter()

    return {
      test
    }
  }
})
</script>
