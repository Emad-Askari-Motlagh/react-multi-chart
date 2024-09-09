import React from "react";
interface DayData {
    day: Date;
    beginNumber: number;
    endNumber: number;
    color: string;
}
export declare enum TimesVariationsEnum {
    Jobb = "Jobb",
    Semester = "Semester",
    Sjuk = "Sjuk",
    Vabb = "Vabb"
}
interface WeeklyDataComponentProps {
    weeklyData: DayData[];
    GuidComponent: JSX.Element;
    beginNumber: number;
    endNumber: number;
    initialWeek: Date;
    themeObj: any;
    yAxisExtension?: string;
}
declare const ReactWeekChart: React.FC<WeeklyDataComponentProps>;
export default ReactWeekChart;
//# sourceMappingURL=WeekChart.d.ts.map