<template>
  <div class="index-frame">
    <div class="index">
      <div class="index-header">
        <span>所有物资</span>
        <div>(PS：点击标题排序，默认按名称排序)</div>
        <div>搜索：</div>
        <input type="text" v-model="search">
      </div>
      <div class="index-body">
        <div class="index-table">
          <div class="table-header">
            <div class="materialname" @click="sortID(0)">名称</div>
            <div class="department" @click="sortID(10)">所属单位</div>
            <div class="detail" @click="sortID(20)">简介</div>
            <div class="number" @click="sortID(30)">可借</div>
            <div class="borrow">借用</div>
          </div>
          <div class="table-body">
            <div class="materialname table-column" v-if="materials.length > 0">
              <div v-for="material in materials" :key="material.num">{{material.name}}</div>
            </div>
            <div class="department table-column" v-if="materials.length > 0">
              <div v-for="material in materials" :key="material.num">{{material.organization}}</div>
            </div>
            <div class="detail table-column" v-if="materials.length > 0">
              <div v-for="material in materials" :key="material.num">{{material.description}}</div>
            </div>
            <div class="number table-column" v-if="materials.length > 0">
              <div v-for="material in materials" :key="material.num">{{material.number}}</div>
            </div>
            <div class="borrow table-column" v-if="materials.length > 0">
              <div v-for="material in materials" :key="material.num">
                <button
                  class="borrow-button"
                  :class="material.number > 0 ? greenbutton : graybutton"
                  @click="toOrderList(material)"
                >借用</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-body">
        <div class="index-footer">
          <h4>备注</h4>
          <p>欢迎您借用物资，为了让我们下次更好地服务于您，请您爱护物资，珍惜自己的信用评级，注意以下几点：</p>
          <p>一、 在取用物资时确认物资状态（物资种类、数量等），以免返还时有不必要的误会；</p>
          <p>二、 在使用过程中，爱护物资，如不慎损坏，请务必及时和易班人力行政部取得联系。</p>
          <p>会议室不能借用：周五晚九点以后，周六晚七点到十点，周日晚九点到十点。</p>
          <p>大厅不外借。</p>
          <p>人力行政: 例会周六9:10-10:00；</p>
          <p>技术开发: 培训是周日下午两点，例会没有固定时间（周六周日）；</p>
          <p>视觉设计: 培训两周一次周六晚上8点半到10点；</p>
          <p>网络运营 :每周情况定，不确定时间；</p>
          <p>信息采编 :例会是周日晚上九点开始，十点左右结束，培训是周四晚上九点到十点半左右；</p>
          <p>省平台:周六晚上7-9点；</p>
          <p>主席团:周五晚9:10。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      greenbutton: "greenbutton",
      graybutton: "graybutton",
      materials: [],
      materialsINFO: [],
      searchINFO: [],
      search: "",
      sortWay: 0
    };
  },
  methods: {
    verification(verify_request) {
      this.$axios
        .get("http://yb.upc.edu.cn:8087/material/auth", {
          params: {
            vq: verify_request
          }
        })
        .then(rsp => {
          console.log(rsp);
        });
    },
    toOrderList(material) {
      if (material.number > 0) {
        var str = JSON.stringify(material);
        sessionStorage.setItem("borrowMaterial", str);
        this.$router.push("/order");
      }
    },
    sortID (val) {
      if (parseInt(this.sortWay/10) != val/10 + 1) {
        this.sortWay = 11 + val
      } else {
        this.sortWay ++
        if (this.sortWay%10 == 3) {
          this.sortWay -= 2
        }
      }
      console.log(this.sortWay)
    }
  },
  created() {
    var verify_request = this.$GetQueryString("verify_request")
    var yb_uid = this.$GetQueryString("yb_uid")
    sessionStorage.setItem("verify_request", verify_request)
    var APPID = "f87c99a7211f2a44"
    var CALLBACK = "http://f.yiban.cn/iapp96401"
    if (
      verify_request == -1 ||
      verify_request == "" ||
      verify_request == null
    ) {
      window.location.href =
        "https://openapi.yiban.cn/oauth/authorize?client_id=" +
        APPID +
        "&redirect_uri=" +
        CALLBACK +
        "&display=html"
    } else {
      this.$axios.get("http://yb.upc.edu.cn:8087/material/isauth").then(rsp => {
        console.log(rsp)
        if (rsp.data == 0) {
          this.$axios.get("http://yb.upc.edu.cn:8087/material/auth", {
            params: {
              vq: verify_request
            }
          });
        }
        this.$axios.get("http://yb.upc.edu.cn:8087/material").then(rsp => {
          let _this = this
          this.materials = rsp.data
          this.materialsINFO = rsp.data
          this.searchINFO = rsp.data
          console.log(this.materialsINFO)
        })
      });
    }
  },
  watch: {
    search: {
      handler: function(val, oldval) {
        if (val != '') {
          let _this = this
          var materials = this.materialsINFO;
          this.materials = []
          this.searchINFO = []
          console.log(val)
          var i = 0
          Object.keys(materials).forEach(function(key) {
            let material = _this.materialsINFO[key]
            var str = JSON.stringify(material)
            console.log(str)
            console.log(str.indexOf(val))
            if (str.indexOf(val) != -1) {
              _this.materials[i] = material
              _this.searchINFO[i] = material
              i++
            }
          })
          console.log(this.searchINFO)
        } else if (val == '') {
          this.materials = this.materialsINFO
          this.searchINFO = this.materialsINFO
        }
      }
    },
    sortWay: {
      handler: function(val, oldval) {
        let sortName = ''
        if (parseInt(val/10) == 1) {
          sortName = 'name'
        } else if (parseInt(val/10) == 2) {
          sortName = 'organization'
        } else if (parseInt(val/10) == 3) {
          sortName = 'description'
        } else if (parseInt(val/10) == 4) {
          sortName = 'number'
        }
        if (val%10 == 1) {
          this.materials.sort(this.$ordercompare(sortName))
        } else if (val%10 == 2) {
          this.materials.sort(this.$compare(sortName))
        }
      }
    }
  }
};
</script>

