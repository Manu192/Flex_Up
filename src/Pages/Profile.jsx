import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import {
  addprofileAPI,
  deleteprofileAPI,
  getprofileAPI,
  updateProfileAPI
} from '../Services/Allapi';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';

const Profile = () => {
  const [show, setShow] = useState(false);

  const [profileData, setProfileData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    goalWeight: '',
    activitylevel: '',
    dailygoal: '',
    createdon: '',
    profileImg: ''
  });

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // fetch profile
  const getProfile = async () => {
    try {
      const result = await getprofileAPI();
      if (result.data && result.data.length > 0) {
        setProfileData(result.data[0]);
      }
    } catch (err) {
      console.log('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSaveProfile = async () => {
    const {
      name,
      age,
      height,
      weight,
      goalWeight,
      activitylevel,
      createdon,
      dailygoal
    } = formData;

    if (
      !name ||
      !age ||
      !height ||
      !weight ||
      !goalWeight ||
      !activitylevel ||
      !createdon ||
      !dailygoal
    ) {
      Swal.fire({
        title: 'Hold on!',
        text: 'Please fill out all fields to create your profile.',
        icon: 'info',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#00f0ff',
        background: '#1a1a1a',
        color: '#ffffff',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
      return;
    }

    try {
      let result;
      if (profileData) {
        result = await updateProfileAPI(profileData.id, formData);

        Swal.fire({
          title: 'Profile Updated!',
          text: 'Your changes have been saved successfully.',
          icon: 'success',
          confirmButtonColor: '#00f0ff',
          background: '#1a1a1a',
          color: '#ffffff'
        });
      } else {
        result = await addprofileAPI(formData);

        Swal.fire({
          title: 'Profile Created!',
          text: 'Your fitness profile has been created successfully.',
          icon: 'success',
          confirmButtonColor: '#00f0ff',
          background: '#1a1a1a',
          color: '#ffffff'
        });
      }

      setProfileData(result.data);
      setShow(false);
    } catch (err) {
      console.log('Error saving profile:', err);

      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong while saving your profile.',
        icon: 'error',
        confirmButtonColor: '#ff4d4d',
        background: '#1a1a1a',
        color: '#ffffff'
      });
    }
  };

  // open modal
  const handleShowModal = (isEdit = false) => {
    if (isEdit && profileData) {
      setFormData(profileData);
    } else {
      setFormData({
        name: '',
        age: '',
        height: '',
        weight: '',
        goalWeight: '',
        activitylevel: '',
        dailygoal: '',
        createdon: '',
        profileImg: ''
      });
    }
    setShow(true);
  };

  // delete profile
  const handleDelete = async () => {
    if (!profileData) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete your profile.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#00f0ff',
      confirmButtonText: 'Yes, delete it!',
      background: '#1a1a1a',
      color: '#ffffff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteprofileAPI(profileData.id, profileData);
          setProfileData(null);

          Swal.fire({
            title: 'Deleted!',
            text: 'Your profile has been deleted.',
            icon: 'success',
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#00f0ff'
          });
        } catch (err) {
          console.log('Error deleting profile:', err);

          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting.',
            icon: 'error',
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#ff4d4d'
          });
        }
      }
    });
  };



  return (
    <div className="container mt-4">
      {/* Welcome section if no profile */}
      {!profileData && (
        <div className="welcome-section text-center p-5">
          <h1 className="mb-3">Welcome to Your Fitness Tracker</h1>
          <p className="lead mb-4">
            Start your journey by creating your profile. Track your weight, goals, and weekly progress with ease.
          </p>
          <img className='flaticon'
            src="https://cdn-icons-png.flaticon.com/512/2972/2972410.png"
            alt="Fitness Icon"
            style={{ width: '150px', marginBottom: '20px' }}
          />
          <br />
          <Button variant="primary" size="lg" onClick={() => handleShowModal(false)}>
            Create Your Profile
          </Button>
        </div>
      )}

      {/* Profile card if profile exists */}
      {profileData && (
        <div className="profile-card card shadow-lg p-4 mt-3">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <img
                src={
                  profileData.profileImg ||
                  'https://i.pinimg.com/1200x/da/be/9d/dabe9da4527cfb0c4b6c7bd709f38e8c.jpg'
                }
                alt="Profile"
                className="rounded-circle img-fluid floating-avatar"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8 text-dark">
              <h3>{profileData.name}</h3>
              <p>Age: {profileData.age}</p>
              <p>Height: {profileData.height} m</p>
              <p>Current Weight: {profileData.weight} kg</p>
              <p>Goal Weight: {profileData.goalWeight} kg</p>
              <p>Activity Level: {profileData.activitylevel}</p>
              <p>Daily Goal: {profileData.dailygoal}</p>
              <p>Date of Creation: {profileData.createdon}</p>
              <Button className=" btn-edit me-3 mt-2" onClick={() => handleShowModal(true)}>
                Edit Profile
              </Button>
              <Button className="btn-delete mt-2" onClick={handleDelete}>
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{profileData ? 'Edit Your Profile' : 'Create Your Profile'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 text-center">
            <img
              src={
                formData.profileImg ||
                'https://i.pinimg.com/1200x/da/be/9d/dabe9da4527cfb0c4b6c7bd709f38e8c.jpg'
              }
              alt="Preview"
              className="rounded-circle img-fluid me-3"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 me-3" />
          </div>
          <div className="mb-2"><TextField label="Enter your name" variant="outlined" className="form-control mb-2"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
          <div className="mb-2"><TextField label="Enter your age" type="number" variant="outlined" className="form-control mb-2"
            value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} /></div>
          <div className="mb-2"><TextField label="Enter your height in m" type="number" variant="outlined" className="form-control mb-2"
            value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} /></div>
          <div className="mb-2"><TextField label="Enter your weight in Kg" type="number" variant="outlined" className="form-control mb-2"
            value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} /></div>
          <div className="mb-2"><TextField label="Enter your Goal weight in Kg" type="number" variant="outlined" className="form-control mb-2"
            value={formData.goalWeight} onChange={(e) => setFormData({ ...formData, goalWeight: e.target.value })} /></div>
          <div className="mb-2"><TextField
            label="Activity Level"
            variant="outlined"
            className="form-control mb-2"
            select
            value={formData.activitylevel}
            onChange={(e) => setFormData({ ...formData, activitylevel: e.target.value })}
          >
            <MenuItem value="">Select Activity Level</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="intense">Intense</MenuItem>
          </TextField></div>
          <div className="mb-2"><TextField label="Daily goal" variant="outlined" className="form-control mb-2"
            value={formData.dailygoal} onChange={(e) => setFormData({ ...formData, dailygoal: e.target.value })} /></div>

          <div className="mb-2"><TextField type="date" variant="outlined" className="form-control"
            value={formData.createdon} onChange={(e) => setFormData({ ...formData, createdon: e.target.value })} /></div>








        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            {profileData ? 'Save Changes' : 'Create Profile'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
