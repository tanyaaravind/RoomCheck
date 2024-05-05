import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../backend/firebase';
import './Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/');
  };

  const handleLogOut = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="button-container">
        <button onClick={handleClickHome}>Home</button>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;