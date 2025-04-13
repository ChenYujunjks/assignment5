import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID} = props;
    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    // 2. define the xScale and yScale
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>

    // 1. find the maximum of the Count attribute in the data
const maxCount = max(data, d => d.Count);

const airlines = data.map(d => d.AirlineName);
const yScale = scaleBand()
    .domain(airlines)
    .range([0, height])
    .padding(0.2);

const xScale = scaleLinear()
    .domain([0, maxCount])
    .range([0, width]);

// 3. 定义 color 函数
const color = (d) => {
  return d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599";
};

// 4. 定义 onMouseOver 函数
const onMouseOver = (d) => {
  setSelectedAirlineID(d.AirlineID);
};

// 5. 定义 onMouseOut 函数
const onMouseOut = () => {
  setSelectedAirlineID(null);
};

// 6. 生成柱子，并应用颜色和事件处理
const bars = data.map((d, i) => (
  <rect
      key={i}
      x={0}
      y={yScale(d.AirlineName)}
      width={xScale(d.Count)}
      height={yScale.bandwidth()}
      fill={color(d)}              // 使用 color 函数设置填充颜色
      onMouseOver={() => onMouseOver(d)}  // 鼠标悬停时调用 onMouseOver
      onMouseOut={onMouseOut}      // 鼠标移出时调用 onMouseOut
  />
));


return (
  <g transform={`translate(${offsetX}, ${offsetY})`}>
      {bars}
      <YAxis yScale={yScale} height={height} />
      <XAxis xScale={xScale} height={height} width={width} />
  </g>
);
}
    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input. 
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    
    
    