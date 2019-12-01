<template>
  <div class="hierarchy-demo-wrapper">
    
  </div>
</template>

<script>
import simpleTreeLayout from './simpleTreeLayout.js'
import { get } from '../api/index.js'
export default {
  name: 'hierarchy-demo',
  props: {
  },
  data() {
    return {
      treeData: {},
    }
  },
  created() {
  },
  mounted(){
    this.fetchData().then(() => {
      this.draw()
    })
  },
  methods: {
    fetchData() {
      return get('/mock/hierarchyTreeData.json').then((res) => {
        this.treeData = res.data
      })
    },
    draw(){
      simpleTreeLayout({
        treeData: this.treeData,
        container: '.hierarchy-demo-wrapper',
        containerWidth: 1000,
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>