import React from "react";

function Routes(props) {
    const { projection, routes, selectedAirlineID } = props;

    // 如果 selectedAirlineID 为 null，返回空组
    if (selectedAirlineID === null) {
        return <g></g>;
    }

    // 筛选出属于所选航空公司的航线
    const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);

    // 绘制航线
    const routeLines = selectedRoutes.map((route, i) => {
        const [startX, startY] = projection([route.SourceLongitude, route.SourceLatitude]);
        const [endX, endY] = projection([route.DestLongitude, route.DestLatitude]);
        return (
            <line
                key={i}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#7A2048"  // 航线颜色，可根据需要调整
                strokeWidth={1}
            />
        );
    });

    return <g>{routeLines}</g>;
}

export { Routes };