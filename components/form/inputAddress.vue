<template>
    <div class="inf-wrap input-address">
        <div class="fragment">
            <input type="text" placeholder="주소" v-model="form[address]" :name="address" @change="change" disabled style="width:100%; text-align: left;">
            <button type="button" class="black-btn" id="find_address">우편번호 검색</button>
        </div>

        <input type="text" placeholder="상세주소" v-model="form[address_detail]" :name="address_detail" id="address_detail" @change="change" v-if="!form[address]" disabled>
        <input type="text" placeholder="상세주소" v-model="form[address_detail]" :name="address_detail" id="address_detail" @change="change" v-else>
        <input type="text" disabled placeholder="우편번호" v-model="form[address_zipcode]" :name="address_zipcode" id="address_zipcode" @change="change">

        <p class="m-input-error" v-if="form.errors[address]">{{form.errors[address]}}</p>
        <p class="m-input-error" v-if="form.errors[address_detail]">{{form.errors[address_detail]}}</p>
        <p class="m-input-error" v-if="form.errors[address_zipcode]">{{form.errors[address_zipcode]}}</p>
    </div>
</template>
<script>


export default {
    props: {
        form: {
            default : {
                errors: {}
            }
        },
        address: {
            default: "address"
        },
        address_detail: {
            default: "address_detail"
        },
        address_zipcode: {
            default: "address_zipcode"
        },
        activated: false,
    },
    data(){
        return {

        }
    },

    methods: {
        change(e){
            e.preventDefault();

            this.emit(e.target.name, e.target.value);
        },

        emit(name, value){
            this.$emit("change", {
                name: name,
                value: value
            });
        }
    },

    mounted() {
        let self = this;

        document.getElementById("find_address").addEventListener("click", function(){ //주소입력칸을 클릭하면
            //카카오 지도 발생
            new daum.Postcode({
                oncomplete: function(data) { //선택시 입력값 세팅
                    document.getElementById("address_detail").focus(); // 주소 넣기

                    self.emit(self.address, data.address);
                    self.emit(self.address_zipcode, data.zonecode);
                }
            }).open();
        });
    }
}
</script>
