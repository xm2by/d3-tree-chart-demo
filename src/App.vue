<template>
  <div id="app">
    <div class="demo-item">
      <div class="demo-item-title">嵌套数据结构：</div>
      <hierarchy-demo></hierarchy-demo>
    </div>
    <div class="demo-item">
      <div class="demo-item-title">简单数据结构：</div>
      <stratify-demo></stratify-demo>
    </div>
    <div class="demo-item">
      <div class="demo-item-title">从上到下渲染：</div>
      <top-to-bottom-stratify-demo></top-to-bottom-stratify-demo>
    </div>
    <div class="demo-item">
      <div class="demo-item-title">从右到左渲染：</div>
      <right-to-left-stratify-demo></right-to-left-stratify-demo>
    </div>
    <div class="demo-item">
      <div class="demo-item-title">从下到上渲染：</div>
      <bottom-to-top-stratify-Demo></bottom-to-top-stratify-Demo>
    </div>
    <div class="demo-item">
      <div class="demo-item-title">从左到右渲染：</div>
      <left-to-right-stratify-demo></left-to-right-stratify-demo>
    </div>
  </div>
</template>

<script>
import HierarchyDemo from './components/HierarchyDemo.vue'
import StratifyDemo from './components/StratifyDemo.vue'
import TopToBottomStratifyDemo from './components/TopToBottomStratifyDemo.vue'
import RightToLeftStratifyDemo from './components/RightToLeftStratifyDemo.vue'
import BottomToTopStratifyDemo from './components/BottomToTopStratifyDemo.vue'
import LeftToRightStratifyDemo from './components/LeftToRightStratifyDemo.vue'

export default {
  name: 'app',
  components: {
    HierarchyDemo,
    StratifyDemo,
    TopToBottomStratifyDemo,
    RightToLeftStratifyDemo,
    BottomToTopStratifyDemo,
    LeftToRightStratifyDemo
  },
}
</script>

<style>
.demo-item{
  padding: 8px;
  margin-bottom: 32px;
  border: 1px solid #e91e63;
}
.demo-item-title{
  margin-bottom: 16px;
  line-height: 24px;
}
</style>