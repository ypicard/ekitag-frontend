import * as d3 from "d3";

import { Component, ViewChild, ElementRef, Input } from "@angular/core";

@Component({
  selector: "multi-series-graph",
  template: "<svg #svg></svg>",
  styleUrls: ["./multi-series-graph.scss"]
})
export class MultiSeriesGraphComponent {
  @ViewChild("svg") svgRef: ElementRef;
  @Input() series: any;

  ngAfterViewInit() {
    var svg = d3
      .select(this.svgRef.nativeElement)
      .style("height", "100%")
      .style("width", "100%")
      .attr(
        "viewBox",
        "0 0 " +
          this.svgRef.nativeElement.clientWidth +
          " " +
          this.svgRef.nativeElement.clientHeight
      );

    var margin = { top: 20, right: 20, bottom: 60, left: 40 },
      width =
        this.svgRef.nativeElement.clientWidth - margin.left - margin.right,
      height =
        this.svgRef.nativeElement.clientHeight - margin.top - margin.bottom,
      g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3
      .line()
      .curve(d3.curveBasis)
      .x(function(d) {
        return x(d.datetime);
      })
      .y(function(d) {
        return y(d.exposition);
      });

    var allValues = [].concat.apply([], this.series.map(s => s.values));
    x.domain(d3.extent(allValues, d => d.datetime));
    y.domain(d3.extent(allValues, d => d.exposition));
    z.domain(this.series.map(s => s.key));

    function makeYgridlines() {
      return d3.axisLeft(y).ticks(3);
    }
    // X axis
    g
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis
    g
      .append("g")
      .attr("class", "axis axis--y")
      .call(makeYgridlines())
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("dy", "0.71em")
      .text("Exposition");

    // add the Y gridlines
    g
      .append("g")
      .attr("class", "grid")
      .call(
        makeYgridlines()
          .tickSize(-width)
          .tickFormat("")
      );

    var serie = g
      .selectAll(".serie")
      .data(this.series)
      .enter()
      .append("g")
      .attr("class", "serie");

    serie
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return z(d.key);
      })
      .style("stroke-width", 2);

    serie
      .append("text")
      .attr("transform", function(d) {
        return (
          "translate(" +
          x(d.values[d.values.length - 1].x) +
          "," +
          y(d.values[d.values.length - 1].y) +
          ")"
        );
      })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) {
        return d.key;
      });
  }
}
