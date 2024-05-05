import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../backend/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from '../components/AuthDetails'
import './Login.css';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredental) => {
      console.log(userCredental)
      navigate(`/Profile`)
    }).catch((error: any) => {
      console.log(error)
    })
  };

  const navigate = useNavigate();

  const handleUser = () => {
    navigate(`/Signup`)
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submitBtn">Submit</button>
    </form>
  <button onClick={handleUser} className="signupBtn">Not a user? Sign up</button>
  <AuthDetails/>
    </div>
  );
};

export default LoginForm;