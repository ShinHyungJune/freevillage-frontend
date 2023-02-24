<template>
  <div class="select-wrap" >
    <div class="selectFirst" v-show="!selected" @click="$emit('toggle')">{{menuTitle}}</div>
    <div class="selectFirst" v-show="selected" @click="$emit('toggle')">{{selectedItem}}</div>
    <div class="selectOption" v-if="activate" @click="$emit('toggle')">
        <ul>
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

