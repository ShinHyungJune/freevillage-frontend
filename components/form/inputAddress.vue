<template>
    <div class=" input-address">
        <div class="m-input-withBtn type01">
            <div class="m-input m-input-text type01">
                <input type="text" placeholder="주소" disabled  @change="change" v-model="form.address">
            </div>

            <button class="m-input-btn m-btn type02" id="find_address">주소 찾기</button>
        </div>

        <div class="mt-8"></div>

        <div class="m-input-text type01">
            <input type="text" placeholder="상세주소" v-model="form.address_detail" id="address_detail" @change="change" v-if="!form.address" disabled>
            <input type="text" placeholder="상세주소" v-model="form.address_detail" id="address_detail" @change="change" v-else>
        </div>

        <!--
        <div class="m-input-text type01">
            <input type="text" disabled placeholder="우편번호" v-model="form[address_zipcode]" :name="address_zipcode" id="address_zipcode" @change="change">
        </div>
        -->
    </div>
</template>
<script>


export default {
    props: {
        address: {
            default(){
                return "";
            },
        },
        address_detail: {
            default(){
                return "";
            },
        },
        x: {
            default(){
                return "";
            },
        },
        y: {
            default(){
                return "";
            },
        },
    },
    data(){
        return {
            form: {
                address: this.address,
                address_detail: this.address_detail,
                x: this.x,
                y: this.y,
            }
        }
    },

    methods: {
        change(){
            this.$emit("change", this.form);
        },
    },

    mounted() {
        let self = this;

        kakao.maps.load();

        document.getElementById("find_address").addEventListener("click", function(){ //주소입력칸을 클릭하면
            //카카오 지도 발생
            new daum.Postcode({
                oncomplete: function(data) { //선택시 입력값 세팅
                    document.getElementById("address_detail").focus(); // 주소 넣기

                    let geocoder = new kakao.maps.services.Geocoder();

                    geocoder.addressSearch(data.address, function(result, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                            self.form.address = data.address;
                            self.form.x = result[0].x;
                            self.form.y = result[0].y;

                            self.change();
                        }
                    });
                }
            }).open();
        });
    }
}
</script>
