function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

  var data = d3.json(`/metadata/${sample}`);

    // Use d3 to select the panel with id of `#sample-metadata`
  var panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
  panel.html("")

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
  data.then((bellybutton) => {
    Object.entries(bellybutton).forEach(([key, value]) => {
      panel
        .append("h6")
        .text(`${key}: ${value}`);})})
      }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data
  
  var chartdata = d3.json(`/samples/${sample}`);

  var bubble = d3.select("#bubble") 

  chartdata.then(function(data){
  
  var otu_ids = data.otu_ids
  var sample_values = data.sample_values
  var otu_labels = data.otu_labels

  var bubbletrace = {
    type: "scatter",
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: 'Portland'}
  };

  var layout = {
    title: `Belly Button Bubbles`,}
    

  bubbledata = [bubbletrace];

  Plotly.newPlot("bubble",bubbledata, layout)
  
});


    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var pie = d3.select("#pie") 
  
    chartdata.then(function(data){

    var otu_ids = data.otu_ids.slice(0, 10);
    var sample_values = data.sample_values.slice(0, 10);
    var otu_labels = data.otu_labels.slice(0, 10);
  
    labels = [otu_ids]
    values = [sample_values]

    var pietrace = {
      type: "pie",
      values: sample_values
    };
  
    var layout = {
      title: `Belly Button Pie Chart`,      
      color: otu_ids,
      colorscale: 'Portland'}
      
  
    piedata = [pietrace];
  
    Plotly.newPlot("pie", piedata, layout)
    
  });
}  



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

// Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
