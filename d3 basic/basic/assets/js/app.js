// @TODO: YOUR CODE HERE!
// get data. more var than i need right now
var poverty = [];
var age = [];
var healthcare = [];
var income = [];
var obesity = [];
var smokes = [];
var abbreviation = [];

var margin = {
    top : 20,
    right: 20,
    bottom : 60,
    left: 60
};

//viewbox used to autoscale svg and everything in it
var svg = d3.select("#scatter")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1000 400")
            .classed("svg-content-responsive", true)
            .attr("class", "chart")
            .append("g")
            .attr("class", "responsive-plot")
            .attr("transform", `translate( ${margin.left}, ${margin.top})`);

//start main function
d3.csv("\assets\\data\\data.csv").then(function(data){
//get all data
        data.map(d =>{

        poverty.push(+d["poverty"]);
        age.push(+d["age"]);
        healthcare.push(+d["healthcare"]);
        income.push(+d["income"]);
        obesity.push(+d["obesity"]);
        smokes.push(+d["smokes"]);
        abbreviation.push(+d["abbr"]);
    }); 

//set x and y for simple plot
    var yValues = obesity;
    var xValues = poverty;

//scales are set relative to viewbox size (1000, 400)
    var yScale = d3.scaleLinear()
                .domain([d3.min(yValues)*.95, d3.max(yValues)])
                .range([290,20]);

    var xScale = d3.scaleLinear()
                .domain([d3.min(xValues)*.95, d3.max(xValues)])
                .range([0, 680]);

    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

//call both axes, translate based off viewbox    
    svg.append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", `translate (0, 290)`);

    svg.append("text")             
    .attr("transform",
            "translate(340, 325)")
    .style("text-anchor", "middle")
    .text("% in Poverty");

    svg.append("g")
        .call(yAxis)
        .attr("class", "yAxis");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 -145)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("% Obeses");    

//define div so mouseover/out can use it
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", .5);

//circle and text abbr separate
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", i=> xScale(i.poverty))
        .attr("cy", j => yScale(j.obesity))
        .attr("r", 14)
        .style("opacity", .25)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.state + "<br>" + `Poverty: ` + d.poverty + "<br>" + `Obesity: ` + d['obesity'])	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 45) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });


    svg.selectAll("text")
        .data(data, a=>a)
        .enter()
        .append("text")
        .attr("x", a=> xScale(a.poverty))
        .attr("y", b=> yScale(b.obesity)+7)
        .text(c => `${c.abbr}`)
        .attr("class", "stateText")
        .attr("font-size", "15px")
        .attr("fill", "red")
        .style("opacity", .75)
    
 

    });
