<template>
  <div class="area-index">
    <header-type01/>
    <div class="container">
        <section class="section-attendance-back">
          <div class="wrap">
            <div class="content pt-40">
              <div class="inner">
                <div class="btn-wrap">
                  <p class="btn-title">DAILY EVENT</p>
                </div>
                <div class="mt-8"></div>
                <div class="m-title type01">
                  이달의 <span class="point">출석 체크</span>
                </div>
              </div>

            </div>
          </div>
        </section>
        <section class="section-attendance">
          <div class="button-container title-center-stamped" @click.once="stamp" :disabled="hasStamped" v-if="hasStamped">
            <div class="title-wrapper">
              <!-- <p class="title">출석도장찍기</p> -->
              <button class="title">출석도장찍기 완료</button>
            </div>
          </div>
          <div class="button-container title-center" @click.once="stamp" :disabled="hasStamped" v-else>
            <div class="title-wrapper">
              <!-- <p class="title">출석도장찍기</p> -->
              <button class="title">출석도장찍기</button>
            </div>
          </div>
          <div class="pt-40">
            <div class="wrap">
              <h3 class="title">출석 체크 미션을 완료해 보세요!</h3>
              <div class="mt-8"></div>
              <div class="flex-col">
                <div :class="getStampClass(item)" v-for="(item, index) in stampInfo" :disabled="stampDisabled(item)" @click.once="stamp(item)">
                  
                  <img
                    v-if="item.type === 'stamped' && !isGiftDay(item)"
                    src="/images/attendance-success.png" 
                    class="stamp" alt="" srcset="">

                  <img
                    v-else-if="item.type === 'gift' && isUnderStamped(item)"
                    src="/images/attendance-gift.png" 
                    class="stamp" alt="" srcset="">

                  <div v-else-if="item.type === 'gift' && !isUnderStamped(item)">
                    <div class="mt-12">
                      <img src="/images/gift.png" class="stamp-gift" alt="" srcset="">  
                    </div> 
                  </div>

                  <div v-else class="rotate">{{item.day}}</div> 
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    <navigation />
  </div>
</template>

<script>
export default {
  data() {
    return {
      giftDays: [3, 7, 12, 19, 24, 28, 31],
      stampedDays: 20,
      stampInfo: [],
      currentMonthLastDay: null,
      hasStamped: false,
    }
  },
  methods: {
    stamp(item) {
      if(this.stampDisabled(item)) {
        return;
      }
      if(this.hasStamped) {
        alert('이미 출석도장을 찍으셨습니다.')
        return;
      }
      this.hasStamped = true;
      this.stampedDays++;
      //axios 요청
      this.makeStampInfo();
      alert('출석도장을 찍었습니다.')
    },
    stampDisabled(item) {
      if(item.day <= this.stampedDays) {
        return true;
      }
      return false;
    },
    getCurrentMonthLastDay() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const lastDay = new Date(year, month, 0).getDate();
      this.currentMonthLastDay = lastDay;
    },

    makeStampInfo() {
      let i = 1;
      const stampInfo = [];
      while(i <= this.currentMonthLastDay) {
        if(this.giftDays.includes(i)) {
          stampInfo.push({
            type: 'gift',
            day: i,
          });
        } else if(i <= this.stampedDays) {
          stampInfo.push({
            type: 'stamped',
            day: i,
          });
        } else {
          stampInfo.push({
            type: 'unstamped',
            day: i,
          });
        }
        i++;
      }
      this.stampInfo = stampInfo;
    },

    isUnderStamped(item) {
      return item.day <= this.stampedDays;
    },

    isGiftDay(item) {
      return this.giftDays.includes(item.day);
    },

    getStampClass(item) {
      if(item.type === 'unstamped' || (item.type === 'gift' && !this.isUnderStamped(item)))
        return 'relative-group';
      else {
        return 'relative-group-temp';
      }
    }

  },
  mounted () {
    this.getCurrentMonthLastDay();
    this.makeStampInfo();
  },
}
</script>

<style scoped>
.pt-40 {
  padding-top: 40px;
}
.container {
  background: #f6f6f6;
  min-height: 100vh;
  overflow: scroll;
}
.area-index .section-attendance-back .content {
    /* padding:40px 20px 30px 20px; */
    background:url("/images/attendance.png") no-repeat; background-size:cover; border-radius:5px;
    text-align: center;
    height: 150px;
    max-width: 100%;
}
.content .inner .btn-wrap {
  /* div center */
  position: relative;
  display: inline-block;
  padding-top: 5px;
  width: 100px;
  height: 24px;

  background: #ddf1e0;
  border-radius: 20px;

}
.btn-wrap .btn-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 400;
  
  color: #0BAF00;
}

.title-center {
  position: absolute;
  min-width: 300px;
  height: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0BAF00;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

}
.title-center-stamped {
  position: absolute;
  min-width: 300px;
  height: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  background:#828282;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.button-container .title-wrapper {
    display:flex; align-items: center; justify-content: center;
    height:45px; padding:0 16px;
    border-radius:5px;
    border:1px solid transparent;
}
.button-container .title-wrapper .title {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
}

.area-index .section-attendance {
    margin:0px 15px 30px 15px;
    background:#fff; border-radius:5px;
    text-align: center;
    min-height: 100vh;
    box-shadow: 12px 25px 50px -12px rgba(0, 0, 0, 0.25);

}

.section-attendance .flex-col {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


.relative-group {
  flex: 1 0 21%; /* explanation below */
  flex:none;
  margin: 5px;
  background:url("/images/attendance-base.png") no-repeat; background-size:cover;
  width:65px;
  height:65px;
}
.relative-group-temp {
  flex: 1 0 21%; /* explanation below */
  flex:none;
  margin: 5px;
  width:65px;
  height:65px;
}

.stamp {
  position: relative;
  width: 65px;
  height: 65px;
}

.stamp-gift {
  position: relative;
  width: 40px;
  height: 45px;
  margin: -3px 0px 12px 0px;
}
.rotate {
  position:absolute;
  margin: 2rem;
  transform: translate(-50%, -50%) rotate(-20deg);
  font-size: 20px;
  font-weight: bold;
  opacity: 0.3;

}

</style>