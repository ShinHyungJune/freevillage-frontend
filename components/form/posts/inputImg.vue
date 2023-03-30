<template>
    <label :for="id" class="nav">
        <input type="file" :id="id" accept="image/*" @change="changeFile" ref="file">

        <div class="img-wrap">
            <img src="/images/pictureMen.png" alt="" style="width:20px;">
        </div>

        <h3 class="title">{{ this.title }}</h3>
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
        maxWidth: {
            default: () => {
                return 700;
            },
        },
        id: {
            default() {
                return "picture";
            }
        },
        title: {
            default(){
                return "사진이미지";
            }
        }
    },

    data(){
        return {
            file: "",
            img : ""
        }
    },


    methods: {
        changeFile(event) {
            let files = event.target.files;
            let file = files[0];
            let self = this;
            let reader = new FileReader();
            let image = new Image();
            
            if (!(file instanceof Blob)) {
                console.error('Invalid file type');
                return;
            }
            if(files.length == 0) return;
            
            console.log(files)
            console.log(file.type)
            reader.readAsDataURL(file);

            reader.onload = function (readerEvent) {
                image.onload = function () {
                    let result = self.resize(image);

                    self.uploadImage(new File([result], file.name));

                    return result;
                };

                image.src = readerEvent.target.result;
            };
        },

        remove(index){
            this.files = this.files.filter((img, indexData) => indexData != index);

            this.$emit("change", this.files.map(file => file.file));
        },

        uploadImage(file){
            let form = new FormData();

            form.append("image", file);
            form.append("district_id", this.$store.state.district ? this.$store.state.district.id : 0);

            this.$axios.post("/api/posts/images", form)
                .then((response) => {
                    this.$emit("change", {
                        file: file,
                        name: response.data.data.file_name,
                        url: response.data.data.original_url,
                        html : `<img src="${response.data.data.original_url}"/>`
                    });

                    this.$emit("changeFile", file);

                    this.$refs.file.value = null;
                });
        },

        resize(image){
            let width = image.width;
            let height = image.height;
            let canvas = document.createElement("canvas");

            height *= this.maxWidth / width;
            width = this.maxWidth;


            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/png');

            return this.dataURLtoBlob(dataUrl);
        },

        dataURLtoBlob(dataURI){
            const bytes =
                dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
            const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const max = bytes.length;
            const ia = new Uint8Array(max);
            for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);

            return new Blob([ia], { type: mime });
        }
    },

}
</script>
