import drawChart from "./chartServices.js";
import tracks from "./index.js";

const fetchingJSON = async (myArr) => {
  let data = await tracks.tracks;
  if (data !== undefined || data !== null) {
    console.log("data: ", data);
    Array.from(data.items).forEach((val, index) => {
      let myObj = new Object();
      myObj.album_type = val.album.album_type;
      myObj.name = val.name;
      myObj.popularity = val.popularity;
      myObj.release_date = val.album.release_date;

      // extracting year from release date
      myObj.release_year = Number(val.album.release_date.split("-")[0]);
      myObj.duration_ms = val.duration_ms;

      // appending the object inside the Array for dataset
      myArr[index] = myObj;
    });
  }
  else {
    data = await fetch('assets/tracks.json')
    .then(res => res.json())
    .then(data => {
      console.log("data: ", data);
      Array.from(data.items).forEach((val, index) => {
        let myObj = new Object();
        myObj.album_type = val.album.album_type;
        myObj.name = val.name;
        myObj.popularity = val.popularity;
        myObj.release_date = val.album.release_date;
    
        // extracting year from release date
        myObj.release_year = Number(val.album.release_date.split("-")[0]);
        myObj.duration_ms = val.duration_ms;
    
        // appending the object inside the Array for dataset
        myArr[index] = myObj;
      });
      
    })
    .catch(error => console.log("fetching JSON :: Error", error))

  }

  // console.log("enable chart has been called");
  enableChartButton();

  filterLabelsToDraw();
};

let d1 = new Array();

fetchingJSON(d1);
console.log(d1);
let labels;
let label;
let data = new Array(0, 0, 0);

async function filterLabelsToDraw() {
  labels = ["single", "album", "compilation"];

  label = `album type`;
  d1.forEach((val) => {
    if (val.album_type === labels[0]) {
      data[0] = data[0] + 1;
    } else if (val.album_type === labels[1]) {
      data[1] = data[1] + 1;
    } else if (val.album_type === labels[2]) {
      data[2] = data[2] + 1;
    }
  });

  // console.log(data);

  // let chartType = "bar";
  // console.log("data: ", data);
}

function enableChartButton() {
  let chartBtns = Array.from(document.querySelectorAll(".chart-btn"));
  chartBtns.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("disabled-btn");
  });

  chartBtns.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      let chartType = e.target.id;
      drawChart(chartType, labels, data, label);
    });
  });
}
