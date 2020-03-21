import { data_cansat } from '../../utils/cansat-data'

const func = data_cansat().then(resp => {
  const test_data = resp.map(el => {
    const height = (el.height - resp[resp.length - 1].height).toFixed(2)
    const obj = { ...el }
    obj.height = height
    return obj
  })

  const data_arr_first = [
    {
      type: 'line',
      data_x: test_data.map(obj => obj.time),
      data_y: test_data.map(obj => obj.height),
      label: 'height',
      color: '484d4d',
      label_string_y: 'height [m]',
      label_string_x: 'time [s]'
    },
    {
      type: 'line',
      data_x: test_data.map(obj => obj.time),
      data_y: test_data.map(obj => obj.temperature),
      label: 'temperature',
      color: 'ff435f',
      label_string_y: 'temperature [°C]',
      label_string_x: 'time [s]'
    }
  ]
  const data_arr_rest = [
    {
      type: 'line',
      data_x: test_data.map(obj => obj.height).reverse(),
      data_y: test_data.map(obj => obj.pressure).reverse(),
      label: 'pressure',
      color: '484d4d',
      label_string_y: 'pressure [hPa]',
      label_string_x: 'height [m]'
    },
    {
      type: 'line',
      data_x: test_data.map(obj => obj.temperature),
      data_y: test_data.map(obj => obj.humidity),
      label: 'humidity',
      color: 'ff435f',
      label_string_y: 'humidity [%]',
      label_string_x: 'temperature [°C]'
    },
    {
      type: 'line',
      data_x: test_data.map(obj => obj.height).reverse(),
      data_y: test_data.map(obj => obj.humidity),
      label: 'humidity',
      color: '484d4d',
      label_string_y: 'humidity [%]',
      label_string_x: 'height [m]'
    },
    {
      type: 'line',
      data_x: test_data.map(obj => obj.time),
      data_y: test_data.map(obj => obj.speed),
      label: 'speed',
      color: 'ff435f',
      label_string_y: 'speed [m/s]',
      label_string_x: 'time [s]'
    },
    {
      type: 'line',
      data_x: test_data.map(obj => obj.height).reverse(),
      data_y: test_data.map(obj => obj.speed),
      label: 'speed',
      color: '484d4d',
      label_string_y: 'speed [m/s]',
      label_string_x: 'height [m]',
      equal_space: true
    }
  ]

  const rotate_obj = {
    type: 'line',
    data_x: test_data.map(obj => obj.time),
    dataset: [
      {
        data: test_data.map(obj => obj.rot._x),
        label: 'rotation-x',
        yAxisID: 'x',
        borderColor: `#05192a`,
        backgroundColor: '#05192a',
        fill: false,
        borderWidth: 1
      },
      {
        data: test_data.map(obj => obj.rot._y),
        label: 'rotation-y',
        yAxisID: 'y',
        borderColor: `#484d4d`,
        backgroundColor: '#484d4d',
        fill: false,
        borderWidth: 1
      },
      {
        data: test_data.map(obj => obj.rot._z),
        label: 'rotation-z',
        yAxisID: 'z',
        backgroundColor: '#ff435f',
        borderColor: '#ff435f',
        fill: false,
        borderWidth: 1
      }
    ],
    y_axes: [
      {
        id: 'x',
        type: 'linear',
        scaleLabel: {
          display: false,
          labelString: 'x'
        }
      },
      {
        id: 'y',
        type: 'linear',
        position: 'left',
        scaleLabel: {
          display: false,
          labelString: 'y'
        }
      },
      {
        id: 'z',
        type: 'linear',
        position: 'left',
        scaleLabel: {
          display: false,
          labelString: 'z'
        }
      }
    ],
    label: 'speed',
    color: '484d4d',
    label_string_y: 'speed [m/s]',
    label_string_x: 'height [m]'
  }

  const data_chart_first = []
  const data_chart_rest = []

  const createChart = obj => {
    const chart = {
      type: obj.type,
      data: {
        labels: obj.data_x,
        datasets: [
          {
            label: obj.label,
            labelString: `#${obj.label}`,
            backgroundColor: `#${obj.color}`,
            borderColor: `#${obj.color}`,
            data: obj.data_y,
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 2,
        responsive: true,
        animation: {
          duration: 0
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: obj.label_string_y
              },
              ticks: {
                beginAtZero: true,
                max: Math.max(
                  obj.data_y[obj.data_y.length - 1] * 1.1,
                  obj.data_y[0] * 1.1
                )
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: obj.label_string_x
              }
            }
          ]
        }
      }
    }
    return chart
  }

  const createRotateChart = obj => {
    const chart = {
      type: obj.type,
      data: {
        labels: obj.data_x,
        datasets: obj.dataset
      },
      options: {
        maintainAspectRatio: false,
        scaleShowLabels: false,
        aspectRatio: 2,
        responsive: true,
        animation: {
          duration: 0
        },
        scales: {
          yAxes: obj.y_axes,

          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: obj.label_string_x
              }
            }
          ]
        }
      }
    }
    return chart
  }

  data_arr_first.forEach(obj => {
    data_chart_first.push(createChart(obj))
  })
  data_arr_rest.forEach(obj => {
    data_chart_rest.push(createChart(obj))
  })
  data_chart_rest.push(createRotateChart(rotate_obj))

  return [data_chart_first, data_chart_rest]
})
export default func
