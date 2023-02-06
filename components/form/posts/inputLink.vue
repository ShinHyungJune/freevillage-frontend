<template>
    <div class="nav">
        <div class="img-wrap" @click="active = true">
            <img src="/images/link.png" alt="" style="width:16px;">
        </div>

        <h3 class="title" @click="active = true">링크 추가</h3>

        <!-- 링크 추가 팝업 -->
        <div class="m-pop type01" id="pop1" v-if="active" style="width:100vw; height:100vh; top:-100vh; left:50%; transform:translateX(-50%);">
            <div class="m-pop-inner">
                <button class="btn-close m-script-pop" data-target="#pop1" @click="active = false">
                    <img src="/images/x.png" alt="" style="width:21px;">
                </button>

                <div class="m-pop-title">링크를 입력하세요</div>

                <div class="m-input-text type01">
                    <input type="text" placeholder="링크명" v-model="title">
                </div>
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
    props: {
        defaultValue: {
              default(){
                  return "";
              }
        },
        id: {
            default() {
                return "camera";
            }
        },
    },

    data(){
        return {
            active: false,
            title: "",
            link: "",
        }
    },


    methods: {
        change() {
            this.active = false;

            this.$emit("change", {
                title: this.title,
                link: this.link,
                html : `<a href="${this.link}">${this.title}</a>`
            });
        },
    },

}
</script>
