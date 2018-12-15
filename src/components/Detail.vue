<template>
  <div class="index-frame">
    <div class="index">
      <div class="index-header">
        <span>借用详细信息</span>
      </div>
      <div class="index-body">
        <h4>物资信息</h4>
        <p>物资名称</p>
        <p>{{material.materialName}}</p>
        <p>所属单位</p>
        <p>{{material.materialOrganization}}</p>
        <h4>借用人信息</h4>
        <p>姓名</p>
        <p>{{material.borrowerName}}</p>
        <p>手机号</p>
        <p>{{material.borrowerNumber}}</p>
        <p>借用数目</p>
        <p>{{material.borrowNumber}}</p>
        <p>开始时间</p>
        <p>{{material.creatTime}}</p>
        <p>截至时间</p>
        <p>{{material.endTime}}</p>
        <h4>状态</h4>
        <p>{{material.status}}</p>
        <p></p>
      </div>
      <div class="index-body">
        <div class="index-footer">
          <div v-show="!agree">
        	  <h4>是否同意借用？</h4>
        	  <button class="submit" ng-click="agreeBorrow()">是</button>
        	  <button class="submit" ng-click="notBorrow()">否</button>
        	</div>
        	<div v-show="!isreturn">
        	  <h4>是否归还？</h4>
        	  <button class="submit" ng-click="back()">是</button>
        	</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      greenbutton: 'greenbutton',
      graybutton: 'graybutton',
      material:{},
			borrow:{},
			agree: true,
			isreturn: true,
    }
  },
  methods: {
    verification(verify_request) {
      this.$axios.get('http://yb.upc.edu.cn:8087/material/auth', {
        params: {
          vq: verify_request
        }
      }).then(rsp=>{
        console.log(rsp)
      })
    }
  },
  created () {
    var str = sessionStorage.getItem("borrowDetail");
    this.material = JSON.parse(str);
		console.log(this.material)
		if (this.material.isAgree != 1) {
			this.agree = false
		}
		if (this.material.return != true) {
			this.isreturn = false
		}
    var verify_request = sessionStorage.getItem("verify_request")
    var APPID = 'f87c99a7211f2a44'
    var CALLBACK = 'http://f.yiban.cn/iapp96401'
    if (verify_request == -1 || verify_request == '' || verify_request == null) {
      window.location.href = "https://openapi.yiban.cn/oauth/authorize?client_id=" + APPID + "&redirect_uri=" + CALLBACK + "&display=html"      
    } else {
      this.$axios.get('http://yb.upc.edu.cn:8087/material/isauth').then(rsp=>{
        console.log(rsp)
        if (rsp.data == 0) {
          this.$axios.get('http://yb.upc.edu.cn:8087/material/auth', {
            params: {
              vq: verify_request
            }
          })
        }
        this.$axios.get('http://yb.upc.edu.cn:8087/material').then(rsp=>{
          console.log(rsp.data)
          this.material = rsp.data
        })
      })
    }
  }
}
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

  .index-body {
    width: 100%;
    min-height: 9rem;
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .index-body h4 {
    width: 100%;
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-bottom: 0.3rem;
  }

  .index-body p {
    width: 100%;
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-bottom: 0.3rem;
  }

  .index-footer {
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: #ddd 1px solid;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    border-radius: 5px;
  }

  .index-footer p{
    margin-left: 5%;
    width: 90%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: 0.9rem
  }

  .index-footer h4 {
    margin-left: 5%;
    width: 90%;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
  }

	.submit {
	  width: 3.6rem;
	  height: 2.4rem;
	  margin-bottom: 1rem;
	  margin-left: 1rem;
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

    .index-footer {
      overflow-y: unset;
      min-height: 14rem;
    }
  }
</style>
