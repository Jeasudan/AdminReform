<template>
  <div class="preTree">
    <div class="block">
      <!-- <p>使用 render-content</p> -->
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
        :filter-node-method="filterNode"
        @check-change="handleCheckChange"
        @check="handleCheck"
      >
      </el-tree>
    </div>
    <!-- 组织名称弹窗 -->
    <el-dialog title="请输入组织名称" :visible.sync="dialogVisible" width="30%">
      <input
        v-model="name"
        placeholder=""
        style="width:100%;height:30px;outline:none;border:1px soild #ccc"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "preTree",
  data() {
    return {
      dialogVisible: false, // 弹窗显隐
      filterText: "", // 过滤树
      name: "", // 结构名称
      id: 100,
      nodes: {}, //
      data: {}, // 当前点击的节点
      treeData: [
        {
          id: "1",
          label: "一级 1",
          children: [
            {
              id: "1-1",
              label: "二级 1-1",
              children: [
                {
                  id: "1-1-1",
                  label: "三级 1-1-1"
                },
                {
                  id: "1-1-2",
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          label: "一级 2",
          children: [
            {
              id: "2-1",
              label: "二级 2-1"
            },
            {
              id: "2-2",
              label: "二级 2-2"
            }
          ]
        },
        {
          id: "3",
          label: "一级 3",
          children: [
            {
              id: "3-1",
              label: "二级 3-1"
            },
            {
              id: "3-2",
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    remove(node, data) {
      console.log("这是删除方法", node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span>{node.label}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span style="width:100%">
                  <el-button
                    style="width:100%"
                    type="text"
                    size="mini"
                    on-click={() => this.appendModal(data)}
                  >
                    新增结构
                  </el-button>
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span style="width:100%">
                  <el-button
                    style="width:100%"
                    type="text"
                    size="mini"
                    on-click={() => this.remove(node, data)}
                  >
                    删除
                  </el-button>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      );
    },
    handleCheckChange() {
      // console.log(
      //   'data, isSelfChecked, isChildrenChecked',
      //   data,
      //   isSelfChecked,
      //   isChildrenChecked
      // )
    },
    handleCheck(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      console.log(
        "checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys",
        checkedNodes, //当前操作的节点
        checkedKeys, // 选中的的节点数据
        halfCheckedNodes,
        halfCheckedKeys
      );
      console.log(checkedKeys);
    },
    // 点击append 时候触发，后面打开弹窗，输入名字
    appendModal(data) {
      this.dialogVisible = true; // 打开弹窗
      this.data = data; // 将当前点击的节点数据保存起来
    },
    // 弹窗确定按钮
    saveName() {
      this.dialogVisible = false; // 关闭弹窗
      console.log("val", this.name); // 获取输入的名字
      console.log("this.data", this.data);
      // 给当前节点数据添加子节点
      const newChild = { id: this.id++, label: `${this.name}`, children: [] };
      if (!this.data.children) {
        //如果当前节点没有子节点
        this.$set(this.data, "children", []); //就添加一个children 属性，再把数据放进去
      }
      this.data.children.push(newChild); // 如果有children属性就把创建的子节点push进去
      this.name = ""; // 将输入框置空
    }
  }
};
</script>
<style scoped lang="less">
.preTree {
  width: 50%;
  padding: 15px;
  // .custom-tree-node {
  //   flex: 1;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   font-size: 14px;
  //   padding-right: 8px;
  // }
}
</style>
