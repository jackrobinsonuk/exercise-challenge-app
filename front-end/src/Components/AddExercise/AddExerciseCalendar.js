import { React } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddExerciseCalendar.scss';

export default function AddExerciseCalendar(props) {
  const today = new Date();
  const today2 = new Date();
  const startOfChallengeWeek = new Date(today2.setDate(today2.getDate() - 4));

  return (
    <Calendar
      minDate={startOfChallengeWeek}
      maxDate={today}
      onChange={props.handleSelectedDateChange}
    />
  );
}
