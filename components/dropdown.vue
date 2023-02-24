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

<style scoped>
    .select-wrap {
        position: relative;
        
    }

    .selectFirst {
        float: left;
        text-align: left;
        width: 100%;
        padding: 11px 20px;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #e1e1e1;
        font-weight: 500;
        
    }
    .selectFirst:after {
    content: "";
    width: 10px;
    height: 6px;
    position: absolute;
    right: 20px;
    top: 25px;
    transform: translateY(-50%);
    background: url(/images/chevron-down.png);
    background-size: 10px auto;
    }
    

    .selectOption {
        overflow-x:hidden;
        top: 43px;
        width: 100%;
        height:150px; 
        position: absolute; 
        z-index: 500; 
        border-radius: 0;
        background-color: white;
        text-align: left;
        border-left: 1px solid #e1e1e1;
        border-right: 1px solid #e1e1e1;
    }

    .selectOption ul > li {
        padding: 11px 20px;
        border-bottom: 1px solid #eee;
    }
</style>