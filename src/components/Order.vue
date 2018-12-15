<template>
  <div class="index-frame">
    <div class="index">
      <div class="index-header">
        <span>请核对信息</span>
      </div>
      <div class="index-body">
        <div class="index-table">
          <div class="table-header">
            <div class="materialname">名称</div>
            <div class="department">所属单位</div>
            <div class="detail">简介</div>
          </div>
          <div class="table-body">
            <div class="materialname table-column">
              <div>{{material.name}}</div>
            </div>
            <div class="department table-column">
              <div>{{material.organization}}</div>
            </div>
            <div class="detail table-column">
              <div>{{material.description}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-footer">
        <div class="form-group">
          <label>借用人姓名</label>
          <input type="text" placeholder="姓名" v-model="borrowerName">
        </div>
        <div class="form-group">
          <label>借用人手机</label>
          <input type="text" placeholder="手机号" v-model="borrowerNumber">
        </div>
        <div class="form-group">
          <label>借用数目 **注意可借数目</label>
          <input type="number" placeholder="请填整数" v-model="borrowNumber">
        </div>
        <div class="form-group">
          <label>借用原因</label>
          <input type="text" v-model="reason">
        </div>
        <div class="form-group">
          <label>开始时间 格式：2014-04-23 18:55</label>
          <input type="text" v-model="startTime">
        </div>
        <div class="form-group">
          <label>截至时间 格式：2014-04-23 18:55</label>
          <input type="text" v-model="endTime">
        </div>
        <button class="submit" @click="submit">
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      greenbutton: "greenbutton",
      graybutton: "graybutton",
      material: {},
      number: '',
      borrowerName: '',
      borrowerNumber: '',
      reason: '',
      orderId: '',
      borrowNumber: '',
      endTime: '',
      startTime: '',
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
    submit () {
      var _this = this
      this.endTime = String(this.endTime).replace(/^([\d\s\W]+)：(\d+)$/g,"$1:$2");
      this.startTime = String(this.startTime).replace(/^([\d\s\W]+)：(\d+)$/g,"$1:$2");
      if(Date.parse(this.endTime)<Date.parse(this.startTime)){
        alert("时间出问题了");
      }else if(this.borrowNumber>this.number){
        alert("可借数目出错");
        alert("余量不足");
      }else {
        var phone = /^1[34578]\d{9}$/;
        if ((!phone.test(this.borrowerNumber))) {
          alert('手机号格式错误');
        } else {
          //发送数据
          this.$axios.get('http://yb.upc.edu.cn:8087/material/creat', {
            params: {
              borrowerName: this.borrowerName,
              borrowerNumber: this.borrowerNumber,
              reason: this.reason,
              materialId: this.orderId,
              borrowNumber: this.borrowNumber,
              startTime: Date.parse(this.startTime),
              endTime: Date.parse(this.endTime)
            }
          }).then(function (response) {
            if (response.data.code == 1) {
              alert("提交成功，等待审核");
              _this.$router.push('/')
            } else {
              alert("未知错误");
            }
          });
        }
      }
    }
  },
  created() {
    var str = sessionStorage.getItem("borrowMaterial");
    console.log(str);
    this.material = JSON.parse(str);
    this.orderId = this.material.id;
    this.number = this.material.number;
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
  height: 4rem;
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
  height: 5rem;
  border: #ddd 1px solid;
  display: flex;
  flex-direction: column;
}

.table-header {
  height: 45%;
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
  min-height: 6rem;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.materialname {
  width: 15%;
}

.department {
  width: 20%;
}

.detail {
  width: 65%;
}

.table-body {
  height: 55%;
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
  height: 100%;
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

.borrow-button {
  height: 70%;
  width: 80%;
  font-size: 0.9rem;
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  color: white;
}

.index-footer {
  min-height: 6rem;
  width: 95%;
  margin-left: 2.5%;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group label {
  font-weight: bold;
}

.form-group input {
  margin-bottom: 1rem;
  margin-top: 1rem;
  height: 1rem;
  font-size: 1rem;
  padding: 0.6rem 0.6rem;
  border-radius: 5px;
  border: 1px #ccc solid;
  outline: none;
}

.submit {
  width: 5.6rem;
  height: 2.4rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  background: #fff;
  border: #adadad 1px solid;
  border-radius: 5px;
  outline: none;
}

.submit:active {
  background: #e6e6e6;
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
}
</style>
