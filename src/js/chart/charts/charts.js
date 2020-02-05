// const test_data = [
//   { height: 3000, a: 10 },
//   { height: 2800, a: 8 },
//   { height: 2700, a: 5 },
//   { height: 2600, a: 4 },
//   { height: 2500, a: 2 }
// ];
import pseudo_func from '../../utils/cansat-data'

let height_time = null

const func = pseudo_func().then(resp => {
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
          backgroundColor: '#1abc9c',
          borderColor: '#1abc9c',
          data: data_y,
          borderWidth: 1,
          fill: false
        }
      ]
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 2,

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
          backgroundColor: '#3498db',
          borderColor: '#3498db',
          data: data_y,
          borderWidth: 0,
          fill: false
        }
      ]
    },
    options: {
      maintainAspectRatio: true,
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

  // return [height_time, temperature_time]
  return [height_time, temperature_time]
})
console.log(func)
export default func
