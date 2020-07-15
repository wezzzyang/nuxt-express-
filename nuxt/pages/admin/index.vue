<template>
    <div class="adminGrid">
      <div class="adminOut adminFlex">
        <div class="adminInner adminFlex">
          <img src="@/static/左上.jpg" alt="">
        </div>
      </div>
      <div class="adminOut adminFlex">
        <div class="adminInner adminFlex">
          <img src="@/static/中间.jpg" alt="">
        </div>
      </div>
      <div class="adminOut adminFlex">
        <div class="adminInner adminFlex">
          <img src="@/static/右上.jpg" alt="">
        </div>
      </div>
      <div class="adminOut adminFlex">
        <div class="adminInner adminFlex">
          <img src="@/static/左下.jpg" alt="">
        </div>
      </div>
      <div class="adminOut adminFlex">
        <div class="adminInner adminFlex">
          <img src="@/static/中下.png" alt="">
        </div>
      </div>
      <div class="adminOut adminFlex">
        <div class="adminInner adminFlex">
          <img src="@/static/右下.jpg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {
    layout: "mainly",
    head:{
        title:'高校教学资料管理系统'
    },
    data(){
        return {

        }
    },
    methods:{
    },
}
</script>
<style scoped>
  .adminGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-template-rows : 1fr 1fr;
    gap: 80px;
    height: 100%;
    width: 100%;
    padding: 60px 50px;
  }
  .adminFlex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .adminOut {
    height: 100%;
    width: 100%;
    background-image:linear-gradient(335deg,black,gray);
    box-shadow: 9px 9px 4px 3px grey;
    border-radius:4px;
  }
  .adminInner {
    height: 93%;
    width: 95%;
    background-color: white;
  }
  .adminInner > img {
    height: 91%;
    width: 93%;
  }
</style>
