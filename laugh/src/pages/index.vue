<template>
  <div id="index">
    <div class="content">
      <div class="search">
        <input
          placeholder="search"
          v-model="ans"
        >
        <mt-button
          type="primary"
          icon="search" @click="search"
        ></mt-button>
      </div>
      <div class="random">
        <mt-button type="danger" @click="random">random</mt-button>
      </div>

      <div class="show">
        <!-- <div class="box" v-for="(item,index) in laughList" :key="index">{{item.content}}</div> -->
        <div class="test" v-show="contentRandom">{{contentRandom}}</div>
        <div class="test" v-show="contentSearch" v-for="(item,index) in contentSearch" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "mint-ui";
import { MessageBox } from 'mint-ui';

import api from "./../axios/api.js";

export default {
  data() {
    return {
      ans: "",
      laughList:[],
      contentRandom:'',
      contentSearch:''
    };
  },
  created() {
    this.getDatas();
  },
  methods: {
    getDatas: function() {
      let params = {
        key: "3ba6dbf8bc164aa68c1efe63d1bdc949",
        page: "2",
        rows: "10",
        sort: "asc",
        time: 1418745237
      };
      let params2 =
        "key=3ba6dbf8bc164aa68c1efe63d1bdc949&page=2&rows=50&sort=asc&time=1418745237";
      api
        .getData("http://api.avatardata.cn/Joke/QueryJokeByTime", params2)
        // .getData("http://api.avatardata.cn/Joke/QueryJokeByTime?key=3ba6dbf8bc164aa68c1efe63d1bdc949&page=2&rows=10&sort=asc&time=1418745237")
        .then(res => {
          console.log(res)
          this.laughList = res.result
        })
        .catch(err => {
          console.log(err);
        });
    },
    random: function () {
      let self = this
      self.contentSearch=''
      let i = parseInt(Math.random()*(self.laughList.length+1),10)
      self.contentRandom = self.laughList[i].content
    },
    search: function () {
      let self = this
      self.contentRandom=''
      console.log(self.ans)
      var arr=[]
      for (let index = 0; index < self.laughList.length; index++) {
        if(self.ans=='') {
          MessageBox('ERR', '请输入搜索内容');
          console.log("请输入搜索内容")
          return
        }else {
          if(self.laughList[index].content.indexOf(self.ans) >= 0){
            console.log("包含")
            console.log(self.laughList[index].content)
            arr.push(self.laughList[index].content)
          }
        } 
      }
      console.log(arr)
      if(!self.ans==''&&arr==''){
        console.log("未找到")
        MessageBox('Notice', '未找到');
      }
      self.contentSearch = arr
    }
  }
};
</script>

<style lang="less" >
body {
  background-color: #79c3f2;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
#index {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  .content {
    width: 300px;
    height: auto;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;

    .search {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .show {
      width: 100%;
      height: auto;
      margin-top: 20px;

      .box {
        padding: 10px;
        text-align: justify;
        text-indent: 2em;
      }
      .test {
        width: 100%;
        margin: 0 auto;
        height: auto;
        // padding: 10px;
        text-align: justify;
        text-indent: 2em;
        background-color: yellow;
      }
    }
  }
}
</style>


