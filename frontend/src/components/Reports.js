import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import '../styles/Reports.css';

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/solar-generation', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        drawChart(response.data);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };
    fetchData();
  }, []);

  const drawChart = (data) => {
    d3.select('#chart').selectAll('*').remove();

    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const tooltip = d3.select('#chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#f9f9f9')
      .style('color', '#333')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('font-size', '0.8rem');

    const pie = d3.pie().value(d => d.generation);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.state))
      .on('mouseover', function (event, d) {
        const centroid = arc.centroid(d);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`State: ${d.data.state}<br>Generation: ${d.data.generation} GWh`)
          .style('left', (centroid[0] + width / 2) + 'px')
          .style('top', (centroid[1] + height / 2) + 'px');
      })
      
      .on('mousemove', function (event, d) {
        const centroid = arc.centroid(d);
        tooltip.style('left', (centroid[0] + width / 2) + 'px')
          .style('top', (centroid[1] + height / 2) + 'px');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(500).style('opacity', 0);
      });

    arcs.append('text')
      .attr('transform', d => {
        const centroid = arc.centroid(d);
        const angle = (d.startAngle + d.endAngle) / 2;
        const rotate = angle * 180 / Math.PI - 90;
        return `translate(${centroid}) rotate(${rotate})`;
      })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.state)
      .style('font-size', '0.8rem')
      .style('font-weight', 'bold')
      .style('fill', '#fff');

      const legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', `translate(${width + 20}, ${height / 2})`);

    data.forEach((d, i) => {
      const legendRow = legend.append('g')
        .attr('class', 'legend-row')
        .attr('transform', `translate(0, ${i * 20})`);

      legendRow.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(d.state));

      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(d.state)
        .style('font-size', '0.9rem')
        .style('color', '#333');
    });
  };

  return (
    <div>
      <h1>Solar Energy Generation in 2023 by State (GWh)</h1>
      <div id="chart"></div>
      <p>This chart displays the solar energy generation in gigawatt-hours (GWh) for various states in the USA during 2023. The data reflects the total solar energy generated in each state, providing insights into the distribution of solar energy resources across the country.</p>
<p>Source: <a href="https://www.climatecentral.org/report/solar-and-wind-power-2024" target="_blank" rel="noopener noreferrer">Climate Central</a></p>
    </div>
  );
};

export default Reports;