import { data_cansat } from '../../utils/cansat-data'

let height_time = null

const func = data_cansat().then(resp => {
  const test_data = resp

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
  const data_chart = []

  data_arr_first.forEach(obj => {
    const chart = {
      type: obj.type,
      // lineAtIndex: [20, 40, 80],
      data: {
        labels: obj.data_x,
        datasets: [
          {
            label: obj.label,
            labelString: `#${obj.label}`,
            // backgroundColor: '#1abc9c',
            backgroundColor: `#${obj.color}`,
            // borderColor: '#1abc9c',
            borderColor: `#${obj.color}`,
            data: obj.data_y,
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
                // stepSize: 100
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
    data_chart.push(chart)
  })

  // let data_x = test_data.map(obj => obj.time)
  // let data_y = test_data.map(obj => obj.height)

  // height_time = {
  //   type: 'line',
  //   // lineAtIndex: [20, 40, 80],
  //   data: {
  //     labels: data_x,
  //     datasets: [
  //       {
  //         label: 'height',
  //         labelString: '#height',
  //         // backgroundColor: '#1abc9c',
  //         backgroundColor: '#484d4d',
  //         // borderColor: '#1abc9c',
  //         borderColor: '#484d4d',
  //         data: data_y,
  //         borderWidth: 1,
  //         fill: false
  //       }
  //     ]
  //   },
  //   options: {
  //     // maintainAspectRatio: true,
  //     maintainAspectRatio: false,
  //     aspectRatio: 2,
  //     responsive: true,
  //     animation: {
  //       duration: 0
  //     },
  //     scales: {
  //       yAxes: [
  //         {
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'height [m]'
  //           },
  //           ticks: {
  //             // stepSize: 100
  //           }
  //         }
  //       ],
  //       xAxes: [
  //         {
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'time [s]'
  //           }
  //         }
  //       ]
  //     }
  //   }
  // }

  // data_y = test_data.map(obj => obj.temperature)

  // const temperature_time = {
  //   type: 'line',
  //   data: {
  //     labels: data_x,
  //     datasets: [
  //       {
  //         label: 'temperature',
  //         labelString: '#temperature',
  //         // backgroundColor: '#3498db',
  //         backgroundColor: '#ff435f',
  //         // borderColor: '#3498db',
  //         borderColor: '#ff435f',
  //         data: data_y,
  //         borderWidth: 0,
  //         fill: false
  //       }
  //     ]
  //   },
  //   options: {
  //     // maintainAspectRatio: true,
  //     maintainAspectRatio: false,
  //     responsive: true,
  //     aspectRatio: 2,
  //     animation: {
  //       duration: 0
  //     },

  //     scales: {
  //       yAxes: [
  //         {
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'temperature [*C]'
  //           },
  //           ticks: {
  //             // stepSize: 100
  //           }
  //         }
  //       ],
  //       xAxes: [
  //         {
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'time [s]'
  //           }
  //         }
  //       ]
  //     }
  //   }
  // }

  return [data_chart, []]
})
export default func
