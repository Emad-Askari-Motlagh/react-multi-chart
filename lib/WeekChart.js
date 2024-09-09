"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesVariationsEnum = void 0;
var react_1 = __importStar(require("react"));
var fa_1 = require("react-icons/fa");
var TimesVariationsEnum;
(function (TimesVariationsEnum) {
    TimesVariationsEnum["Jobb"] = "Jobb";
    TimesVariationsEnum["Semester"] = "Semester";
    TimesVariationsEnum["Sjuk"] = "Sjuk";
    TimesVariationsEnum["Vabb"] = "Vabb";
})(TimesVariationsEnum = exports.TimesVariationsEnum || (exports.TimesVariationsEnum = {}));
var ReactWeekChart = function (_a) {
    var weeklyData = _a.weeklyData, initialWeek = _a.initialWeek, themeObj = _a.themeObj, GuidComponent = _a.GuidComponent, beginNumber = _a.beginNumber, endNumber = _a.endNumber, yAxisExtension = _a.yAxisExtension;
    var _b = (0, react_1.useState)(initialWeek), currentWeek = _b[0], setCurrentWeek = _b[1];
    var goToNextWeek = function () {
        var nextWeek = new Date(currentWeek);
        nextWeek.setDate(currentWeek.getDate() + 7); // Move 7 days forward
        setCurrentWeek(nextWeek);
    };
    var goToPreviousWeek = function () {
        var prevWeek = new Date(currentWeek);
        prevWeek.setDate(currentWeek.getDate() - 7); // Move 7 days backward
        setCurrentWeek(prevWeek);
    };
    var startOfWeek = function (date) {
        var dayIndex = date.getDay(); // 0 is Sunday
        var diff = (date.getDate() - dayIndex) + (dayIndex === 0 ? -6 : 1); // Adjust to get Monday
        return new Date(date.setDate(diff));
    };
    var endOfWeek = function (date) {
        var start = startOfWeek(date);
        return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days to get Sunday
    };
    var formatDate = function (date, options) {
        return date.toLocaleDateString('en-GB', options);
    };
    var renderWeekDays = function () {
        var daysOfWeek = Array.from({ length: 7 }).map(function (_, index) {
            var newDay = new Date(currentWeek);
            newDay.setDate(startOfWeek(currentWeek).getDate() + index); // Get each day of the current week
            return newDay;
        });
        var chartCellsStyle = function (cellColor, isOnEdge, isFirstHour) { return ({
            backgroundColor: cellColor,
            borderTopLeftRadius: isOnEdge ? "10px" : "0",
            borderTopRightRadius: isOnEdge ? "10px" : "0",
            borderBottomLeftRadius: isFirstHour ? "10px" : "0",
            borderBottomRightRadius: isFirstHour ? "10px" : "0",
            margin: "auto",
            width: "100%",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }); };
        var isOnRange = function (hour, beginHour, endHour) {
            return hour > beginHour && hour <= endHour + 1;
        };
        return (react_1.default.createElement("div", { className: "week-days-container", style: { color: (themeObj === null || themeObj === void 0 ? void 0 : themeObj.theme) === "light" ? "#282828" : "white" } }, daysOfWeek.map(function (day, dayIndex) {
            // Filter `weeklyData` for events that occur on the current day
            var dayEvents = weeklyData.filter(function (_a) {
                var eventDay = _a.day;
                return eventDay.toDateString() === day.toDateString();
            });
            var cells = [];
            var _loop_1 = function (i) {
                var workCellColor = "transparent";
                var isOnEdge = false;
                var isFirstHour = false;
                dayEvents.forEach(function (_a) {
                    var beginNumber = _a.beginNumber, endNumber = _a.endNumber, color = _a.color;
                    if (isOnRange(i, beginNumber, endNumber)) {
                        workCellColor = color;
                        isOnEdge = i === beginNumber || i === endNumber + 1;
                        isFirstHour = i === beginNumber + 1;
                    }
                });
                cells.push(react_1.default.createElement("div", { key: "".concat(dayIndex, "-").concat(i), style: {
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "auto",
                    } },
                    react_1.default.createElement("div", { className: "cells scale-up-animation", style: __assign(__assign({}, chartCellsStyle(workCellColor, isOnEdge, isFirstHour)), { overflow: "visible", position: "relative", width: "".concat(100 / dayEvents.length, "%"), maxWidth: "30px" }) },
                        react_1.default.createElement("div", { style: {
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                width: "100%",
                                borderTopRightRadius: "10px",
                                borderTopLeftRadius: "10px",
                                overflow: "hidden",
                            } },
                            react_1.default.createElement(WorkTimesMinutesComponent, { extraMinutes: 0 })))));
            };
            for (var i = beginNumber; i <= endNumber; i++) {
                _loop_1(i);
            }
            return (react_1.default.createElement("div", { key: dayIndex, className: "week-day" },
                react_1.default.createElement("div", { style: { fontWeight: "900", fontSize: "18px" } }, formatDate(day, { weekday: "short" })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { style: {
                            display: "flex",
                            flexDirection: "column-reverse",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid gray",
                            margin: "auto",
                        } }, cells))));
        })));
    };
    return (react_1.default.createElement("div", { style: { width: "100%" } },
        react_1.default.createElement("div", { className: "week-range" },
            react_1.default.createElement("span", null,
                formatDate(startOfWeek(currentWeek), { day: "2-digit", month: "short" }),
                " -",
                " ",
                formatDate(endOfWeek(currentWeek), { day: "2-digit", month: "short" }))),
        react_1.default.createElement("div", { className: "arrows-container" },
            react_1.default.createElement("button", { onClick: goToPreviousWeek, className: "arrows-wrapper" },
                react_1.default.createElement(fa_1.FaArrowLeft, { style: { fontSize: "12px" } }),
                react_1.default.createElement("span", null, "Previous Week")),
            react_1.default.createElement("span", { className: "week-year" }, currentWeek.getFullYear()),
            react_1.default.createElement("button", { onClick: goToNextWeek, className: "arrows-wrapper" },
                react_1.default.createElement("span", null, "Next Week"),
                react_1.default.createElement(fa_1.FaArrowRight, { style: { fontSize: "12px" } }))),
        GuidComponent,
        react_1.default.createElement("div", { style: {
                width: "100%",
                display: "grid",
                gridTemplateColumns: "10% 90%",
                gridTemplateRows: "auto",
            } },
            react_1.default.createElement("div", { className: "chart-times" }, Array(endNumber - beginNumber)
                .fill("")
                .map(function (_, i) { return (react_1.default.createElement("div", { key: i, className: "cells", style: { color: "white", fontSize: '10px' } }, "".concat(i + beginNumber, " ").concat(yAxisExtension ? yAxisExtension : ''))); })),
            renderWeekDays())));
};
var WorkTimesMinutesComponent = function (_a) {
    var extraMinutes = _a.extraMinutes;
    return (react_1.default.createElement("div", null, new Array(60).fill("").map(function (_, i) { return (react_1.default.createElement("div", { key: i, style: {
            height: "".concat(extraMinutes / 60, "px"),
            width: "100%",
            backgroundColor: "#49b8b4",
            minWidth: "100%",
        } })); })));
};
exports.default = ReactWeekChart;
