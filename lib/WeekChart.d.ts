import React, { CSSProperties } from "react";
import './WeekChart.css';
export interface DayData {
    day: Date;
    beginNumber: number;
    endNumber: number;
    color: string;
}
interface WeeklyDataComponentProps {
    weeklyData: DayData[];
    GuidComponent: JSX.Element;
    beginNumber: number;
    endNumber: number;
    initialWeek: Date;
    containerStyle?: CSSProperties;
    yAxisExtension?: string;
}
declare const ReactWeekChart: React.FC<WeeklyDataComponentProps>;
export default ReactWeekChart;
//# sourceMappingURL=WeekChart.d.ts.map