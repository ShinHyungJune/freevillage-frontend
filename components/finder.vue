<template>
  <div class="m-pop type01">
    <div class="m-pop-inner">
      <button class="btn-close" @click.prevent="emitEvent('cancel')">
        <img src="/images/x.png" alt="" style="width:21px;">
      </button>
      <div class="m-pop-title">{{title}}</div>
      <div class="mt-8"></div>
      <div class="m-board-btns mt-20">
        <div class="m-input m-input-text type01">
            <input type="text" placeholder="주소를 입력해주세요" :disabled="searchComplete" v-model="keyword">
        </div>
        <div class="mt-16"></div>
        <div class="m-btns type01">
          <div class="m-btn-wrap" v-if="!searchComplete">
            <button class="m-btn type02 bg-revert-red width-100" @click.prevent="trans">변환하기</button>
          </div>
          <div class="m-btn-wrap" v-if="searchComplete">
            <button class="m-btn type02 bg-revert-primary width-100" @click.prevent="search">검색하기</button>
          </div>
          <div class="m-btn-wrap" v-if="searchComplete">
            <button class="m-btn type02 bg-revert-primary width-100" @click.prevent="clear">초기화</button>
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
  data() {
    return {
      keyword: "",
      sqlKeywords : ["OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
             		 "UNION",  "FETCH", "DECLARE", "TRUNCATE" ],
      stateDictionary: {
        "서울특별시": "서울",
        "경기도": "경기",
        "인천광역시": "인천",
        "부산광역시": "부산",
        "대구광역시": "대구",
        "광주광역시": "광주",
        "대전광역시": "대전",
        "울산광역시": "울산",
        "세종특별자치시": "세종",
        "강원도": "강원",
        "충청북도": "충북",
        "충청남도": "충남",
        "전라북도": "전북",
        "전라남도": "전남",
        "경상북도": "경북",
        "경상남도": "경남",
        "제주특별자치도": "제주"
      },
      searchComplete : false,
    }
  },
  watch: {
    keyword(newValue, oldValue) {
      let expText = /[%><]/;
      if(expText.test(newValue)) {
        alert(`'>','<'와 같은 특수문자는 입력할 수 없습니다.`);
        this.keyword = oldValue;
      }
      this.sqlKeywords.forEach(sqlword => {
        let regex = new RegExp(sqlword,"gi");
        if(regex.test(newValue)) {
          alert('사용불가능한 단어가 포함되어있습니다.')
          this.keyword = oldValue;
        }
      })
    }
  },
  methods: {
    emitEvent(eventName, payload = undefined) {
      this.$emit(eventName, payload);
    },
    async trans() {
        if(this.keyword == '')
          return;
        this.$axios.get("/addrlink/addrLinkApi.do", {
            params: {
                confmKey: 'U01TX0FVVEgyMDIxMTIxNjE0MTM1OTExMjAzNzk=',
                resultType: 'json',
                addInfoYn: 'Y',
                keyword: this.keyword
            },
        }).then(({data}) => {
            const hemdNm = data.results.juso[0].hemdNm;
            this.keyword = hemdNm;
            this.searchComplete = true;
        })
    },
    search() {
      const keys = ['state','city','district'];
      const values = this.keyword.split(" ");
      values[0] = this.stateDictionary[values[0]];
      const container = {};
      keys.forEach((el,idx) => {
        container[el] = values[idx]
      })
      this.$emit('setContainer',container);
      this.$emit('cancel')
    },
    clear() {
      this.keyword = '';
      this.searchComplete = false;
    }
  },
}
</script>

<style>

</style>