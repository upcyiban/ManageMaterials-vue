// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
axios.defaults.withCredentials = true

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.prototype.$GetQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
},

Vue.prototype.$timetrans = function (date){
  var date = new Date(date);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
  return Y+M+D+h+m;
},
Vue.prototype.$compare = function (prop) {
  // 降序
  return function (obj1, obj2) {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return 1
    } else if (val1 > val2) {
      return -1
    } else {
      return 0
    }
  }
},
//逆序排列
Vue.prototype.$inordercompare = function (prop) {
  return function (obj1, obj2){
    //如果两个参数均为字符串类型
    var param1 = obj1[prop]
    var param2 = obj2[prop]
    if(typeof param1 == "string" && typeof param2 == "string"){
        return param2.localeCompare(param1);
    }
    //如果参数1为数字，参数2为字符串
    if(typeof param1 == "number" && typeof param2 == "string"){
        return -1;
    }
    //如果参数1为字符串，参数2为数字
    if(typeof param1 == "string" && typeof param2 == "number"){
        return 1;
    }
    //如果两个参数均为数字
    if(typeof param1 == "number" && typeof param2 == "number"){
        if(param1 > param2) {return 1;}
        if(param1 == param2) {return 0;}
        if(param1 < param2) {return -1;}
    }
  }
}
//顺序排列
Vue.prototype.$ordercompare = function (prop) {
  return function (obj1, obj2){
    //如果两个参数均为字符串类型
    var param1 = obj1[prop]
    var param2 = obj2[prop]
    if(typeof param1 == "string" && typeof param2 == "string"){
        return param1.localeCompare(param2);
    }
    //如果参数1为数字，参数2为字符串
    if(typeof param1 == "number" && typeof param2 == "string"){
        return -1;
    }
    //如果参数1为字符串，参数2为数字
    if(typeof param1 == "string" && typeof param2 == "number"){
        return 1;
    }
    //如果两个参数均为数字
    if(typeof param1 == "number" && typeof param2 == "number"){
        if(param1 > param2) {return 1;}
        if(param1 == param2) {return 0;}
        if(param1 < param2) {return -1;}
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
