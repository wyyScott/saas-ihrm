<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
            <div class='organization-index'>
              <div class='organization-index-top'>
                <div class='main-top-title'>
                  <el-tabs v-model="activeName">
                    <el-tab-pane label="组织结构" name="first"></el-tab-pane>
                    <div class="el-tabs-report">
                      <a class="el-button el-button--primary el-button--mini" title="导出" >导入</a>
                      <a class="el-button el-button--primary el-button--mini" title="导出" >导出</a>
                    </div>
                  </el-tabs>
                </div>
              </div>
              <div style="overflow: scroll;white-space:nowrap"  class="treBox">
                <div class="treeCon clearfix">
                    <span>
                      <i class="fa fa-university" aria-hidden="true"></i>
                      <span><strong>{{departData.companyName}}</strong></span>
                    </span>
                    <div class="fr">
                      <span class="treeRinfo">
                        <div class="treeRinfo">
                          <span>{{departData.companyManage}}</span>
                          <span>在职  <em class="colGreen" title="在职人数">---</em>&nbsp;&nbsp;(<em class="colGreen" title="正式员工">---</em>&nbsp;/&nbsp;<em class="colRed" title="非正式员工">---</em>)</span>
                        </div>
                        <div class="treeRinfo">
                          <el-dropdown class="item">
                            <span class="el-dropdown-link">
                              操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                  <el-button type="text" @click="handleAdd('')">添加子部门</el-button>
                                </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button type="text" @click="handleList()">查看待分配员工</el-button>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </span>  
                    </div>
                  </div>

                  <!-- 
                    构造树形列表
                      叶子 <i class="fa fa-male"></i>
                      非叶子 
                        展开 <i class="fa fa-minus-square-o">
                        闭合 <i class="fa fa-plus-square-o">
                    <div class="generalClass" slot-scope="{node,data}" style="width:99%">
                  -->
                  <!-- 
                      node:是否展开，是否为叶子节点 
                      data:部门对象
                  -->
                <el-tree :props= "{label:'name'}" :data="departments" node-key="id" default-expand-all>
                  <div class="generalClass" slot-scope="{node,data}" style="width:99%">
                  <span>
                    <i v-if="node.isLeaf" class="fa fa-male"></i>
                    <i v-else :class="node.expanded?'fa fa-minus-square-o':'fa fa-plus-square-o'"></i>
                    <span>{{ node.label }}</span>
                  </span>
                  <div class="fr">
                      <span class="treeRinfo">
                        <div class="treeRinfo">
                          <span>{{data.manager}}</span>
                          <span>在职  <em class="colGreen" title="在职人数">---</em>&nbsp;&nbsp;(<em class="colGreen" title="正式员工">---</em>&nbsp;/&nbsp;<em class="colRed" title="非正式员工">---</em>)</span>
                        </div>
                        <div class="treeRinfo">
                          <el-dropdown class="item">
                            <span class="el-dropdown-link">
                              操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <el-button type="text" @click="handleAdd(data.id)">添加子部门</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button type="text" @click="handleUpdate(data.id,data.pid)">查看部门</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button type="text" @click="handleDelete(data.id)">删除部门</el-button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-button type="text" @click="handleList()">查看待分配员工</el-button>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </span>  
                    </div>
                  </div>
                </el-tree>
              </div>
            </div>    
      </el-card>
      <!-- 新增窗口 -->
      <el-dialog title="新增部门" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="department" label-width="120px">
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input v-model="department.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门编码" :label-width="formLabelWidth">
            <el-input v-model="department.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门经理" :label-width="formLabelWidth">
            <el-input v-model="department.manager" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门介绍" :label-width="formLabelWidth">
            <el-input v-model="department.introduce" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDept()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改窗口 -->
      <el-dialog title="新增部门" :visible.sync="dialogFormVisibleUpdate">
        <el-form :model="department" label-width="120px">
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input v-model="department.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门编码" :label-width="formLabelWidth">
            <el-input v-model="department.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门经理" :label-width="formLabelWidth">
            <el-input v-model="department.manager" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门介绍" :label-width="formLabelWidth">
            <el-input v-model="department.introduce" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateDept()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</div>
