const drawBarChart = (myLabels, myData, myLabel) => {
  let ctx = document.querySelector("#my-bar-Chart");
  ctx.style.display = "block";

  let myBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: myLabels,
      datasets: [
        {
          label: myLabel,
          data: myData,
          borderwidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#111111",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      aspectRatio: 1,
    },
  });
};

const drawLineChart = (labels, myData, label) => {
  let ctx = document.querySelector("#my-line-Chart");
  ctx.style.display = "block";

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: myData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
};

const config = {
    type: "line",
    data: data,
    options: {
      aspectRatio: 1,
    },
  };

  let lineChart = new Chart(ctx, config);
};

const drawPieChart = (myLabels, myData, myLabel) => {
  let ctx = document.querySelector("#my-pie-Chart");
  ctx.style.display = "block";

  const data = {
    labels: myLabels,
    datasets: [
      {
        label: myLabel,
        data: myData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
  };

  let pieChart = new Chart(ctx, config);
};

export default function drawChart(chartType, labels, data, label) {
  console.log("inside drawChart");

  let myCharts = Array.from(document.querySelectorAll(".my-chart"));
  console.log(myCharts);
  //   myCharts.forEach((chart) => {
  //     chart.style.display = "none";
  //   });

  if (chartType === "bar-chart-btn") {
    console.log("bar chart has been called");
    drawBarChart(labels, data, label);
  } else if (chartType === "line-chart-btn") {
    drawLineChart(labels, data, label);
  } else if (chartType === "pie-chart-btn") {
    drawPieChart(labels, data, label);
  }
}
