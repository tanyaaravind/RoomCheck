import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classData from '../classData.json';
import './Schedule.css';

interface RoomData {
    className: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    pattern: string;
}

interface BuildingData {
    [roomNumber: string]: RoomData[];
}

interface ClassData {
    [buildingName: string]: BuildingData;
}


const Schedule: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bldg = queryParams.get('bldg');
    const room = queryParams.get('room');
    const currTime = queryParams.get('currTime');
    let pattern: string = "";

    const typedClassData = classData as ClassData;

    let classesInRoom: RoomData[] = [];


    if (bldg !== null && room !== null && currTime !== null) {
        classesInRoom = typedClassData[bldg]?.[room] ?? [];
        const parts = currTime.split(',');
        pattern = parts[1];
    }

    const filteredClasses: RoomData[] = [];
    const encounteredStartTimes: Set<string> = new Set();

    classesInRoom.forEach(classItem => {
        const patternArr: string[] = classItem.pattern.split("");
        if (patternArr.includes(pattern)) {
            if (!encounteredStartTimes.has(classItem.startTime)) {
                filteredClasses.push(classItem);
                encounteredStartTimes.add(classItem.startTime);
            }
        }
    });

      filteredClasses.sort((a, b) => {
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
    });

    return (
      <div className="schedule-container">
          <h1>Schedule for {bldg} - Room {room}</h1>
          <ul>
              {filteredClasses.map((classItem, index) => (
                  <li key={index}>
                      <p>Class Name: {classItem.className}</p>
                      <p>Start Time: {classItem.startTime}</p>
                      <p>End Time: {classItem.endTime}</p>
                      <p>Start Date: {classItem.startDate}</p>
                      <p>End Date: {classItem.endDate}</p>
                      <p>Pattern: {classItem.pattern}</p>
                  </li>
              ))}
          </ul>
      </div>
  );
};


export default Schedule;