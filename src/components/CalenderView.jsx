import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks }) => {
  // Format tasks for the calendar
  const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
    allDay: true, // Treat tasks as all-day events
  }));

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        selectable
        onSelectEvent={(event) => alert(`Selected: ${event.title}`)}
      />
    </div>
  );
};

export default CalendarView;