import { React } from "react";
import { isWithinInterval } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AddExerciseCalendar.scss";

export default function AddExerciseCalendar(props) {
  const [dateToday, setDateToday] = useState(new Date());
  const [dateSelected, setDateSelected] = useState();

  // If dateToday = start of challenge day of the week, selectableDates = [dateToday]
  // If dateToday = start of challenge day of the week +1, selectableDates = [dateToday, date1DayAgo]
  // ...
  // If dateToday = end of challenge day of the week, selectableDates = [dateToday, date1DayAgo, ..., date6DaysAgo]
  const selectableDates = [];

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (selectableDates.find((dDate) => isSameDay(dDate, date))) {
        return "selectableDates";
      }
    }
  }

  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return selectableDates.find((dDate) => !isSameDay(dDate, date));
    }
  }
  return <Calendar tileDisabled={tileDisabled} tileClassName={tileClassName} />;
}
