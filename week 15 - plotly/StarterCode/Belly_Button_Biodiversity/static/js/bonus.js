function SpeedO(data){    
    var level = 20*data;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var dataGauge = [{ type: 'scatter',
      x: [0], y:[0],
        marker: {size: 12, color:'850000'},
        showlegend: false,
        name: 'washes',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['nine', 'eight', 'seven', 'six',
                'five', 'four', 'three', 'two', 'one', ' '],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(14, 127, 0, .5)',
                        'rgba(50, 133, 12, .5)',
                        'rgba(85, 140, 17, .5)',
                        'rgba(110, 154, 22, .5)',
                        'rgba(135, 175, 32, .5)',
                        'rgba(170, 202, 42, .5)', 
                        'rgba(202, 209, 95, .5)',
                        'rgba(210, 206, 145, .5)', 
                        'rgba(232, 226, 202, .5)',
                        'rgba(0, 0, 0, 0)']},
      labels: ['9', '8', '7', '6', '5', '4', '3', '2', '1', ' '],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layoutGauge = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Washes per Weeek', 
      height: 500,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', dataGauge, layoutGauge);
      

}
