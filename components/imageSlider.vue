<template>
  <div>
    <nuxt-link class="editor-body" :to="validContents ? contents[currentNumber % contents.length].link_url : '/'">
      <img :src="validContents ? contents[currentNumber % contents.length].image.url : ''" alt="">
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      default: () =>[]
    },
    propTimer: {
      type: Number,
      default: 3000,
    }
  },
  data() {
    return {
      currentNumber: 0,
      timer: null,
    }
  },
  computed: {
    validContents() {
      return this.contents.length > 0; 
    }
  },
  methods: {
    startRotation() {
      this.timer = setInterval(this.next,this.timer);
    },
    stopRotation() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    next() {
      this.currentNumber += 1;
    }
  },
  mounted () {
    this.timer = this.propTimer;
    if(this.contents.length > 1) {
      this.startRotation();
    }
  },
}
</script>

<style>

</style>