import { data_cansat } from '../../utils/cansat-data'

let height_time = null

const func = data_cansat().then(resp => {
  const test_data = resp

  let data_x = test_data.map(obj => obj.time)
  let data_y = test_data.map(obj => obj.height)

  height_time = {
    type: 'line',
    data: {
      labels: data_x,
      datasets: [
        {
          label: 'height',
          labelString: '#height',
          // backgroundColor: '#1abc9c',
          backgroundColor: '#484d4d',
          // borderColor: '#1abc9c',
          borderColor: '#484d4d',
          data: data_y,
          borderWidth: 1,
          fill: false
        }
      ]
    },
    options: {
      // maintainAspectRatio: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      responsive: true,

      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'height [m]'
            },
            ticks: {
              // stepSize: 100
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'time [s]'
            }
          }
        ]
      }
    }
  }

  data_y = test_data.map(obj => obj.temperature)

  const temperature_time = {
    type: 'line',
    data: {
      labels: data_x,
      datasets: [
        {
          label: 'temperature',
          labelString: '#temperature',
          // backgroundColor: '#3498db',
          backgroundColor: '#ff435f',
          // borderColor: '#3498db',
          borderColor: '#ff435f',
          data: data_y,
          borderWidth: 0,
          fill: false
        }
      ]
    },
    options: {
      // maintainAspectRatio: true,
      maintainAspectRatio: false,
      responsive: true,
      aspectRatio: 2,

      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'temperature [*C]'
            },
            ticks: {
              // stepSize: 100
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'time [s]'
            }
          }
        ]
      }
    }
  }

  return [height_time, temperature_time]
})
export default func
