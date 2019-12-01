<template>
  <div class="stratify-demo-wrapper">

  </div>
</template>

<script>
import simpleTreeLayout from './simpleTreeLayout.js'
import { get } from '../api/index.js'
export default {
  name: "stratify-demo",
  data() {
    return {
      treeData: []
    }
  },
  mounted(){
    this.fetchData().then(() => {
      this.draw()
    })
  },
  methods: {
    fetchData() {
      return get('/mock/stratifyTreeData.json').then((res) => {
        this.treeData = res.data
      })
    },
    draw() {
      simpleTreeLayout({
        treeData: this.treeData,
        dataType: 'simple',
        container: '.stratify-demo-wrapper',
        containerWidth: 1000,
      })
    }
  }
}
</script>

<style scoped>
.stratify-demo-wrapper{}
</style>