<template>
    <div class="upload">
        <label for="a" class="find-file">
            파일 선택
            <input type="file" id="a" accept="image/*" @change="changeFile" multiple>
        </label>

        <ul class="upload-list col-group" style="margin-top:20px;">
            <li v-for="(file, index) in files" :key="index">
                <div class="img-box">
                    <img :src="file.img ? file.img : ''" alt="">
                </div>
                <button class="del" @click="remove(index)">
                    <i class="xi-close"></i>
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ["default"],

    data(){
        return {
            files: []
            /*
            {
                file: "",
                img : ""
            }
            * */
        }
    },

    methods: {
        changeFile(event) {
            // this.files = [];

            Array.from(event.target.files).map(file => {
                this.files.push({
                    file: file,
                    img: URL.createObjectURL(file)
                })
            })

            this.$emit("change", this.files.map(file => file.file));
        },

        remove(index){
            this.files = this.files.filter((img, indexData) => indexData != index);

            this.$emit("change", this.files.map(file => file.file));
        }
    },

}
</script>
