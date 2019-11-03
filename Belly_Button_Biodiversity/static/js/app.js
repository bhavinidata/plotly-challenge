async function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

  console.log("in build metadata")
      const defaultURL = `/metadata/${sample}` 
      console.log(defaultURL);
      console.log(sample);
      let data = await d3.json(defaultURL);
      data = [data];
      console.log(data);
  
    const metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (let i=0; i<data.length; i++){
      Object.entries(data[i]).forEach(([key, value]) => {
        metadataPanel.append("p")
        .text(`${key}:${value}`);
      })
    }

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

async function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  const defaultURL = `/samples/${sample}` 
  let data = await d3.json(defaultURL);
      data = [data];
      console.log(data);
    // @TODO: Build a Bubble Chart using the sample data

  for (let i=0; i<data.length; i++){
    var x_value = data[i]["otu_ids"];
    console.log(x_value);
    var y_value = data[i]["sample_values"];
    console.log(y_value);
    var size_value = data[i]["sample_values"];
    var label = data[i]["otu_labels"];
    console.log(label);
  }
  const trace = {
    x: x_value,
    y: y_value,
    mode: "markers",
    marker:{
      size: size_value,
      color: x_value,
      colorscale: "Rainbow",
      type: 'scatter',  
      opacity: 0.3,
      
    },
    text : label
    
  };

  const bubbleChrtData = [trace];
  console.log("print bubble data:")
  console.log(bubbleChrtData)
  const layout = {
    title: "OTU_IDS Markers"
  }

Plotly.newPlot("bubble", bubbleChrtData, layout); 

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  const pieData = [{
      values: size_value.splice(0, 10),
      labels: x_value.splice(0, 10),
      text: y_value.splice(0,10),
      type: 'pie'
    }];
    Plotly.newPlot('pie', pieData);

}
function callprint(ex){
  console.log(ex);
  console.log(`printing ${ex}`);
}

function init() {
  console.log("inside init");
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      console.log("in function");
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
    callprint(40);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
console.log("in appjs")
callprint("hi");


