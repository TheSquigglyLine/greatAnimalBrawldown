import React, { useState, useEffect } from 'react'
import ActivityDisplay from './components/ActivityDisplay'
import Choices from './components/Choices'
import StoredActivities from './components/StoredActivities'
import DeleteActivities from './components/DeleteActivities'
import activityService from './services/activities'
import Animals from './components/Animals'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState('')
  const [animal1Name, setAnimal1Name] = useState('')
  const [animal2Name, setAnimal2Name] = useState('')
  const [isSlidOut, setIsSlidOut] = useState(false);

  useEffect(() => {
    /* activityService
      .getAllActivities()
      .then(data => {
        setActivities(data.activities)
      }) */
    activityService
      .getAnimalChoices()
      .then(data => {
        setAnimal1Name(data.name1)
        console.log(data.name1)
        setAnimal2Name(data.name2)
        console.log(data.name2)
      })
    /* activityService
      .getNewActivity()
      .then(data => {
        setNewActivity(data.activity)
      }) */
  }, [])

  const handleNewActivity = () => {
    activityService
      .getNewActivity()
      .then(data => {
        setNewActivity(data.activity)
      })

  }

  const handleAddActivity = newActivity => {
    activityService
      .addActivity({
        activity: newActivity,
      })
      .then(() => {
        setActivities([...activities, {activity: newActivity}])
      })
    activityService
      .getNewActivity()
      .then(data => {
        setNewActivity(data.activity)
      })
  }

  const handleDeleteActivities = () => {
    activityService
      .deleteAllActivities()
      .then(() => {
        setActivities([])
      })
  }

  const animateButtonClick = (event) => {
    const clickedButton = event.target;
    if (isSlidOut) {
        return;
    } else {}

        clickedButton.style.backgroundColor = '#32a852';

        setTimeout(() => {
            setIsSlidOut(true);
        }, 1000);
  } 

  const handleAnimalChoice = (choice) => {
    activityService
      .postAnimalChoice(animal1Name,animal2Name,choice)
      .then(data => {
        setAnimal1Name(data.name1)
        setAnimal2Name(data.name2)
        setIsSlidOut(false);
      })
  }

  return (
    /* <div className='container'>
      <Container>
        <Row id="first-row">
          <Col>
            <ActivityDisplay name={newActivity}/>
          </Col>
        </Row>
        <Row id="second-row">
          <Col> 
            <Choices handleNewActivity={handleNewActivity} handleAddActivity={handleAddActivity} name={newActivity}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              <h2>Today's Activities: {activities.length}</h2>
              <StoredActivities list={activities} />
            </ul>
          </Col>
        </Row>
        <Row id="fourth-row">
          <Col>
            <DeleteActivities handleDeleteActivities={handleDeleteActivities} />
          </Col>
        </Row>
      </Container>
    </div> */
    
  <div className="container">
    <h1 className="header">The Great Animal Brawldown</h1>
    <h3 className="subheader">
      Discovering the fiercest creatures on Earth, one brawl at a time.
    </h3>
    <Animals handleAnimalChoice={handleAnimalChoice} animateButtonClick={animateButtonClick} name1={animal1Name} name2={animal1Name} isSlidOut={isSlidOut} />
  </div>
  );
}

export default App;
