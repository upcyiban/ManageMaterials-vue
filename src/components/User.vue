<template>
  <div class="index-frame">
    <div class="index">
      <div class="index-header">
        <span>所有物资</span>
        <div>(PS：默认按结束时间排序)</div>
        <div>搜索：</div>
        <input type="text">
      </div>
      <div class="index-body">
        <div class="index-table">
          <div class="table-header">
            <div class="materialname">名称</div>
            <div class="department">所属单位</div>
            <div class="start-time">开始时间</div>
            <div class="end-time">结束时间</div>
            <div class="status">状态</div>
          </div>
          <div class="table-body">
            <div class="materialname table-column">
              <div v-for="material in materials" :key="material.num">{{material.materialName}}</div>
            </div>
            <div class="department table-column">
              <div
                v-for="material in materials"
                :key="material.num"
              >{{material.materialOrganization}}</div>
            </div>
            <div class="start-time table-column">
              <div v-for="material in materials" :key="material.num">{{material.startTime}}</div>
            </div>
            <div class="end-time table-column">
              <div v-for="material in materials" :key="material.num">{{material.endTime}}</div>
            </div>
            <div class="status table-column">
              <div v-for="material in materials" :key="material.num">{{material.status}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-body">
        <div class="index-footer">
          <h4>备注</h4>
          <p>物品归还后，请告知管理员确认归还</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      greenbutton: "greenbutton",
      graybutton: "graybutton",
      materials: []
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
    }
  },
  created() {
    var verify_request = sessionStorage.getItem("verify_request")
    var APPID = "f87c99a7211f2a44";
    var CALLBACK = "http://f.yiban.cn/iapp96401";
    if (verify_request === -1) {
      window.location.href =
        "https://openapi.yiban.cn/oauth/authorize?client_id=" +
        APPID +
        "&redirect_uri=" +
        CALLBACK +
        "&display=html";
    } else {
      this.$axios.get("http://yb.upc.edu.cn:8087/material/isauth").then(rsp => {
        console.log(rsp);
        if (rsp.data == 0) {
          this.$axios.get("http://yb.upc.edu.cn:8087/material/auth", {
            params: {
              vq: verify_request
            }
          });
        }
        this.$axios
          .get("http://yb.upc.edu.cn:8087/material/borrower")
          .then(response => {
            console.log(response.data);
            this.materials = response.data;
            for (var i = 0; i < response.data.length; i++) {
              this.materials[i].startTime = this.$timetrans(response.data[i].startTime)
              this.materials[i].endTime = this.$timetrans(response.data[i].endTime)
              if (response.data[i].isAgree == 0) {
                this.materials[i].status = "申请中";
              } else if (response.data[i].isAgree == -1) {
                this.materials[i].status = "申请失败";
              } else {
                this.materials[i].status = "借出中";
              }
              if (response.data[i].return) {
                this.materials[i].status = "已归还";
              }
            }
            this.materials.sort(this.$compare('endTime'))
          });
      });
    }
  }
};
</script>

<style scoped>
.index-frame {
  width: 100%;
  min-height: 10rem;
  padding-top: 2rem;
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
  height: 18%;
  width: 43rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.table-header div {
  border-right: #ddd 1px solid;
  border-bottom: #ddd 1px solid;
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
  width: 16%;
}

.department {
  width: 20%;
}

.start-time {
  width: 24%;
}

.end-time {
  width: 25%;
}

.status {
  width: 15%;
}

.table-body {
  height: 82%;
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
  border-bottom: #ddd 1px solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.index-footer {
  width: 95%;
  margin-top: 0.5rem;
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
