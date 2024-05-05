import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from "../../../backend/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from '../components/AuthDetails'
import './SignUp.css';


interface SignUpFormProps {
  onSubmit: (firstName: string, lastName: string, email: string, password: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredental) => {
      console.log(userCredental)
      navigate(`/Profile`)
    }).catch((error: any) => {
      console.log(error)
    })
  };

  const handleUser = () => {
    navigate(`/Login`);
  };

  return (
    <div className="container2">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="submitButtoncontainer2">
          <button type="submit" className="submitButton">Sign Up</button>
        </div>
      </form>
      <div className="loginButtoncontainer2">
        <button onClick={handleUser} className="loginButton">Already a user? Login</button>
      </div>
      <AuthDetails/>
    </div>
  );
};

export default SignUpForm;