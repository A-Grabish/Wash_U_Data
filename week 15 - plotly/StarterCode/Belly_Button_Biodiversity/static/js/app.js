


function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(data){

      // Use d3 to select the panel with id of `#sample-metadata`
    var metaBox = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metaBox.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

      Object.entries(data).forEach(([key, value]) => {
        metaBox.append("div").text(key + ": " + value);
        console.log(key, value);
      })
    SpeedO(data.WFREQ);
      });
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  d3.json(`/samples/${sample}`).then(function(data){

    var values = data.sample_values;
    var labels = data.otu_labels;
    var ids = data.otu_ids;
 
    var trace = {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
      size: values,
      color: ids
      }
    };
    var plotData = [trace];

    var layout = {
      title: "Abundance of OTU Colonies",
      showlegend: false,
      xaxis: {
        title: "Operational Taxonomic Units IDs"
      }
    };
    Plotly.newPlot("bubble", plotData, layout);
    
    var PieData = [{
      values: values.slice(0,10),
      labels: ids.slice(0,10),
      type: "pie",
      text: labels.slice(0,10)
    }];
    var PieLayout = {
      Title: "Ten Most Abundant OTUs for Sample",
      margin: {
        t:0,
        l:0,
        b:140
      }
    }
    Plotly.newPlot("pie", PieData, PieLayout)
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
