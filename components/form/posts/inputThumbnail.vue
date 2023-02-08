<template>
    <label :for="id" class="nav">
        <input type="file" :id="id" accept="image/*" @change="changeFile" ref="file">

        <div :class="`img-wrap ${file || imgUrl ? 'active' : ''}`">
            <img :src="fileImgUrl" alt="" v-if="file">
            <img :src="imgUrl" alt="" v-else-if="imgUrl">
            <img src="/images/picturePlus.png" alt="" style="width:17px;" v-else>
        </div>

        <h3 class="title">대표이미지</h3>
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
            // this.files = [];

            this.file = event.target.files[0];

            let form = new FormData();

            form.append("image", this.file);
            form.append("district_id", this.$store.state.district ? this.$store.state.district.id : 0);

            this.$axios.post("/posts/images", form)
                .then((response) => {
                    this.$emit("change", {
                        file: this.file,
                        name: response.data.data.file_name,
                        url: response.data.data.original_url,
                        html : `<img src="${response.data.data.original_url}"/>`
                    });

                    this.$refs.file.value = null;
                });
            /*Array.from(event.target.files).map(file => {
                this.files.push({
                    file: file,
                    img: URL.createObjectURL(file)
                })
            })

            this.$emit("change", this.files.map(file => file.file));*/
        },

        remove(index){
            this.files = this.files.filter((img, indexData) => indexData != index);

            this.$emit("change", this.files.map(file => file.file));
        }
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
