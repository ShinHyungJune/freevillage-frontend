<template>
  <div class="select-wrap" >
    <div class="selectFirst" v-show="!selected" @click="$emit('toggle')">{{menuTitle}}</div>
    <div class="selectFirst" v-show="selected" @click="$emit('toggle')">{{selectedItem}}</div>
    <div class="selectOption" @click="$emit('toggle')">
      <ul v-if="activate">
          <li v-for="(item,index) in computedItems" :key="index" @click="select(item)">
              {{item.value}}
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * items:array<string> (default) 을 받아 드랍다운 형식으로 만드는 컴포넌트
 * @displayName Dropdown
 */
export default {
  props: {
    /**
     * 드랍다운 활성화 플래그
     */
    activate: {
      type: Boolean,
      default: false,
    },
    menuTitle: {
      type: String,
      default: "",
    },
    /**
     * 드랍다운 내용물
     */
    items: {
      type: Array,
      default: []
    },
    /**
     * 선택된 아이템
     */
    selected: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    /**
     * items 의 내용물 차이로 인해 추가적으로 만들어진 부분
     */
    computedItems() {
      const items = this.items.map(item => {
        if(typeof item == 'string')
          return {value: item}
        if(typeof item === 'object')
          return {
            value: item.district,
            id: item.id
          }
      })
      return items;
    }
  },
  data() {
    return {
      /**
       * 선택된 아이템을 표시하기 위해 사용
       */
      selectedItem: ''
    }
  },
  methods: {
    /**
     * 드랍다운 선택 시 리스너 콜백
     */
    select(item) {
      this.selectedItem = item.value;
      if(item.id) {
        this.$emit('change',item.id);
      }else {
        this.$emit('change',item.value);
      }
    }
  },
}
</script>
<style>
    .select-wrap {
        position: relative;
        float: left;
        width: 100%;
    }

    .select-wrap .selectFirst {
        text-align: left;
        width: 100%;
        padding: 11px 20px;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #e1e1e1;
        font-weight: 500;
        margin-bottom: 10px;
        
    }
    .select-wrap .selectFirst:after {
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
        max-height:300px; 
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

