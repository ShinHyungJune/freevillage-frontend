<template>
    <div class="m-loading type01">
        <div class="m-loading-inner"></div>
    </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {
            wait: false,

        }
    },

    methods: {

    },

    mounted() {
        let self = this;

        $(window).scroll(function(){
           if($(window).scrollTop() >= ($(document).height() - $(window).height() - 200)){
               if(!self.wait){
                   self.wait = true;

                   self.$emit("load");

                   setTimeout(function(){
                       self.wait = false;
                   }, 1000);
               }
           }
        });
    }
}
</script>
