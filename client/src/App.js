import React, { Component } from 'react';
import activityService from './services/activities';
import Animals from './components/Animals';
import Navigation from './components/Navigation';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal1Name: '',
      animal2Name: '',
      animal1wiki: '',
      animal2wiki: '',
      isSlidOut: false
    };
  }

  componentDidMount() {
    activityService
      .getAnimalChoices()
      .then(data => {
        this.setState({
          animal1Name: data.animal1.name,
          animal1wiki: data.animal1.wikilink,
          animal2Name: data.animal2.name,
          animal2wiki: data.animal2.wikilink
        });
      });
  }

  animateButtonClick = (event, choice) => {
    const clickedButton = event.target;
    const { isSlidOut } = this.state;

    if (isSlidOut) {
      return;
    }
    this.setState({ isSlidOut: true });

    clickedButton.style.backgroundColor = '#32a852';

    setTimeout(() => {
      this.handleAnimalChoice(event, choice);
    }, 1000);
  };

  handleAnimalChoice = (event, choice) => {
    const clickedButton = event.target;
    const { animal1Name, animal2Name } = this.state;

    activityService
      .postAnimalChoice(animal1Name, animal2Name, choice)
      .then(data => {
        this.setState({
          animal1Name: data.animal1.name,
          animal1wiki: data.animal1.wikilink,
          animal2Name: data.animal2.name,
          animal2wiki: data.animal2.wikilink,
          isSlidOut: false
        });

        clickedButton.style.backgroundColor = '#0086E0';
      });
  };

  render() {
    const { animal1Name, animal2Name, animal1wiki, animal2wiki, isSlidOut } = this.state;

    return (
      <div id="outer-container">
        <Navigation pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />  
        <main id="page-wrap">
          <h1 className="header">The Great Animal Brawldown</h1>
          <h3 className="subheader">
            Discovering the fiercest creatures on Earth, one brawl at a time.
          </h3>
          <div className="voter">
            <Animals animateButtonClick={this.animateButtonClick} name1={animal1Name} name2={animal2Name} isSlidOut={isSlidOut} wikilink1={animal1wiki} wikilink2={animal2wiki}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;