<template>
    <div class="userLy-container">
        <h1 class="title">
            高校教学资料管理系统
        </h1>

        <div class="userLy-main">
            <nuxt/>
        </div>

        <div class="userLy-footer">
            <p>
                杨晓龙的课设
            </p>
            <p>
                2020年6月19日
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },

    methods:{

    },

}
</script>
<style scoped>
.userLy-container {
    position: fixed;
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 20% 70% 10%;
    background-color: #00569a;
}
.userLy-main {
    width: 280px;
    align-self: start;
    z-index: 99;
}
.title {
    font-size: 2.8em;
    font-family: '黑体';
    margin-bottom: 20px;
    letter-spacing: 6px;
    background: white;
    background-clip: text;
    color: transparent;
}
.userLy-footer {
    opacity: 0.8;
    font-size: 12px;
    text-align: center;
    z-index: 0;
}
</style>
