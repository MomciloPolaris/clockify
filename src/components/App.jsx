import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import CreateProjectForm from './components/CreateProjectForm';
import TimeTrackingForm from './components/TimeTrackingForm';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [trackingData, setTrackingData] = useState([]);
  const [workerName, setWorkerName] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  //dodaje projekat ako ima manje od 10 projekata 
  const handleCreateProject = (projectName) => {
    if (projects.length < 10) {
      setProjects([...projects, projectName]);
    }
  };

  //upravlja tajmerom za pracenje vremena
  const handleStartStopTimer = (project, worker, time) => {
    if (!timerActive) {
      setStartTime(new Date());
      setTimerActive(true);
      setSelectedProject(project);
      setWorkerName(worker);
    } else {
      const endTime = new Date();
      const elapsedTime = time || (endTime - startTime) / 1000;
      setTotalTime(totalTime + elapsedTime);
      setTrackingData([
        ...trackingData,
        {
          project: selectedProject,
          worker: workerName,
          date: new Date().toLocaleDateString(),
          time: elapsedTime,
        },
      ]);
      setTimerActive(false);
      setStartTime(null);
      setWorkerName('');
    }
  };

  return (
    <div>
      <div className="bg-cyan-800">
        <header className="bg-cyan-800 flex justify-between max-w-[1080px] mx-auto py-3 text-2xl text-white">
          <p className="font-bold">Clockify by Polaris</p>
          <div className="flex gap-4">
            <button>Log in</button>
            <button>Sign up</button>
          </div>
        </header>
      </div>
      <div className="flex flex-col justify-center max-w-[1080px] mx-auto">
        <section>
          <div className="flex justify-center gap-6 text-2xl py-8">
            <Button text="Time Tracker" onClick={() => setSelectedProject('Time Tracker')} />
            <Button text="Weekly report" onClick={() => setSelectedProject('Weekly report')} />
          </div>
        </section>
        {selectedProject === 'Time Tracker' && (
          <section>
            <CreateProjectForm onCreateProject={handleCreateProject} />
            <TimeTrackingForm
              projects={projects}
              onTrackTime={handleStartStopTimer}
              timerActive={timerActive}
              workerName={workerName}
              selectedProject={selectedProject}
            />
            {trackingData.map((data, index) => (
              <div className="border-2 py-4 rounded-md mt-4" key={index}>
                <p>Project Name: {data.project}</p>
               
