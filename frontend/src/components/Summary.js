import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import '../styles/Summary.css';

const Summary = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/monthly-solar-generation', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        drawChart(response.data);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  const drawChart = (data) => {
    d3.select('#barChart').selectAll('*').remove();

    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };

    const svg = d3.select('#barChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('role', 'img')
      .attr('aria-label', 'Bar chart of monthly solar energy generation in 2023');

    const monthOrder = [
      "January", "February", "March", "April", "May", "June", "July", "August", 
      "September", "October", "November", "December"
    ];

    const sortedData = monthOrder.map(month => {
      const monthData = data.find(d => d.month === month);
      return {
        month,
        generation: monthData ? monthData.generation : 0
      };
    });

    const xScale = d3.scaleBand()
      .domain(sortedData.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.generation)])
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3.select('#barChart')
      .append('div')
      .attr('class', 'tooltip')
      .attr('role', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '5px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d => `${d} GWh`));

    svg.selectAll('.bar')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.month))
      .attr('y', (d) => yScale(d.generation))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d.generation))
      .attr('fill', '#4e79a7')
      .attr('tabindex', '0')
      .attr('role', 'button')
      .attr('aria-label', (d) => `Month: ${d.month}, Generation: ${d.generation} GWh`)
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1)
          .style('color', '#333')
          .style('background-color', '#f9f9f9') // Changed background color
          .html(`Month: ${d.month}<br>Generation: ${d.generation} GWh`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      
      .on('mousemove', (event) => {
        tooltip.style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      
      .on('focus', (event, d) => {
        tooltip.style('opacity', 1)
          .style('color', '#333')
          .style('background-color', '#f9f9f9') // Changed background color
          .html(`Month: ${d.month}<br>Generation: ${d.generation} GWh`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      .on('blur', () => {
        tooltip.style('opacity', 0);
      });
      };
      
      return (
      <div className="summary-container">
        <h1>Monthly Solar Energy Generation in the U.S. (2023)</h1>
        <div id="barChart"></div>
        <p>
          This chart illustrates the monthly solar energy generation in gigawatt-hours (GWh) across the United States in 2023. 
          The data provides insights into seasonal trends in solar energy production.
          Source: <a href="https://www.climatecentral.org/report/solar-and-wind-power-2024" target="_blank" rel="noopener noreferrer" aria-label="Source: Climate Central report on solar and wind power 2024">Climate Central</a>
        </p>
      </div>
      );
      };
      
      export default Summary;