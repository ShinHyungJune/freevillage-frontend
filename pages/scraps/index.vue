<template>
    <div class="area-wallets-index">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util" @click="$router.back()">
                        <img src="/images/back.png" alt="" style="width:10px;">
                    </button>

                    <h3 class="title">
                        내 공유함
                        <span class="body">최대 3개의 글을 공유할 수 있습니다.</span>
                    </h3>
                </div>

                <div class="center">

                </div>

                <div class="right"></div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="wrap">
                <scrap-items :scrap_id="form.scrap_id"
                             @removed="removed"
                             @reorder="reorder"
                             @extracedImages="collectImages"
                             :edit-mode="editMode"
                />
            </div>

        </div>
    </div>
</template>

<script>

export default {
    components: {},
    auth: true,
    data() {
        return {
            form: {
                page: 1,
                district_id: this.$store.state.district.id,
                scrap_id: this.$auth.user.scrap ? this.$auth.user.scrap.id : "",
                title: "",
            },

            editMode: false,

            items: {
                data: this.$auth.user.scrap ? [this.$auth.user.scrap] : [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: {}
            },
            images:[]
        }
    },
    methods: {
        /*loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/posts", {
                    params: this.form
                }).then(response => {
                    this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };

                    state.loaded();
                });
            }
        },*/

        removed(){

        },

        reorder(items){
            this.$axios.post("/scrapItems/reorder", {
                items: items
            })
        },

        getItems(){
            this.form.page = 1;

            this.$axios.get("/scraps", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        store(){
            this.$axios.post("/scraps", this.form)
                .then(response => {
                    this.items.data.push(response.data.data);

                    this.form.scrap_id = response.data.data.id;

                    this.changeMain(response.data.data);
                })
        },

        changeMain(){

            this.$axios.patch("/scraps/updateUserMainScrap/" + this.form.scrap_id)
                .then(response => {
                    this.$auth.setUser({
                        ...this.$auth.user,
                        scrap: response.data.data
                    });

                    location.reload();
                });
        },
        collectImages(arr) {
            this.images = [
                ...this.images,
                ...arr
            ]
        }
    },

    mounted() {
        this.$axios.get("/scraps", {
            params: this.form
        }).then(response => {
            this.items = response.data;
        });

        console.log(this.$auth.user,'scrap index mounted')
    }
}
</script>

<style scoped>

</style>
