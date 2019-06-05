<<template>
    <div>
            <div class="info"  v-if="this.user.code=='1'">
      <div class="photo">
        <img :src="this.info.picture">
      </div>
      <div class="theText">
        <div>姓名:{{this.info.name}}</div>
        <div v-if="this.info.sex==0">性别:男</div>
        <div v-if="this.info.sex==1">性别:女</div>
        <div>地址:{{this.info.address}}</div>
        <div>电话:{{this.info.phone}}</div>
        <div>状态:{{this.info.statusName}}</div>
      </div>
    </div>
          <div class="info"  v-if="this.user.code=='0'">

      <div class="theTexts">
        <div>名称:{{this.info.customerName}}</div>
        <div>地址:{{this.info.address}}</div>
        <div>电话:{{this.info.telephone}}</div>
        <div>密码:{{this.info.customerPassword}}</div>
      </div>
    </div>
       <div class="button">
      <el-button @click="mibileBtn()">修改</el-button>
      <el-button @click="exit()">返回</el-button>
    </div>
        <el-dialog title="修改个人信息" :visible.sync="mobyleVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="updateDta">
        <el-form-item label="名称:">
          <el-input v-model="updateDta.name"></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input v-model="updateDta.code" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="updateDta.password"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <!-- <el-input v-model="updateDta.sex"> -->
          <el-select v-model="updateDta.sex">
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="updateDta.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="updateDta.statusName"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="updateDta.address"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <el-upload
            action
            :on-exceed="exceed"
            :auto-upload="false"
            :limit="1"
            :on-change="trus"
          >

            <el-button size="small" type="primary">点击上传头像</el-button>
         
          </el-upload>
                       <div class="headerImg">
              <img :src="updateDta.picture" alt>
            </div>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updateBtn">提交</el-button>
      </el-row>
    </el-dialog>

      <el-dialog title="修改个人信息" :visible.sync="mobyleUserAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="updateDta">
        <el-form-item label="名称:">
          <el-input v-model="updateDta.customerName"></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input v-model="updateDta.customerCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="updateDta.customerPassword"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="updateDta.telephone"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="updateDta.address"></el-input>
        </el-form-item>
     
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updateBtn">提交</el-button>
      </el-row>
    </el-dialog>
    </div>
</template>>
<<script>
import axios from "../api/axios.js";
import { employeeViewCode,loginUpload,employeeUpdate,custormerView,custormerUpdate } from "../api/address.js";
export default {
   data() {
       return {
         user:{},
           info:{},
           mobyleVisibleAdd:false,
           mobyleUserAdd:false,
           updateDta:{}
       }
   },
   created() {
     this.user =JSON.parse(sessionStorage.getItem('user'));
       if(this.user.code=="1"){
console.log("员工")
    axios.get(employeeViewCode+"?code="+this.user.userCode).then(data=>{
        console.log(data)
        this.info = data.data
    })
       }else if(this.user.code=="0"){
         axios.get(custormerView+"?code="+this.user.userCode).then(data=>{
           console.log("客户",data)
           this.info = data.data
         })
       }
   },
  
   methods: {
         exit(){
               this.$router.go(-1);
         },
              exceed: function() {
      this.$message("上传图片个数超出限制，请删除重新选择");
    },
    trus: async function(file) {
      let form = new FormData();
      form.append("file", file.raw);
      console.log(form);
      axios.post(loginUpload, form).then(data => {
        this.updateDta.picture = data;
        console.log(data, "lkjdafl ");
      });
      console.log("上传");
      console.log(file);
      // let a = await this.getBase64(file.raw);

      // console.log(this.form.brandLogo);
    },
         //修改弹窗
             mibileBtn() {
          if(this.user.code=="1"){
      this.mobyleVisibleAdd = true;
          axios.get(employeeViewCode+"?code="+this.user.userCode).then(data=>{
        console.log(data)
        this.updateDta = data.data
    })
          }else if(this.user.code=="0"){
this.mobyleUserAdd = true;
       axios.get(custormerView+"?code="+this.user.userCode).then(data=>{
           console.log("客户",data)
           this.updateDta = data.data
         })
          }
    },
    updateBtn(){
        if(this.user.code=="1"){
      axios.post(employeeUpdate,this.updateDta).then(data=>{
        if(data.code=="0"){
        this.$message.success("修改成功!");
         this.mobyleVisibleAdd = false;
            axios.get(employeeViewCode+"?code="+this.user.userCode).then(data=>{
        console.log(data)
        this.info = data.data
    })
        }
      })
        }else if(this.user.code=="0"){
      axios.post(custormerUpdate,this.updateDta).then(data=>{
        if(data.code=="0"){
        this.$message.success("修改成功!");
         this.mobyleUserAdd = false;
       axios.get(custormerView+"?code="+this.user.userCode).then(data=>{
           console.log("客户",data)
           this.info = data.data
         })
        }
      })
        }
    }
   },
}
</script>>
<style  lang="less" scoped>
.info {
  display: flex;
  width: 60%;
  margin: 0 auto;
  .theText {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    //   border: 1px solid black;
    margin-left: 50px;
  }
  .photo {
    //   border: 1px solid black;
    img {
      width: 250px;
      height: 300px;
    }
  }
}
.theTexts{
      height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    //   border: 1px solid black;
    margin: 0 auto;
}
.button {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.headerImg {
  display: inline-block;
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
.dialoBtnBox {
  text-align: center;
}
</style>
