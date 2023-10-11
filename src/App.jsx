import { useEffect, useState } from 'react';
import './App.css'
import Button from './components/Button';
import CreateProjectForm from './components/CreateProjekctForm';

function App() {
  const [weeklyOpened, setWeeklyOpened] = useState(false);

  // timer options
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

//funckija racuna datume za ovu nedelju i cuva ih u weekDates nizu
  function getDatesForWeek() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - currentDay + 1);

    const datesForWeek = [];

    // pondeljak-petak
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      datesForWeek.push(date);
    }

    return datesForWeek;
  }

  const weekDates = getDatesForWeek();

  //definise se ime radnika i azurira se kada se kreira projekat 
  const [project, setProject] = useState({
    name: '',
    workers: [],
  })

//upravljanje vremenom 
  useEffect(() => {
    let interval = null;

    //dok je tajmer true interval se povecavaca za +1, ako postane false interval se brise 
    if (timerStarted) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setProject({
        ...project, workers: [...project.workers, {
          name,
          time: formattedTime,
          date: selectedDate
        }]
      })
      setName('');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerStarted]);

  //prati promene u tajmeru oko sekundi i minuta 
  useEffect(() => {
    console.log(project)
  }, [project])

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(prevMinutes => prevMinutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours(prevHours => prevHours + 1);
    }
  }, [seconds, minutes]);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

//useState vraca dve vrednosti:trenutnu(n) i azurnu(sN), pocetna vrednost je prazan string 
  const [name, setName] = useState('')


  const createProject = (name) => {
    console.log("Create project called with name", name);
    setProject({ ...project, name })
  }

//proverava se vrednost tajmera i zavisi dalje da li je true ili false 
  const onStartTimer = () => {
    if (timerStarted) {

      return setTimerStarted(false);
    }

    else if (!timerStarted) {
      return setTimerStarted(true)
    }
  }

  //funckija za odabir datuma 
  const [selectedDate, setSelectedDate] = useState(new Date(weekDates[0]).toDateString());

  const onChangeSelectDate = (e) => {
    console.log({ value: e.target.value })
    setSelectedDate(new Date(e.target.value).toDateString());
  }

  useEffect(() => {
    console.log(project);
  }, [project])


//proracunava ukupno radno vreme na osnovu proslih unosa, sabira vreme u sekundama i potom formatira 
  function calculateTotalTime(timeList) {
    const totalSeconds = timeList.reduce((total, time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      return total + timeInSeconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div>
      <div className="bg-cyan-800">
        <header className=" bg-cyan-800 flex justify-between max-w-[1080px] mx-auto py-3 text-2xl text-white">
          <p className=" font-bold">Clockify by Polaris</p>
          <div className="flex gap-4">
            <button>Log in</button>
            <button>Sign up</button>
          </div>
        </header>
      </div>
      <div className="flex flex-col justify-center max-w-[1080px] mx-auto">
        <section>
          <div className="flex justify-center gap-6 text-2xl py-8">
            <Button onClick={() => setWeeklyOpened(false)} style={{ border: weeklyOpened ? '' : '3px solid orange' }} text="Time Tracker" />
            <Button onClick={() => setWeeklyOpened(true)} style={{ border: !weeklyOpened ? '' : '3px solid orange' }} text="Weekly report" />
          </div>
        </section>
        <section>
          <CreateProjectForm onCreateProject={createProject} />
        </section>
        <br />

        {!weeklyOpened && <section>

          {project.name && <section style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <input readOnly className='custom-input' value={project.name || ''} type='text' />

            <input className='custom-input' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Type Name' />
            <select onChange={onChangeSelectDate} value={selectedDate} placeholder='Select date'>
              {weekDates.map((value) => {
                return (<option value={value.toDateString()} key={value}>{value.toDateString()}</option>)
              })}
            </select>
            <div>{formattedTime}</div>
            <Button className={'start-button'} disabled={name ? false : true} onClick={onStartTimer} style={{ backgroundColor: timerStarted ? 'red' : 'green' }} text={timerStarted ? 'Stop' : 'Start'}></Button>
            <hr />




          </section>}
          <br />
          <br />
          {project.workers.length > 1 &&
            <table border="1">
              <tr>
                <th>Project Name</th>
                <th>Worker</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              {project.workers.map((worker, index) => {
                if (index === 0) return null;
                return (
                  <tr key={index}>
                    <td style={{ fontWeight: "bold" }}>{project.name}</td>
                    <td>{worker.name}</td>
                    <td>{worker.date}</td>
                    <td style={{ fontWeight: '500', color: 'blue' }}>{worker.time}</td>
                  </tr>
                )
              })}
            </table>}
          <br />
        </section>}

        {weeklyOpened && <section>
          <h1 style={{ background: 'gray', textAlign: 'center', color: 'white', padding: '5px', fontWeight: 'bold', marginBottom: '30px' }}>Weekly Report</h1>
          {weekDates.map((date) => {
            return (<div key={date}>
              <div style={{ fontWeight: 'bold', color: 'gray' }}>{date.toDateString()}</div>
              <hr />
              <br />
              {project.workers.slice(1).map((worker, index) => {
                if (worker.date === date.toDateString()) {
                  return (<div className='weekly-box' key={index}>
                    <div className='weekly-row'> <div> Worker Name: </div>  <div> {worker.name} </div></div>
                    <div className='weekly-row'> <div>  Time: </div> <div> {worker.time} </div></div>
                    <div className='weekly-row'> <div>Project: </div>  <div> {project.name} </div></div>
                  </div>)
                }
              })}
              <br />
              <br />
            </div>)
          })}

          {project.workers.length > 1 && <span>Total worked time: <b> {calculateTotalTime(project.workers.map(worker => worker.time))} </b> </span>}
          <br />
          <br />
        </section>}

      </div>
    </div>
  );
}

export default App
