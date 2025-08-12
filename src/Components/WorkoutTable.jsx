import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditWorkoutModal from './EditWorkoutModal';

const WorkoutTable = ({ workouts, onDelete, onEdit }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleSaveChanges = (updatedData) => {
    onEdit(selectedWorkout.id, updatedData);
    setShowModal(false);
  };

  return (
    <div className="my-4">
      <h4>Workout History</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='table'>
          {workouts.length > 0 ? (
            workouts.map((workout,index) => (
              <tr key={workout.id} style={{ '--i': index }}>
                <td>{workout.workoutname}</td>
                <td>{workout.duration}</td>
                <td>{workout.date}</td>
                <td>
                  <Button
  className="button me-4"
  size="sm"
  onClick={() => handleEditClick(workout)}
>
  Edit
</Button>
<Button
  className="button-danger me-4"
  size="sm"
  onClick={() => onDelete(workout.id)}
>
  Delete
</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No workouts found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedWorkout && (
        <EditWorkoutModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          workout={selectedWorkout}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default WorkoutTable;
