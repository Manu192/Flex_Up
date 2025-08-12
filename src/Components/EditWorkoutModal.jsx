import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditWorkoutModal = ({ show, handleClose, workout, onSave }) => {
  const [formData, setFormData] = useState(workout);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workout</Modal.Title>
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
            className="form-control"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWorkoutModal;
