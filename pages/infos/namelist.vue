<template>
  <div class="area-my-boards">
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.back()">
              <img src="/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
            <h3 class="title">마을 명단</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>
    <!-- content container -->
    <div class="container">
      <div class="utils">
        <button class="btn-util" style="width:100%">
          <div class="m-input-text-wrap">
            <div class="m-input-text type01">
              <input type="text" placeholder="검색어를 입력해주세요." v-model="word" @keyup.enter="search">

              <i class="xi-search m-input-text-deco" @click="search"></i>
            </div>
          </div>
        </button>
      </div>
      <div class="mt-8" style="margin-left:1rem">
        <h5>전체 {{total}}명</h5>
      </div>
      <div class="mt-12"></div>
      <div class="wrap">
        <div class="m-boards type02">
            <name v-for="item in items.data" :key="item.id" :item="item"/>
        </div>
      </div>
      <scroll-loading @load="loadMore" v-if="items.links.next" />
    </div>
  </div>
</template>

<script>
import Name from "@/components/mypage/name";

export default {
  components: {
    Name,
  },
  middleware({store, redirect}) {
      if(!store.$auth.hasScope('manager')) {
        redirect('/')
      }
  },
  data() {
    return {
      form: {
          page: 1,
      },
      items: {
          data: [],
          meta: {
              totalCommentCount: 0,
              totalLikeCount: 0,
              totalPostCount: 0,
          },
          links: { 

          }
      },
      word:""
    }
  },
  computed: {
    total() {
      return this.items.meta.total 
    }
  },
  methods: {
    loadMore(state) {
        if(this.items.meta.current_page <= this.items.meta.last_page){
            this.form.page += 1;

            this.$axios.get(`/api/districts/${this.$auth.user.district.id}/members`, {
                params: this.form
            }).then(response => {
                this.items = {
                    ...response.data,
                    data: [...this.items.data, ...response.data.data]
                };

                state.loaded();
            });
        }
    },
    search() {
      this.$axios.get(`/api/districts/${this.$auth.user.district.id}/members`, {
        params: {
          search: {
            keyword: this.word
          }
          
        }
      }).then(response => {
        this.items = response.data;
      })
    },
    getItems(){
        this.form.page = 1;

        this.$axios.get(`/api/districts/${this.$auth.user.district.id}/members`)
            .then(response => {
                this.items = response.data;
            });
    },

  },
  mounted () {
    this.getItems();
  },
}
</script>

<style>

</style>