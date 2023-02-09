<template>
    <label :for="id" class="profile">
        <input type="file" :id="id" accept="image/*" @change="changeFile" ref="file">

        <div :class="`img-wrap ${file || imgUrl ? 'active' : ''}`">
            <img :src="fileImgUrl" alt="" v-if="file">
            <img :src="imgUrl" alt="" v-else-if="imgUrl">
            <img src="/images/picturePlus.png" alt="" style="width:17px;" v-else>
        </div>

        <h3 class="title" v-if="!this.file">사진 선택</h3>
    </label>
</template>
<script>
export default {
    props: {
        imgUrl: {
            default(){
                return "";
            }
        },
        id: {
            default() {
                return "thumbnail";
            }
        },
    },

    data(){
        return {
            file: "",
            img : "",
        }
    },


    methods: {
        changeFile(event) {
            this.file = event.target.files[0];
            this.$emit("change", this.file);
        },
        // remove(index){
        //     this.files = this.files.filter((img, indexData) => indexData != index);

        //     this.$emit("change", this.files.map(file => file.file));
        // }
    },

    computed: {
        fileImgUrl(){
            if(this.file)
                return URL.createObjectURL(this.file);
            return "";
        }
    }
}
</script>

<style scoped>
  .profile {
    text-align: center;
  }
  .img-wrap {
    overflow: hidden;
  }
  .img-wrap.active img {
    width: 80px;
  }
</style>