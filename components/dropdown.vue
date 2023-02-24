<template>
  <div class="select-wrap" >
    <div class="selectFirst" @click="$emit('toggle')">{{menuTitle}}</div>
    <div class="selectOption" v-if="activate" @click="$emit('toggle')">
        <ul>
            <li v-for="(item,index) in items" :key="index" @click="$emit('change',item)">
                {{item}}
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activate: {
      type: Boolean,
      default: false,
    },
    menuTitle: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: []
    }
  },
}
</script>

