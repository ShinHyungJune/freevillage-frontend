<template>
  <div class="m-pop type01" @click.stop="handleBackdropClick($event, 'm-pop type01')">
    <div class="m-pop-inner">
      <button class="btn-close" @click.prevent="emitEvent('cancel')">
        <img src="/images/x.png" alt="x" style="width:21px;">
      </button>
      <div class="mt-8">
      <slot />
      </div>
    </div>
  </div>
</template>

<script>
import common from '../utils/common'
export default {
  props: {
    cancel: {
      type: String,
      default: ''
    },
  },
  mixins:[common],
  methods: {
    emitEvent(eventName, payload = undefined) {
      this.$emit(eventName, payload);
    }
  },

}
</script>

<style>

</style>