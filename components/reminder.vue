<template>
  <div class="m-pop type01">
    <div class="m-pop-inner">
      <button class="btn-close" @click.prevent="emitEvent('cancel')">
        <img src="/images/x.png" alt="" style="width:21px;">
      </button>
      <div class="m-pop-title">{{title}}</div>
      <div class="mt-8"></div>
      <div class="m-board-btns mt-20">
        <div class="m-btns type01">
          <div class="m-btn-wrap" v-if="excecute">
            <button class="m-btn type02 bg-revert-red width-100" @click.prevent="emitEvent('excecute',item)">{{excecute}}</button>
          </div>
          <div class="m-btn-wrap" v-if="cancel">
            <button class="m-btn type02 bg-revert-primary width-100" @click.prevent="emitEvent('cancel')">{{cancel}}</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    excecute: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    },
    item:{
      type: Object,
      default: () => {}
    }
  },
  methods: {
    emitEvent(eventName, payload = undefined) {
      this.$emit(eventName, payload);
    }
  },
}
</script>

<style>

</style>