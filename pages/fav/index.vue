<template>
  <div class="area-news">
      <!-- 헤더영역 -->
      <header-type01 />

      <!-- 내용 영역 -->
      <div class="container">
          <div class="mt-20"></div>
          <section class="section-ranking">
              <div class="wrap">
                  <h3 class="section-title">전체 인기상승</h3>
                  <favorites 
                  :activeState="activeState"
                  :activeCount="activeCount"
                  />
                  <div class="mt-12"></div>
              </div>
          </section>

          <quicks />
      </div>

      <navigation />
  </div>
</template>

<script>

export default {
  components: {},
  auth: false,
  data() {
      return {
          activeState : false,
          activeCount : 30,
          form: {
              board: this.$route.query.board ? this.$route.query.board : "",
              page: 1,
              district_id: this.$store.state.district.id,
              word: this.$route.query.word ? this.$route.query.word: "",
          },

          items: {
              data: [],
              meta: {
                  current_page: 1,
                  last_page: 1,
              },
              links: {}
          }
      }
  },
  methods: {
      loadMore(state) {
          if(this.items.meta.current_page <= this.items.meta.last_page){
              this.form.page += 1;

              this.$axios.get("/api/posts", {
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

      getItems(){
          this.form.page = 1;

          this.$axios.get("/api/posts", {
              params: this.form
          }).then(response => {
              this.items = response.data;

          });
      },

      move(item){
          this.$router.push("/posts/" + item.id);
      },

      toggleLike(e, item){
          e.preventDefault();
          e.stopPropagation();

          if(item.is_like){
              item.is_like = 0;
              item.like_count -= 1;
          }else{
              item.is_like = 1;
              item.like_count += 1;
          }

          this.items.data = this.items.data.map(itemData => {
              if(itemData.id == item.id)
                  return item;

              return itemData;
          });

          this.$axios.put("/api/likes/posts/" + item.id);
      },
  },
  computed: {
      district(){
          return this.$store.state.district;
      }
  },

  watch: {
      district (newData, oldData) {
          this.form.district_id = newData.id;

          this.getItems();
      }
  },

  mounted() {
      this.getItems();
  }
}
</script>

<style scoped>

</style>