</template>
 
<!-- 引入组件 -->
<script>
import {list,add,queryById,update,deleteById} from "@/api/base/dept";
import commonApi from '@/utils/common'
export default {
  data() {
    return {
      activeName: 'first', 
      departData:{},
      departments:[],
      parentId:'',
      dialogFormVisibleAdd:false,
      dialogFormVisibleUpdate:false,
      department:{},
      formLabelWidth:'120px'
    }
  },
  methods: {
    //添加部门
    handleAdd(parentId){
      this.parentId = parentId;
      this.dialogFormVisibleAdd = true;
    },
    //查看并更新
    handleUpdate(id,pid){
      queryById({id:id}).then(res => {
        this.department = res.data.data;
        this.department.pid = pid;
      });
      this.dialogFormVisibleUpdate = true;
    },
    //删除部门
    handleDelete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById({id:id}).then(res => {
            this.$message({
              type: res.data.success?'success':'error',
              message: res.data.message
            });
            location.reload();
          }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

    addDept(){
      this.department.pid = this.parentId;
      add(this.department).then(res => {
        alert(res.data.message);
        if(res.data.success){
          location.reload();
        }
      
      })
    },
    updateDept(){
      update(this.department).then(res => {
        alert(res.data.message);
        if(res.data.success){
          location.reload();
        }
      })
    },

    getList(){
      list().then(res => {
        this.departData = res.data.data;
        this.departments = commonApi.transformTozTreeFormat(res.data.data.departments);
        //console.log(res.data.data.departments);
      })
    }
  },
  created: function() {
    this.getList();
  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.el-dropdown {
  color: #000000
}
.el-tree-node__content>.el-tree-node__expand-icon {
  padding:0px;
}
.el-tree-node__expand-icon {
  color:#ffffff
}
.generalClassNode {
  padding-left: 20px;
}
.el-tree-node__content{
  font-size: 16px;
  line-height: 36px;
  height:36px;
}
.custom-tree-node{
  padding-left: 20px;
}
.objectTree {
  overflow: auto;
  z-index: 100;
  width: 300px;
  border: 1px solid #dcdfe6;
  margin-top: 5px;
  left: 70px;
}
.el-tabs__content {
  overflow: initial;
}
.boxpad {
  margin-left: -40px;
}
</style>
<style  rel="stylesheet/scss" lang="scss" scoped>
.el-tree-node__expand-icon{
 
}
.el-icon-caret-right{}
.el-tree-node__content{
  font-size: 14px;
  line-height: 36px;
}
.generalClass {
  font-size: 14px;
  line-height: 36px;
  color:#000000
}
.all {
  position: relative;
  min-height: 100%;
  padding-bottom: 200px;
}
.organization-main:after,
.organization-index-top:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}
.organization-main {
  font-size: 14px;
  font-size: 14px;
}

.organization-index {
  padding-bottom: 20px;
  margin-left: 20px;
}
.main-top-title {
  padding-left: 20px;
  padding-top: 20px;
  text-align: left;
}

::-webkit-scrollbar-thumb {
  background-color: #018ee8;
  height: 50px;
  outline-offset: -2px;
  outline: 8px solid #fff;
  -webkit-border-radius: 4px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #fb4446;
  height: 50px;
  -webkit-border-radius: 4px;
}
.modal-total {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 90;
  opacity: 0.2;
}
.modal {
  width: 400px;
  height: 300px;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  left: 45%;
  top: 20%;
  text-align: center;
}
.treBox {
  padding: 30px 120px 0;
}
.organization-index-top {
  position: relative;

  .el-tabs-report {
    position: absolute;
    top: -50px;
    right: 15px;
  }
}
.treeCon {
  border-bottom: 1px solid #cfcfcf;
  padding: 10px 0;
  margin-bottom: 10px;
  .el-dropdown {
    color: #333;
  }
}
.treeRinfo {
  display: inline-block;
}
.treeRinfo span {
  padding-left: 30px;
}
</style>
