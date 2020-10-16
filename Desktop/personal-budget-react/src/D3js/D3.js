import React from 'react';
import * as d3 from "d3";
import axios from "axios";

function d3chart(data){

    var width = 450
    var height = 450
        var margin = 70

    var radius = Math.min(width, height) / 2 - margin
    
    var svg = d3.select("#d3js_chart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var color = d3.scaleOrdinal()
      .range(d3.schemeDark2);
    
    var pie = d3.pie()
      .sort(null) 
      .value(function(d) {return d.value; })
    var dataready = pie(data)
    
    var arc = d3.arc()
      .innerRadius(0)        
      .outerRadius(radius * 0.8)
    
    var outerArc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius * 0.9)
    
    svg
      .selectAll('allSlices')
      .data(dataready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
    
    svg
      .selectAll('allPolylines')
      .data(dataready)
      .enter()
      .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          var posA = arc.centroid(d) 
          var posB = outerArc.centroid(d) 
          var posC = outerArc.centroid(d);
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
          return [posA, posB, posC]
        })
    
    svg
      .selectAll('allLabels')
      .data(dataready)
      .enter()
      .append('text')
        .text( function(d) { console.log(d.data.key) ; return d.data.key } )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
    }
function d3jssub() {
    axios.get('http://localhost:5000/budget')
    .then((res)=> {
        const DATA=[]
    for(var i=0; i < res.data.myBudget.length; i++){
       var d3chartdata= {};
       d3chartdata["key"]=res.data.myBudget[i].title;
       d3chartdata["value"]=res.data.myBudget[i].budget;
       DATA.push(d3chartdata);
    } 
    d3chart(DATA);
    });

    return (
        <div id="d3js_chart"></div>
    );
}

export default d3jssub;