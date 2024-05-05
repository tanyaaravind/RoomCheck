import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import './Home.css';
import classData from '../classData.json';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../backend/firebase";

interface Meeting {
  className: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  pattern: string;
}

interface Building {
  [buildingName: string]: {
    [roomNumber: string]: Meeting[];
  };
}

const typedClassData: Building = classData;

const HomePage: React.FC = () => {
    const [bldg, setBldg] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [classesInRoom, setClassesInRoom] = useState<Meeting[]>([]);
    const [currentTimeInRange, setCurrentTimeInRange] = useState<boolean>(false); 
    const [searchClicked, setSearchClicked] = useState<boolean>(false);
    const [currTime, setCurrTime] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsLoggedIn(!!user); // Update isLoggedIn state based on user authentication
      });
      return () => unsubscribe();
  }, []);
  
    const handleSearch = (query: string) => {
      const parts: string[] = query.split(' ');
      if (parts.length >= 3) {
        const bldg = parts.slice(0, 2).join(' ');
        const room = parts[2];
        setBldg(bldg);
        setRoom(room);
        const classes = typedClassData[bldg]?.[room] ?? [];
        setClassesInRoom(classes);
  

        const currTime = getCurrentTime(); 
        setCurrTime(currTime);
  
        const [formattedCurrTime, pattern] = currTime;
  
        const isInRange = classes.some((classItem: Meeting) => {
          const startTime = classItem.startTime.replace(':', '');
          const endTime = classItem.endTime.replace(':', '');
          const currTimeNum = parseInt(formattedCurrTime.replace(':', ''), 10);
  
          const patternArr: String[] = classItem.pattern.split("")
          if(patternArr.includes(pattern)) {
              return currTimeNum >= parseInt(startTime, 10) && currTimeNum <= parseInt(endTime, 10);
          } else {
              return false;
          }
          
        });
  
        setCurrentTimeInRange(isInRange);
        setSearchClicked(true);
      } else {
        console.log('Invalid query format. Please enter building and room number.');
      }
    };
  
    const getCurrentTime = (): string[] => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = days[dayOfWeek];
      const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
      const pattern = getPattern(dayOfWeek);
      console.log('Current day:', currentDay);
      console.log('Current time:', formattedTime);
      console.log('Pattern:', pattern);
      return [formattedTime, pattern];
    };
  
    const getPattern = (dayOfWeek: number): string => {
      const patterns = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];
      return patterns[dayOfWeek];
    };
  
    const handleButtonClick = () => {
      navigate(`/Schedule?bldg=${bldg}&room=${room}&currTime=${currTime.join(',')}`);
    };
    
    const handleProfileClick = () => {
      if (isLoggedIn) {
          navigate(`/Profile`);
      } else {
          navigate(`/Login`);
      }
  };
  
  return (
    <div className="home-container">
      <h1>Search for a class!</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="search-results-container">
        <h2>Search Results for {bldg} {room}</h2>
        <p>Availability: {currentTimeInRange ? "Unavailable" : "Available"}</p>
        {searchClicked && (
          <button onClick={handleButtonClick}>See Full Schedule</button>
        )}
        <button onClick={handleProfileClick} className="profile-button">Profile</button>
      </div>
    </div>
  );
};

export default HomePage;