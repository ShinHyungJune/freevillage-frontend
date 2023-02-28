<template>
    <input type="file" :id="addId" accept="image/*" @change="changeFile" multiple style="display:none;">
</template>
<script>
export default {
    props: {
        "maxWidth": {
            default: () => {
                return 700;
            },
        },

        "addId": {
            default: () => {
                return "img";
            }
        }
    },

    data(){
        return {
            files: [],
        }
    },

    methods: {
        changeFile(event) {
            let self = this;
            let readers = [];
            let images = [];

            let length = event.target.files.length;
            let countResize = 0;

            if(length > 5)
                return alert(this.$page.props.language.system["이미지는 최대 5장까지만 업로드 가능합니다"]);

            Array.from(event.target.files).map((file, index) => {
                readers.push(new FileReader());
                images.push(new Image());

                readers[index].readAsDataURL(file);

                readers[index].onload = function (readerEvent) {
                    images[index].onload = function () {
                        let result = self.resize(images[index]);

                        self.files.push(result);

                        countResize++;

                        if(length === countResize)
                            self.$emit("change", self.files);

                        return result;
                    };

                    images[index].src = readerEvent.target.result;
                };
            })


            /*this.files = [];

            Array.from(event.target.files).map(file => {
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
