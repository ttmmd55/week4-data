//TURN OFF AUTO-REFRESH NOW !!!


//From: https://api.openaq.org
let airData;
//let loading = true;
// let url = "https://api.openaq.org/v2/measurements?location_id=9590&parameter=co&parameter=pm25&parameter=pm10&parameter=no2&parameter=so2&parameter=o3&date_from=2023-02-11T00:00:00Z&date_to=2023-02-12T00:00:00Z&limit=1000";

function setup() {
  createCanvas(600, 600);
noLoop();
   //HAVE YOU TURNED OFF AUTO-REFRESH?
  
  // perform request
  fetch("./json/airdata.json").then(function(response) {
    return response.json();
  }).then(function(data) {
    //console.log("Got data");
    console.log(data);
    //HAVE YOU TURNED OFF AUTO-REFRESH?
    
    airData = data.airData;
    //loading = false;
     
  drawBar();
    //show text in HTML
  showText(airData);//add text as html element


  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });
}

function draw() {
     background(0);

}

function drawBar() {


 // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<airData.length; i++) {
    if ( airData[i].value > maxval) {
      maxval = airData[i].value;
    }
  }

  let spacing = 8;//spacing between the bars
  // Display chart
  for (let i=0; i<airData.length; i++) {

    let item = airData[i];
    
    let rWidth = width/(airData.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, airData.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.value, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    noStroke(); 
    fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 

    fill(255); 
    textAlign(CENTER, TOP); 
    text(item.name, rX+rWidth/2-1, rY+10); 
    text("Afternoon to evening CO2 concentrations in Schwyz, Switzerland",width/2,15);
  }  

}
function showText(airData){

  showText("Training text number " + airData);
  showText(data.airData);

let textContainer = select("#text-container");
//  textContainer.elt.innerHTML = "";//add this in if you want to replace the text each time

let p = createP(airData);
p.parent("text-container");

}