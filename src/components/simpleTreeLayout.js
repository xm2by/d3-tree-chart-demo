import * as d3 from 'd3'
export default function simpleTreeLayout({ treeData, dataType, container, containerWidth, renderDirection = 'leftToRight' }) {
  let tree = data => {
    let root
    if (dataType === 'simple') {
      root = d3.stratify().id((d) => d.id).parentId(d => d.parentId)(data);
    } else {
      root = d3.hierarchy(data);
    }
    if (renderDirection === 'leftToRight' || renderDirection === 'rightToLeft') {
      root.x = 100;
      root.y = 32;
      root.dx = 40; // 垂直方向上节点之间的间距
      root.dy = containerWidth / (root.height + 1); // 水平方向上节点之间的间距， root.height表示树的层级
    } else {
      root.x = 100;
      root.y = 32;
      root.dx = 200; // 垂直方向上节点之间的间距
      root.dy = 120; // 水平方向上节点之间的间距， root.height表示树的层级
    }
    return d3.tree().nodeSize([root.dx, root.dy])(root);
  }
  const root = tree(treeData);
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });
  const svg = d3.select(container).append('svg')
    .attr("width", containerWidth)
    .attr("viewBox", viewBoxHeight);

  function viewBoxHeight() {
    switch (renderDirection) {
      case 'leftToRight':
        return [0, 0, containerWidth, x1 - x0 + root.dx * 2]
      case 'rightToLeft':
        return [0, 0, containerWidth, x1 - x0 + root.dx * 2]
      case 'topToBottom':
        return [0, 0, containerWidth, x1 - x0 + root.dy * 2]
      case 'bottomToTop':
        return [0, 0, containerWidth, x1 - x0 + root.dy * 2]
      default:
        return [0, 0, containerWidth, x1 - x0 + root.dx * 2]
    }
  }

  const g = svg.append("g")
    .attr("font-family", "Microsoft YaHei")
    .attr("font-size", 10)
    .attr("transform", gTransform);

  // 分组渲染方向
  function gTransform() {
    switch (renderDirection) {
      case 'leftToRight':
        return `translate(${root.dy / 2},${root.dx - x0})`
      case 'rightToLeft':
        return `translate(${root.dy * (root.height + 0.5)},${root.dx - x0})`
      case 'topToBottom':
        return `translate(${root.dx * 3},${root.dx})`
      case 'bottomToTop':
        return `translate(${root.dx * 3},${root.dx - x0})`
      default:
        return `translate(${root.dy / 2},${root.dx - x0})`
    }
  }

  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#CCCCCC")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr("d", (renderDirection === 'leftToRight' || renderDirection === 'rightToLeft') ? d3.linkHorizontal().x(lineXTransform).y(lineYTransform) : d3.linkVertical().x(lineXTransform).y(lineYTransform));

  // 连线渲染方向
  function lineXTransform(d) {
    switch (renderDirection) {
      case 'leftToRight':
        return d.y
      case 'rightToLeft':
        return -d.y
      case 'topToBottom':
        return d.x
      case 'bottomToTop':
        return d.x
      default:
        return d.y
    }
  }
  function lineYTransform(d) {
    switch (renderDirection) {
      case 'leftToRight':
        return d.x
      case 'rightToLeft':
        return d.x
      case 'topToBottom':
        return d.y
      case 'bottomToTop':
        return -d.y
      default:
        return d.x
    }
  }

  const node = g.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", nodeTransform);

  // 数据渲染方向
  function nodeTransform(d) {
    switch (renderDirection) {
      case 'leftToRight':
        return `translate(${d.y},${d.x})`
      case 'rightToLeft':
        return `translate(${-d.y},${d.x})`
      case 'topToBottom':
        return `translate(${d.x},${d.y})`
      case 'bottomToTop':
        return `translate(${d.x},${-d.y})`
      default:
        return `translate(${d.y},${d.x})`
    }
  }

  node.append("rect")
    .attr("x", -84)
    .attr("y", -16)
    .attr("width", 168)
    .attr("height", 32)
    .attr("stroke", "#D5DFFF")
    .attr("stroke-width", 1)
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("fill", "#f3f5ff")

  node.append("a")
    .attr("xlink:href", "https://www.baidu.com")
    .attr("target", "new")
    .append("foreignObject")
    .attr("x", -84)
    .attr("y", -16)
    .attr("width", 80)
    .attr("height", 32)
    .append("xhtml:div")
    .text(d => d.data.name)
    .attr("title", d => d.data.name)
    .style("box-sizing", "border-box")
    .style("width", "100%")
    .style("padding", "0 8px")
    .style("line-height", "32px")
    .style("overflow", "hidden")
    .style("text-overflow", "ellipsis")
    .style("white-space", "nowrap")

  const childGroup = node.append("g")

  childGroup.append("rect")
    .attr("x", -4)
    .attr("y", -12)
    .attr("width", 80)
    .attr("height", 24)
    .attr("stroke", "#D5DFFF")
    .attr("stroke-width", 1)
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("fill", "rgba(0,0,0,0.05)")

  childGroup.append("a")
    .attr("xlink:href", "https://www.baidu.com")
    .attr("target", "new")
    .append("foreignObject")
    .attr("x", -4)
    .attr("y", -12)
    .attr("width", '80')
    .attr("height", '24')
    .append("xhtml:div")
    .text(d => d.data.id)
    .attr("title", d => d.data.id)
    .style("box-sizing", "border-box")
    .style("width", "100%")
    .style("padding", "0 8px")
    .style("line-height", "24px")
    .style("overflow", "hidden")
    .style("text-overflow", "ellipsis")
    .style("white-space", "nowrap")
}