<template>
  <ul>
    <li v-for="(todo,value) in todos" :key="value">
      <span >{{ todo }}</span>
    </li>
    <input placeholder="What needs to be done?" v-model="list">
    <button @click="add(list)">添加</button>
    <button @click="remove(list)">删除</button>
  </ul>
</template>

<script lang="ts">
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            changeList: 'vuexTest/changeList'
        }),
        ...mapActions({
            axoisTest: 'vuexTest/axoisTest'
        }),
        todos () {
            return this.changeList
        },
        dataAxios() {
            return this.axoisTest
        }
    },

    data: function () {
        return {
            list:'',
        }
    },
    async mounted() {
    },
    methods: {
        ...mapMutations({
            add: 'vuexTest/add',
            remove: 'vuexTest/remove',
        }),
    },
    head: {
        title: "登陆"
    }
};
</script>

<style></style>
