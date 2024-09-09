declare module 'react-week-chart' {
    import * as React from 'react';


    interface DayData {
        day: Date;       // This will store the day's date in string format to associate it with specific days
        beginNumber: number; // Hour in the day (e.g., 9 for 9:00 AM)
        endNumber: number;   // Hour in the day (e.g., 17 for 5:00 PM)
        color: string;       // Color to represent the event
    }



    interface ReactWeekChartProps {
        weeklyData: DayData[];
        GuidComponent: JSX.Element;
        beginNumber: number;
        endNumber: number;
        initialWeek: Date;
        themeObj: any;
        yAxisExtension?: string
    }


    const ReactWeekChart: React.FC<ReactWeekChartProps>;

    export default ReactWeekChart;
}