<template>
  <div class="nav">
        <div class="img-wrap" @click="active = true">
            <img src="/images/link.png" alt="" style="width:16px;">
        </div>
        <h3 class="title" @click="active = true">유튜브 추가</h3>
        <!-- 링크 추가 팝업 -->
        <div class="m-pop type01" id="pop1" v-if="active" style="width:100vw; height:100vh; top:-100vh; left:50%; transform:translateX(-50%);">
            <div class="m-pop-inner">
                <button class="btn-close m-script-pop" data-target="#pop1" @click="active = false">
                    <img src="/images/x.png" alt="" style="width:21px;">
                </button>

                <div class="m-pop-title">유튜브 링크를 입력하세요</div>
                <div class="mt-4"></div>
                <div class="m-input-text type01">
                    <input type="text" placeholder="https://example.com" v-model="link">
                </div>

                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100" @click="change">등록하기</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      link: "",
    }
  },
  methods: {
    change(){
        if(!this.link) {
          alert('링크를 입력해주세요')
          return;
        }
          
        let id = "";
        let embedUrl = "";
        let thumbnail = "";

        let match = this.link.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(shorts\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
        id = (match&&match[match.length-1].length==11)?match[match.length-1]:false;

        if(id) {
            embedUrl = "https://www.youtube.com/embed/" + id;
            thumbnail = "https://img.youtube.com/vi/" + id + "/0.jpg";
        }

        this.$emit("change",{
            id: id,
            embedUrl: embedUrl,
            thumbnail: thumbnail
        }); 
        this.active = false;
    }
  },

}
</script>

<style>

</style>