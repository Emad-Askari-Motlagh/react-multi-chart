import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface DayData {
  day: Date; // This stores the day’s date
  beginNumber: number; // Hour in the day (e.g., 9 for 9:00 AM)
  endNumber: number; // Hour in the day (e.g., 17 for 5:00 PM)
  color: string; // Color to represent the event
}

export enum TimesVariationsEnum {
  Jobb = "Jobb",
  Semester = "Semester",
  Sjuk = "Sjuk",
  Vabb = "Vabb",
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

const ReactWeekChart: React.FC<WeeklyDataComponentProps> = ({
  weeklyData,
  initialWeek,
  themeObj,
  GuidComponent,
  beginNumber,
  endNumber,
  yAxisExtension,
}) => {
  const [currentWeek, setCurrentWeek] = useState(initialWeek);

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7); // Move 7 days forward
    setCurrentWeek(nextWeek);
  };

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(currentWeek.getDate() - 7); // Move 7 days backward
    setCurrentWeek(prevWeek);
  };

  const startOfWeek = (date: Date) => {
    const dayIndex = date.getDay(); // 0 is Sunday
    const diff = (date.getDate() - dayIndex) + (dayIndex === 0 ? -6 : 1); // Adjust to get Monday
    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date: Date) => {
    const start = startOfWeek(date);
    return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days to get Sunday
  };

  const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString('en-GB', options);

  const renderWeekDays = () => {
    const daysOfWeek = Array.from({ length: 7 }).map((_, index) => {
      const newDay = new Date(currentWeek);
      newDay.setDate(startOfWeek(currentWeek).getDate() + index); // Get each day of the current week
      return newDay;
    });

    const chartCellsStyle = (
      cellColor: string,
      isOnEdge: boolean,
      isFirstHour: boolean
    ) => ({
      backgroundColor: cellColor,
      borderTopLeftRadius: isOnEdge ? "10px" : "0",
      borderTopRightRadius: isOnEdge ? "10px" : "0",
      borderBottomLeftRadius: isFirstHour ? "10px" : "0",
      borderBottomRightRadius: isFirstHour ? "10px" : "0",
      margin: "auto",
      width: "100%",
      boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    });

    const isOnRange = (hour: number, beginHour: number, endHour: number) => {
      return hour > beginHour && hour <= endHour + 1;
    };

    return (
      <div
        className="week-days-container"
        style={{ color: themeObj?.theme === "light" ? "#282828" : "white" }}
      >
        {daysOfWeek.map((day, dayIndex) => {
          // Filter `weeklyData` for events that occur on the current day
          const dayEvents = weeklyData.filter(({ day: eventDay }) =>
            eventDay.toDateString() === day.toDateString()
          );

          const cells = [];

          for (let i = beginNumber; i <= endNumber; i++) {
            let workCellColor = "transparent";
            let isOnEdge = false;
            let isFirstHour = false;

            dayEvents.forEach(({ beginNumber, endNumber, color }) => {
              if (isOnRange(i, beginNumber, endNumber)) {
                workCellColor = color;
                isOnEdge = i === beginNumber || i === endNumber + 1;
                isFirstHour = i === beginNumber + 1;
              }
            });

            cells.push(
              <div
                key={`${dayIndex}-${i}`}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <div
                  className="cells scale-up-animation"
                  style={{
                    ...chartCellsStyle(workCellColor, isOnEdge, isFirstHour),
                    overflow: "visible",
                    position: "relative",
                    width: `${100 / dayEvents.length}%`,
                    maxWidth: "30px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <WorkTimesMinutesComponent extraMinutes={0} />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={dayIndex} className="week-day">
              <div style={{ fontWeight: "900", fontSize: "18px" }}>
                {formatDate(day, { weekday: "short" })}
              </div>
              <div>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid gray",
                    margin: "auto",
                  }}
                >
                  {cells}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="week-range">
        <span>
          {formatDate(startOfWeek(currentWeek), { day: "2-digit", month: "short" })} -{" "}
          {formatDate(endOfWeek(currentWeek), { day: "2-digit", month: "short" })}
        </span>
      </div>
      <div className="arrows-container">
        <button onClick={goToPreviousWeek} className="arrows-wrapper">
          <FaArrowLeft style={{ fontSize: "12px" }} />
          <span>Previous Week</span>
        </button>
        <span className="week-year">{currentWeek.getFullYear()}</span>
        <button onClick={goToNextWeek} className="arrows-wrapper">
          <span>Next Week</span>
          <FaArrowRight style={{ fontSize: "12px" }} />
        </button>
      </div>
      {GuidComponent}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "10% 90%",
          gridTemplateRows: "auto",
        }}
      >
        <div className="chart-times">
          {Array(endNumber - beginNumber)
            .fill("")
            .map((_, i) => (
              <div key={i} className="cells" style={{ color: "white", fontSize: '10px' }}>
                {`${i + beginNumber} ${yAxisExtension ? yAxisExtension : ''}`}
              </div>
            ))}
        </div>
        {renderWeekDays()}
      </div>
    </div>
  );
};

interface WorkTimesMinutesComponentProps {
  extraMinutes: number;
}

const WorkTimesMinutesComponent: React.FC<WorkTimesMinutesComponentProps> = ({
  extraMinutes,
}) => (
  <div>
    {new Array(60).fill("").map((_, i) => (
      <div
        key={i}
        style={{
          height: `${extraMinutes / 60}px`,
          width: "100%",
          backgroundColor: "#49b8b4",
          minWidth: "100%",
        }}
      ></div>
    ))}
  </div>
);

export default ReactWeekChart;
