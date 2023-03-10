// let currentRef = d3.select(barRef.current)
// .append('svg')
// .attr('width', w)
// .attr('height', h)
// .style('padding', 10)
// .style('background-color', 'grey')
// .style("margin-left", 50);

// // create the bars
// currentRef.selectAll('bar')
//  .data(data)
// .join("rect")
// .attr("x", (d,i) => i * 50)
// .attr("y", (d,i) => h - 10 * d)
// .attr("width", 45)
// .attr("height", (d,i) => d * 10)
// .attr("fill", color);

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function LineChart(props) {
	const barRef = useRef(); // for d3 to render the chart in the div

	useEffect(() => {
		const margin = { top: 20, right: 30, bottom: 40, left: 90 },
			width = 460 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		const svg = d3
			.select(barRef.current)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		// Data input
		d3.csv(
			'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv'
		).then(function (data) {
			// Add X axis
			// d3.max()
			const x = d3.scaleLinear().domain([0, 13000]).range([0, width]);

			svg.append('g')
				.attr('transform', `translate(0, ${height})`)
				.call(d3.axisBottom(x))
				.selectAll('text')
				.attr('transform', 'translate(-10,0)rotate(-45)')
				.style('text-anchor', 'end');

			// Y axis
			const y = d3
				.scaleBand()
				.range([0, height])
				.domain(data.map(d => d.Country)) // data is an array of objects
				.padding(0.1); //em

			svg.append('g').call(d3.axisLeft(y));

			//Bars
			svg.selectAll('myRect')
				.data(data)
				.join('rect')
				.attr('x', x(0))
				.attr('y', d => y(d.Country))
				.attr('width', d => x(d.Value))
				.attr('height', y.bandwidth())
				.attr('fill', '#69b3a2');
		});
	}, []);
	return <div ref={barRef}></div>;
}
