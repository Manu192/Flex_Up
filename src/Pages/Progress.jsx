import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getallworkoutAPI, getprofileAPI } from '../Services/Allapi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format, subDays, isWithinInterval } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Progress = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [profileData, setProfileData] = useState(null);

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

  const getCalories = (workout, level = 'moderate', weight = 70) => {
    const key = workout.workoutname?.replace(/\s+/g, '').toLowerCase();
    const duration = parseFloat(workout.duration);
    const hours = duration / 60;

    if (MET_VALUES[key] && MET_VALUES[key][level] && !isNaN(hours)) {
      const MET = MET_VALUES[key][level];
      return MET * weight * hours;
    }
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutRes, profileRes] = await Promise.all([
          getallworkoutAPI(),
          getprofileAPI()
        ]);

        const workouts = workoutRes.data || [];
        const profile = profileRes.data?.[0];

        if (!profile) {
          setProfileData(null);
          setChartData({ labels: [], datasets: [] });
          return;
        }

        setProfileData(profile);

        const level = profile.activitylevel?.toLowerCase() || 'moderate';
        const weight = profile.weight || 70;

        const today = new Date();
        const sevenDaysAgo = subDays(today, 6);
        const todayLabel = format(today, 'MMM d');

        const filtered = workouts.filter(w =>
          isWithinInterval(new Date(w.date), {
            start: sevenDaysAgo,
            end: today
          })
        );

        const grouped = {};
        filtered.forEach(workout => {
          const date = format(new Date(workout.date), 'MMM d');
          if (!grouped[date]) grouped[date] = { duration: 0, calories: 0 };

          const rawDuration = workout.duration?.toString().replace(/[^\d.]/g, '');
          const duration = Number(rawDuration) || 0;

          const calories = getCalories(workout, level, weight);

          grouped[date].duration += duration;
          grouped[date].calories += calories;
        });

        const labels = Object.keys(grouped);
        const durations = labels.map(date => grouped[date].duration);
        const calories = labels.map(date => Math.round(grouped[date].calories));

        const pointStyles = labels.map(label =>
          label === todayLabel ? 'rectRot' : 'circle'
        );
        const pointRadius = labels.map(label =>
          label === todayLabel ? 6 : 3
        );
        const pointBackgroundColors = labels.map(label =>
          label === todayLabel ? '#ff4d6d' : '#00f0ff'
        );

        setChartData({
          labels,
          datasets: [
            {
              label: 'Duration (min)',
              data: durations,
              borderColor: '#00f0ff',
              backgroundColor: 'rgba(0,240,255,0.2)',
              tension: 0.4,
              yAxisID: 'y',
              pointStyle: pointStyles,
              pointRadius: pointRadius,
              pointBackgroundColor: pointBackgroundColors
            },
            {
              label: 'Calories Burned',
              data: calories,
              borderColor: '#ff4d6d',
              backgroundColor: 'rgba(255,77,109,0.2)',
              tension: 0.4,
              yAxisID: 'y1',
              pointStyle: pointStyles,
              pointRadius: pointRadius,
              pointBackgroundColor: pointBackgroundColors
            }
          ]
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!profileData) {
  return (
    <div className="container mt-4 text-center">
      <h3>🔥 Weekly Progress</h3>
      <img
        src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
        alt="No profile"
        style={{ width: '120px', margin: '20px 0', opacity: 0.6 }}
      />
      <h5 className="text-muted">No profile found</h5>
      <p className="text-secondary">
        To track your progress, set up your profile with weight and activity level.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => window.location.href = '/profile'}
      >
        Set Up Profile
      </button>
    </div>
  );
}


  return (
    <div className="container mt-4">
      <h3>🔥 Weekly Progress</h3>
      <Line
        data={chartData}
        options={{
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          stacked: false,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Workout Overview' },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const label = tooltipItems[0].label;
                  const todayLabel = format(new Date(), 'MMM d');
                  return label === todayLabel ? `🔥 Today (${label})` : label;
                }
              }
            }
          },
          scales: {
            y: { type: 'linear', position: 'left' },
            y1: {
              type: 'linear',
              position: 'right',
              grid: { drawOnChartArea: false }
            }
          }
        }}
      />
    </div>
  );
};

export default Progress;
