<template>
    <label for="camera" class="nav">
        <input type="file" :id="id" accept="image/*" capture="camera" @change="changeFile">

        <div class="img-wrap">
            <img src="/images/camera.png" alt="" style="width:18px;">
        </div>

        <h3 class="title">사진 촬영</h3>
    </label>
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
            file: "",
            img : ""
        }
    },


    methods: {
        changeFile(event) {
            // this.files = [];

            let file = event.target.files[0];

            let form = new FormData();

            form.append("image", file);
            form.append("district_id", this.$store.state.district ? this.$store.state.district.id : 0);

            this.$axios.post("/posts/notices/images", form)
                .then((response) => {
                    console.log(response);
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

}
</script>
