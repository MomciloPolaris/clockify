import React, { useState } from 'react';
import Button from './Button';

function TimeTrackingForm({ projects, onTrackTime }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(null);

  //funckija se poziva kada se klikne na dugme tajmera
  const handleStartStopTimer = () => {
    if (!timerActive) {
      setStartTime(new Date());
      setTimerActive(true);
    } else {
      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000;
      onTrackTime(selectedProject, workerName, elapsedTime);
      setTimerActive(false);
      setStartTime(null);
      setWorkerName('');
    }
  };
  
//prikaz
  return (
    <div className="flex items-center border-2 py-6 rounded-md mt-4">
      <div className="flex items-center gap-4 w-full px-2">
        <select
          className="w-1/3 border-2 rounded-md"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
        <input
          className="w-1/3 border-2 rounded-md"
          type="text"
          placeholder="Worker name"
          value={workerName}
          onChange={(e) => setWorkerName(e.target.value)}
        />
        {timerActive ? (
          <Button text="Stop" color="red" onClick={handleStartStopTimer} />
        ) : (
          <Button text="Start" color="green" onClick={handleStartStopTimer} />
        )}
      </div>
      <div className="w-full"></div>
    </div>
  );
}

export default TimeTrackingForm;
