import React, { useEffect, useState } from 'react';
import SummaryCards from '../Components/Summarycards';
import WorkoutTable from '../Components/WorkoutTable';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addworkoutAPI, getallworkoutAPI, deleteworkoutAPI, updateworkoutAPI, getprofileAPI } from '../Services/Allapi';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Workouts = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    workoutname: "",
    duration: "",
    date: ""
  });
  const [workouts, setWorkouts] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const showToast = (message, icon = 'success') => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#1f1f1f',
      color: '#fff',
      customClass: {
        popup: 'colored-toast'
      }
    });
  };

  const fetchWorkouts = async () => {
    try {
      const result = await getallworkoutAPI();
      setWorkouts(result.data || []);
    } catch (err) {
      console.log(err);
      showToast('Failed to fetch workouts', 'error');
    }
  };

  const getProfile = async () => {
    try {
      const result = await getprofileAPI();
      if (result.data && result.data.length > 0) {
        setProfileData(result.data[0]);
      } else {
        setProfileData(null);
        setWorkouts([]); // Clear workouts if profile is missing
      }
    } catch (err) {
      console.log('Error fetching profile:', err);
      showToast('Failed to fetch profile', 'error');
    }
  };

  useEffect(() => {
    getProfile();
    fetchWorkouts();
  }, []);

  const isDateToday = (selectedDate) => {
    const today = new Date();
    const inputDate = new Date(selectedDate);
    return (
      inputDate.getFullYear() === today.getFullYear() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getDate() === today.getDate()
    );
  };

  const handleAddWorkout = async () => {
    const { workoutname, duration, date } = formData;
    if (!workoutname || !duration || !date) {
      showToast('Please fill all the fields', 'warning');
      return;
    }

    if (!isDateToday(date)) {
      showToast("Please choose today's date only.", 'info');
      return;
    }

    try {
      await addworkoutAPI(formData);
      fetchWorkouts();
      setFormData({ workoutname: "", duration: "", date: "" });
      setShow(false);
      showToast('Workout added successfully! 💪', 'success');
    } catch (err) {
      console.log(err);
      showToast('Failed to add workout 😓', 'error');
    }
  };

  const handleDeleteWorkout = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this workout?',
      text: "This action can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      background: '#1f1f1f',
      color: '#fff',
      customClass: {
        popup: 'colored-toast'
      }
    });

    if (result.isConfirmed) {
      try {
        await deleteworkoutAPI(id);
        setWorkouts(workouts.filter(w => w.id !== id));
        showToast('Workout deleted 🗑️', 'success');
      } catch (err) {
        console.log(err);
        showToast('Failed to delete workout', 'error');
      }
    }
  };

  const handleEditWorkout = async (id, updatedData) => {
    if (!isDateToday(updatedData.date)) {
      showToast("Please choose today's date only.", 'info');
      return;
    }

    try {
      await updateworkoutAPI(id, updatedData);
      fetchWorkouts();
      showToast('Workout updated ✨', 'success');
    } catch (err) {
      console.log(err);
      showToast('Failed to update workout', 'error');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <SummaryCards profileData={profileData} workouts={workouts} />

        <div className="row mb-3">
          <div className="col-6">
            <Button
              variant="primary"
              onClick={() => setShow(true)}
              disabled={!profileData}
              title={!profileData ? 'Create a profile to add workouts' : ''}
            >
              Add Workout
            </Button>
          </div>
        </div>

        {/* Add Workout Modal */}
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add your Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-2">
              <select
                className="form-control"
                value={formData.workoutname}
                onChange={(e) => setFormData({ ...formData, workoutname: e.target.value })}
              >
                <option value="">Select Workout</option>
                <option value="Running">Running</option>
                <option value="Walking">Walking</option>
                <option value="Cycling">Cycling</option>
                <option value="Jump Rope">Jump Rope</option>
                <option value="Swimming">Swimming</option>
                <option value="Push Ups">Push Ups</option>
                <option value="Squats">Squats</option>
                <option value="Pull Ups">Pull Ups</option>
                <option value="Plank">Plank</option>
                <option value="Burpees">Burpees</option>
                <option value="Lunges">Lunges</option>
                <option value="Mountain Climbers">Mountain Climbers</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Deadlift">Deadlift</option>
              </select>
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder='Enter your duration'
                className='form-control'
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <input
                type="date"
                className='form-control'
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            <Button variant="primary" onClick={handleAddWorkout}>Add Workout</Button>
          </Modal.Footer>
        </Modal>

        {/* if no profile data there will not be any workout table */}
        {profileData ? (
          <WorkoutTable
            workouts={workouts}
            onDelete={handleDeleteWorkout}
            onEdit={handleEditWorkout}
          />
        ) : (
          <div className="text-center mt-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
              alt="No profile"
              style={{ width: '100px', marginBottom: '20px', opacity: 0.6 }}
            />
            <h5 className="text-muted">No profile found</h5>
            <p className="text-secondary">
              Create a profile to begin tracking your workouts and progress.
            </p>
            <Button variant="success" className='btn btn-primary' onClick={() => window.location.href = '/profile'}>
              Create Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
