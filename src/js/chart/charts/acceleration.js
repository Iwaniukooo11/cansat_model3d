const test_data = [
  { height: 3000, a: 10 },
  { height: 2800, a: 8 },
  { height: 2700, a: 5 },
  { height: 2600, a: 4 },
  { height: 2500, a: 2 }
];
const data_x = test_data.map(obj => obj.height);
const data_y = test_data.map(obj => obj.a);

module.exports = {
  type: "line",
  data: {
    labels: data_x,
    datasets: [
      {
        label: "acceleration",
        labelString: "#height",
        backgroundColor: "#000",
        borderColor: "#0000ff",
        data: data_y,
        borderWidth: 1,
        fill: false
      }
    ]
  },
  options: {
    maintainAspectRatio: true,
    aspectRatio: 4,

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "acceleration [m/s^2]"
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "height [m]"
          }
        }
      ]
    }
  }
};
