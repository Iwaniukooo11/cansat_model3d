import Chart from 'chart.js'

const verticalLinePlugin = {
  getLinePosition: function(chart, pointIndex) {
    const meta = chart.getDatasetMeta(0) // first dataset is used to discover X coordinate of a point
    const data = meta.data
    return data[pointIndex]._model.x
  },
  renderVerticalLine: function(chartInstance, pointIndex) {
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex)
    const scale = chartInstance.scales['y-axis-0']
    const context = chartInstance.chart.ctx

    // render vertical line
    context.beginPath()
    context.lineWidth = 4
    context.strokeStyle = '#05192a'
    context.moveTo(lineLeftOffset, scale.top)
    context.lineTo(lineLeftOffset, scale.bottom)
    context.stroke()

    // write label
    context.fillStyle = '#ff0000'
    context.textAlign = 'center'
    context.fillText(
      '',
      lineLeftOffset,
      (scale.bottom - scale.top) / 2 + scale.top
    )
    // console.log(context.width)
  },

  afterDatasetsDraw: function(chart, easing) {
    if (chart.config.lineAtIndex) {
      chart.config.lineAtIndex.forEach(pointIndex =>
        this.renderVerticalLine(chart, pointIndex)
      )
    }
  }
}

Chart.plugins.register(verticalLinePlugin)
