<template>
  <div class="top-to-bottom-stratify-demo-wrapper">

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
        container: '.top-to-bottom-stratify-demo-wrapper',
        containerWidth: 1200,
        renderDirection: 'topToBottom'
      })
    }
  }
}
</script>

<style scoped>
.top-to-bottom-stratify-demo-wrapper{}
</style>