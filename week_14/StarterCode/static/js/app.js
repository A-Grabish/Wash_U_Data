// from data.js
var tableData = data;

var TBody = d3.select("tbody");

var button = d3.select("#filter-btn");

button.on("click", function() {
    d3.event.preventDefault();
    var dateReq = d3.select("#datetime").property("value");
    var stateReq = d3.select("#stateSelect").property("value");
    stateReq = stateReq.toLowerCase();
    var cityReq = d3.select("#citySelect").property("value");
    cityReq = cityReq.toLowerCase();
    var countryReq = d3.select("#countrySelect").property("value");
    countryReq = countryReq.toLowerCase();
    var shapeReq = d3.select("#shapeSelect").property("value");
    shapeReq = shapeReq.toLowerCase();
    var filtered = tableData;
    // var dataReq = tableData.filter(encounter => encounter.datetime === dateReq);
    // console.log(dataReq);
    if (dateReq) {
        filtered = filtered.filter(encounter => encounter.datetime === dateReq);
    };
    if (cityReq) {
        filtered = filtered.filter(encounter => encounter.city === cityReq);
    }
    if (stateReq){
        filtered = filtered.filter(encounter => encounter.state === stateReq);
    };
    if (countryReq) {
        filtered = filtered.filter(encounter => encounter.country === countryReq);
    }
    if (shapeReq) {
        filtered = filtered.filter(encounter => encounter.shape === shapeReq);
    }
    
    // dataReq = dataReq1.filter(encount => encount.state === stateReq || null == stateReq);
    // console.log(dataReq);
    TBody.html("");
    filtered.map(sighting => {
        var row = TBody.append("tr");
        Object.entries(sighting).map(([key, value])=> {
            var cell = TBody.append("td").text(value);
        });
    });
    

});

tableData.map(sighting => {
    var row = TBody.append("tr");
    Object.entries(sighting).map(([key, value])=> {
        var cell = TBody.append("td").text(value);
    });
});

var filters = d3.select("#filters");


// filters.append("li")
//     .classed("dropdown", true)
//     .append("button").classed("btn btn-primary dropdown-toggle").attr("type", "button")