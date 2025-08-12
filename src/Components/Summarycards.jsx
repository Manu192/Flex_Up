import React, { useEffect } from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SummaryCards = ({ workouts = [], profileData = null }) => {
  const MET_VALUES = {
    running: { light: 7, moderate: 9.8, intense: 11 },
    walking: { light: 3, moderate: 3.8, intense: 4.5 },
    cycling: { light: 5.8, moderate: 7, intense: 8.5 },
    swimming: { light: 6, moderate: 8, intense: 9.5 },
    jumpingrope: { light: 8, moderate: 10, intense: 12 },
    pushups: { light: 3.5, moderate: 4, intense: 4.8 },
    squats: { light: 5, moderate: 6, intense: 8 },
    plank: { light: 2.5, moderate: 3, intense: 3.5 },
    lunges: { light: 4, moderate: 5, intense: 6 },
    burpees: { light: 8, moderate: 10, intense: 12 },
    hiking: { light: 5, moderate: 6.5, intense: 7.5 },
    yoga: { light: 2.5, moderate: 3, intense: 3.5 },
    dancing: { light: 4.5, moderate: 5.5, intense: 7 },
    basketball: { light: 6, moderate: 7, intense: 8 }
  };

  if (!profileData || workouts.length === 0) {
    return <p>Loading summary...</p>;
  }

  const dailyGoal = parseInt(String(profileData?.dailygoal || "").match(/\d+/)?.[0]) || 4;

  const pad = (num) => (num < 10 ? '0' + num : num);
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  const todaysWorkouts = workouts.filter(w => w.date === formattedToday);
  useEffect(() => {
  if (workouts.length > 0 && todaysWorkouts.length === 0) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: "No workouts logged for today",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#1f1f1f',
      color: '#fff',
      customClass: {
        popup: 'colored-toast'
      }
    });
  }
}, [workouts]);

  const latestWorkout = todaysWorkouts.length > 0 ? todaysWorkouts[todaysWorkouts.length - 1] : null;

  const calcCalories = (list) => {
    const level = profileData.activitylevel?.toLowerCase();
    let totalCalories = 0;

    list.forEach(w => {
      const workoutKey = w.workoutname.replace(/\s+/g, '').toLowerCase();
      if (MET_VALUES[workoutKey] && MET_VALUES[workoutKey][level]) {
        const MET = MET_VALUES[workoutKey][level];
        const hours = parseFloat(w.duration) / 60;
        if (!isNaN(hours)) totalCalories += MET * profileData.weight * hours;
      }
    });

    return Math.round(totalCalories);
  };

  const caloriesToday = calcCalories(todaysWorkouts);
  const progressPercent = Math.min(100, Math.round((todaysWorkouts.length / dailyGoal) * 100));

  const showMotivationToast = () => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Goal achieved! You crushed it today 💥',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: '#1f1f1f',
      color: '#fff',
      customClass: {
        popup: 'colored-toast'
      }
    });
  };

  useEffect(() => {
    if (progressPercent === 100) {
      showMotivationToast();
    }
  }, [progressPercent]);

  return (
    <Row className="my-4 text-center">
      <Col md={4}>
        <div className="neon-border-wrapper">
          <Card className="neon-card">
            <Card.Body>
              <Card.Title>Today's Workout</Card.Title>
              <Card.Text>
                {latestWorkout
                  ? `${latestWorkout.workoutname} • ${latestWorkout.duration} min`
                  : 'No workouts logged today'}
              </Card.Text>
              {latestWorkout && <small>{todaysWorkouts.length} workout(s) today</small>}
            </Card.Body>
          </Card>
        </div>
      </Col>

      <Col md={4}>
        <div className="neon-border-wrapper">
          <Card className="neon-card">
            <Card.Body>
              <Card.Title>Calories Burned Today</Card.Title>
              <Card.Text>{caloriesToday} kcal</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Col>

      <Col md={4}>
        <div className="neon-border-wrapper">
          <Card className="neon-card">
            <Card.Body>
              <Card.Title>Daily Progress</Card.Title>
              <ProgressBar className='progress-fill' now={progressPercent} label={`${progressPercent}%`} animated striped />
              <small>{todaysWorkouts.length} workouts done / Goal: {dailyGoal}</small>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default SummaryCards;