<style scoped>
.index-frame {
  width: 100%;
  min-height: 10rem;
  padding-top: 0.5rem;
  border-top: #ddd 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.index {
  position: relative;
  top: 0;
  width: 45.2rem;
  margin-left: 2.5%;
  min-height: 9rem;
  border-top: 1px solid #e5e5e5;
  border: #ddd 1px solid;
  border-radius: 5px;
}

.index-header {
  position: relative;
  top: 0;
  width: 100%;
  height: 9rem;
  background: #f5f5f5;
  border-bottom: #ddd 1px solid;
  display: flex;
  flex-direction: column;
}

.index-header span {
  font-size: 1.4rem;
  margin-left: 2.5%;
  margin-top: 1.2rem;
}

.index-header div {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-left: 2.5%;
}

.index-header input {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-left: 2.5%;
  margin-bottom: 0.5rem;
  width: 50%;
}

.index-table {
  width: 95%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  height: 14rem;
  border: #ddd 1px solid;
  display: flex;
  flex-direction: column;
}

.table-header {
  height: 15%;
  width: 43rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.table-header div {
  border-right: #ddd 1px solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  text-indent: 10px;
}

.index-body {
  width: 100%;
  min-height: 9rem;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.materialname {
  width: 14%;
}

.department {
  width: 11%;
}

.detail {
  width: 55%;
}

.number {
  width: 8%;
}

.borrow {
  width: 12%;
}

.table-body {
  height: 85%;
  background: #f5f5f5;
  width: 43rem;
  display: flex;
  flex-direction: row;
}

.table-column {
  height: 100%;
  border-right: #ddd 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}

.table-column div {
  height: 25%;
  width: 100%;
  font-size: 0.9rem;
  font-weight: normal;
  text-indent: 10px;
  border-top: #ddd 1px solid;
  border-bottom: #ddd 1px solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.index-footer {
  width: 95%;
  margin-bottom: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: #ddd 1px solid;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 5px;
}

.index-footer p {
  margin-left: 5%;
  width: 90%;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.index-footer h4 {
  margin-left: 5%;
  width: 90%;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
}

.borrow div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.borrow-button {
  height: 70%;
  width: 80%;
  font-size: 0.9rem;
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  color: white;
}

.greenbutton {
  background: #5cb85c;
  border: 1px solid #4cae4c;
}

.greenbutton:active {
  background: #398439;
}

.graybutton {
  background: #909399;
  border: 1px solid #646468;
}

.graybutton:active {
  background: #82848a;
}

@media screen and (max-width: 767px) {
  .index-frame {
    padding-top: 0.3rem;
  }

  .index {
    width: 95%;
    margin: 0;
  }

  .index-table {
    overflow-x: scroll;
  }

  .index-footer {
    overflow-y: unset;
    min-height: 14rem;
  }
}
</style>
