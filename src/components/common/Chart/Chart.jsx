import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export const LineChart = props => {
    const { data, name, id } = props;
    useEffect(() => {
        let _data = [];
        data.forEach(x => {
            let item = _data.find(element => element.date === x.date);
            item
                ? item['P-' + x.point] = x.value
                : _data.push({ date: x.date, ['P-' + x.point]: x.value });
        });

        let chart = am4core.create(id, am4charts.XYChart);
        chart.data = _data;
        chart.xAxes.push(new am4charts.DateAxis())
        chart.yAxes.push(new am4charts.ValueAxis());

        const addSeries = (point) => {
            // debugger;
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = 'P-' + point;
            series.dataFields.dateX = 'date';
            series.name = 'P-' + point;

            series.strokeWidth = 2;
            series.fillOpacity = 0.15;
        }

        Array.from(new Set(data.map(x => x.point))).forEach(element => addSeries(element));

        chart.cursor = new am4charts.XYCursor();
        chart.legend = new am4charts.Legend();

        return () => chart.dispose();
    })

    return (
        <div>
            <h6 className={'se-section-title'}>{name}</h6>
            <div id={id} style={{ width: '100%', height: '300px' }}></div>
        </div>
    )
}