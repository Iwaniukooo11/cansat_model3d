import Chart from 'chart.js'

const verticalLinePlugin = {
  getLinePosition: function(chart, pointIndex) {
    const meta = chart.getDatasetMeta(0)
    const data = meta.data
    return data[pointIndex]._model.x
  },
  renderVerticalLine: function(chartInstance, pointIndex) {
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex)
    const scale = chartInstance.scales['y-axis-0']
    const context = chartInstance.chart.ctx

    context.beginPath()
    context.lineWidth = 4
    context.strokeStyle = '#05192a'
    context.moveTo(lineLeftOffset, scale.top)
    context.lineTo(lineLeftOffset, scale.bottom)
    context.stroke()

    context.fillStyle = '#ff0000'
    context.textAlign = 'center'
    context.fillText(
      '',
      lineLeftOffset,
      (scale.bottom - scale.top) / 2 + scale.top
    )
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
