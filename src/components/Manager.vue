<template>
  <div class="index-frame">
    <div class="index">
      <div class="index-header">
        <span>所有物资</span>
        <div>搜索：</div>
        <input type="text">
      </div>
      <div class="index-body">
        <div class="index-table">
          <div class="table-header">
            <div class="materialname">名称</div><div class="department">所属单位</div><div class="detail">简介</div><div class="number">可借</div><div class="borrow">删除</div>
          </div>
          <div class="table-body">
            <div class="materialname table-column">
              <div v-for='material in materials' :key="material.num">
                {{material.name}}
              </div>
            </div>
            <div class="department table-column">
              <div v-for='material in materials' :key="material.num">
                {{material.organization}}
              </div>
            </div>
            <div class="detail table-column">
              <div v-for='material in materials' :key="material.num">
                {{material.description}}
              </div>
            </div>
            <div class="number table-column">
              <div v-for='material in materials' :key="material.num">
                {{material.number}}
              </div>
            </div>
            <div class="borrow table-column">
              <div v-for='material in materials' :key="material.num">
                <button class="borrow-button graybutton" @click="deleteMaterial(material)">
                  删除
                </button>
              </div>
            </div>
          </div>
          <button class="borrow-button greenbutton" @click="showlist">
            新建
          </button>
        </div>
      </div>
      <div class="index-list" v-show="isAdding">
        <div class="form-group">
          <label>物资名称</label>
          <input type="text" placeholder="物资名称" v-model="newName">
        </div>
        <div class="form-group">
          <label>物资所属单位</label>
          <input type="text" placeholder="物资所属单位" v-model="newOrganization">
        </div>
        <div class="form-group">
          <label>物资描述</label>
          <input type="text" placeholder="物资描述" v-model="newDescription">
        </div>
        <div class="form-group">
          <label>物资总数</label>
          <input type="text" v-model="newTotalNumber">
					<label>注意：物资总数过长会产生错误</label>
        </div>
        <button class="submit" @click="newSubmit">
          提交
        </button>
      </div>
      <div class="index-body">
        <div class="index-footer">
          <h4>备注</h4>
          <p>这是备注</p>
        </div>
      </div>
    </div>
		<div class="index">
      <div class="index-header">
        <span>所有物资</span>
        <div>(PS：按归还时间排序,未做分页处理请及时删除无用数据)</div>
        <div>搜索：</div>
        <input type="text">
      </div>
      <div class="index-body">
        <div class="index-table1">
          <div class="table-header1">
						<div class="materialname1">名称</div>
            <div class="department1">所属单位</div>
            <div class="start-time1">开始时间</div>
            <div class="end-time1">结束时间</div>
            <div class="status1">状态</div>
            <div class="detail1">详情</div>
          </div>
          <div class="table-body1">
            <div class="materialname1 table-column1">
              <div v-for='material in borrowMaterials' :key="material.num">
                {{material.materialName}}
              </div>
            </div>
            <div class="department1 table-column1">
              <div v-for='material in borrowMaterials' :key="material.num">
                {{material.materialOrganization}}
              </div>
            </div>
            <div class="start-time1 table-column1">
              <div v-for='material in borrowMaterials' :key="material.num">
                {{material.startTime}}
              </div>
            </div>
            <div class="end-time1 table-column1">
              <div v-for='material in borrowMaterials' :key="material.num">
                {{material.endTime}}
              </div>
            </div>
            <div class="status1 table-column1">
              <div v-for='material in borrowMaterials' :key="material.num">
                {{material.status}}
              </div>
            </div>
						<div class="detail1 table-column1">
              <div v-for='material in borrowMaterials' :key="material.num" style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
                <button class="submit" @click="toDetail(material)" style="width:4rem;height:2rem;margin:0">
                  详情
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'manager',
  data () {
    return {
      greenbutton: 'greenbutton',
			graybutton: 'graybutton',
			isAdding: false,
			materials:[],
			borrowMaterials: [],
			newName: '',
			newOrganization: '',
			newDescription: '',
			newTotalNumber: '',
			sortways: 1
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
    },
		showlist () {
			this.isAdding = !this.isAdding
		},
		newSubmit () {
			let _this = this
			this.$axios.get('http://yb.upc.edu.cn:8087/material/official/creat', {
				params: {
					name: this.newName,
					organization: this.newOrganization,
					description: this.newDescription,
					totalnumber: this.newTotalNumber,
				}
			}).then(function (response) {
        if(response.data.code ==1){
          alert("创建成功");
          _this.$router.push('/')
        }else{
          alert('未知错误');
        }
      })
		},
		deleteMaterial (meterial) {
			let _this = this
			this.$axios.get('http://yb.upc.edu.cn:8087/material/official/delete?', {
				params: {
					materialId: meterial.id
				}
			}).then(function (response) {
        if(response.data.code == 1){
          alert("删除成功");
          _this.$router.push('/');
        }else{
          alert('删除失败');
        }
      })
		},
		toDetail (material) {
			var str = JSON.stringify(material)
			sessionStorage.setItem('borrowDetail', str)
			this.$router.push('/detail');
		}
  },
  created () {
		let _this = this
		var verify_request = sessionStorage.getItem("verify_request")
		console.log(verify_request)
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
          this.materials = rsp.data
        })
				this.$axios.get('http://yb.upc.edu.cn:8087/material/auth', {
          params: {
            vq: verify_request
          }
        })
        this.$axios.get('http://yb.upc.edu.cn:8087/material/official').then(response=>{
					console.log(response.data)
					this.borrowMaterials = response.data
					for (var i = 0; i < response.data.length; i++) {
            this.borrowMaterials[i].startTime = _this.$timetrans(response.data[i].startTime)
            this.borrowMaterials[i].endTime = _this.$timetrans(response.data[i].endTime)
            if (response.data[i].isAgree == 0) {
              this.borrowMaterials[i].status = "申请中";
            } else if (response.data[i].isAgree == -1) {
              this.borrowMaterials[i].status = "申请失败";
            } else {
              this.borrowMaterials[i].status = "借出中";
            }
            if (response.data[i].return) {
              this.borrowMaterials[i].status = "已归还";
            }
					}
					this.borrowMaterials.sort(this.$compare('endTime'))
					console.log(this.borrowMaterials)
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .index {
    position: relative;
    top: 0;
    width: 45.2rem;
		margin-top: 1rem;
    margin-left: 2.5%;
    min-height: 11rem;
    border-top: 1px solid #e5e5e5;
    border: #ddd 1px solid;
    border-radius: 5px;
  }

  .index-header {
    position: relative;
    top: 0;
    width: 100%;
    height: 11rem;
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

	.index-table1 {
    width: 95%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    min-height: 14rem;
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

	.table-header1 {
    min-height: 2rem;
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
    text-indent:10px;
  }

	.table-header1 div {
    border-right: #ddd 1px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;
    text-indent:10px;
  }
  
  .index-body {
    width: 100%;
    min-height: 11rem;
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

	.table-body1 {
    min-height: 85rem;
    background: #f5f5f5;
    width: 43rem;
    display: flex;
    flex-direction: row;
  }

  .table-column {
    height: 100%;;
    border-right: #ddd 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
  }

	.table-column1{
    height: 100%;;
    border-right: #ddd 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
  }

  .table-column div{
    height: 25%;
    width: 100%;
    font-size: 0.9rem;
    font-weight: normal;
    text-indent:10px;
    border-top: #ddd 1px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

	.table-column1 div{
    height: 2.5rem;
    width: 100%;
    font-size: 0.9rem;
    font-weight: normal;
    text-indent:10px;
    border-top: #ddd 1px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

	.materialname1 {
	  width: 15%;
	}

	.department1 {
	  width: 15%;
	}

	.start-time1 {
	  width: 25%;
	}

	.end-time1 {
	  width: 25%;
	}

	.status1 {
	  width: 12.5%;
	}

	.detail1 {
		width: 12.5%;
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

  .borrow div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .borrow-button {
    height: 1.6rem;
    width: 3.6rem;
    font-size: 0.9rem;
    outline: none;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    color: white;
  }

  .greenbutton {
    background: #5cb85c;
    border: 1px solid #4cae4c;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
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

  .index-list {
	  min-height: 6rem;
	  width: 95%;
	  margin-left: 2.5%;
		display: flex;
	  flex-direction: column;
	  justify-content: center;
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

		.index-table1 {
      overflow-x: scroll;
    }

    .index-footer {
      overflow-y: unset;
      min-height: 4rem;
    }
  }
</style>
