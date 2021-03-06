import axios from 'axios';
import { useState, useEffect, React, useCallback } from 'react';
import { apiRoot } from '../../Globals/globals';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddExerciseCalendar.scss';

export default function AddExerciseCalendar(props) {
  const dateObj = new Date();
  const [challengeDetails, setChallengeDetails] = useState('');
  const [startDay, setStartDay] = useState();
  const [firstSelectableDate, setFirstSelectableDate] = useState(dateObj);
  const [loading, setLoading] = useState(true);

  const challengeId = props.userInfo['custom:Challenge'];

  const today = new Date();

  const getChallengeDetailsHandler = useCallback(async () => {
    axios({
      method: 'get',
      url: `${apiRoot}/admin/get-challenge-details?challengeName=${challengeId}`,
      responseType: 'json',
    }).then(function (response) {
      if (challengeDetails === '') {
        setChallengeDetails(response.data);
      }
    });
  }, [challengeDetails, challengeId]);

  const calculateMinDate = useCallback(
    (startDay) => {
      let dateOffset = 0;
      switch (startDay) {
        case 1:
          // startDay === Monday
          dateOffset = 6;
          break;
        case 2:
          // startDay === Tuesday
          dateOffset = 5;
          break;
        case 3:
          // startDay === Wednesday
          dateOffset = 4;
          break;
        case 4:
          // startDay === Thursday
          dateOffset = 3;
          break;
        case 5:
          // startDay === Friday
          dateOffset = 2;
          break;
        case 6:
          // startDay === Saturday
          dateOffset = 1;
          break;

        default:
          break;
      }
      let startDate = firstSelectableDate;
      startDate.setDate(
        startDate.getDate() - ((startDate.getDay() + dateOffset) % 7)
      );
      setFirstSelectableDate(startDate);
      return;
    },
    [firstSelectableDate]
  );

  useEffect(() => {
    getChallengeDetailsHandler();
  }, [getChallengeDetailsHandler]);

  useEffect(() => {
    if (challengeDetails !== '') {
      setStartDay(challengeDetails.startDay);
    }
  }, [challengeDetails]);

  useEffect(() => {
    if (startDay !== undefined) {
      calculateMinDate(startDay);
      setLoading(false);
    }
  }, [calculateMinDate, startDay]);

  return loading ? (
    <div />
  ) : (
    <Calendar
      minDate={firstSelectableDate}
      maxDate={today}
      onChange={props.handleSelectedDateChange}
    />
  );
}
