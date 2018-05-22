import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import md5 from 'md5';
import regeneratorRuntime from 'regenerator-runtime'
import firebase from 'firebase';
import Icon from './Icon'
import Portrait from './Portrait'
import BackgroundMusic from './BackgroundMusic'
import Dropdown from './Dropdown'
import InfoFrame from './infoFrame'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8f8_BxsX5j9YhnOEcp-bqdg_Ro1EZGME",
  authDomain: "marvel-fcf75.firebaseapp.com",
  databaseURL: "https://marvel-fcf75.firebaseio.com",
  projectId: "marvel-fcf75",
  storageBucket: "marvel-fcf75.appspot.com",
  messagingSenderId: "383571529458"
};
firebase.initializeApp(config);


class App extends React.Component {
  constructor(){
    super();
    this.state = {
        characters: [{
          name: "",
          banner: "",
          key: "",
          fullName: ""
        }],
        charURL: '',
        hoveredCharacter: 'wolverine',
        visible: false,
        description: "",
        currentAudio: new Audio(null),
        audioLib: ["./music/theme1.mp3", "./music/theme2.mp3", "./music/theme3.mp3"]
    }; 
    this.handleHover = this.handleHover.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


    fillStates() {
      const dbRef = firebase.database().ref('affiliation');
      dbRef.on('value', (snapshot) => {
        const arrayOfObjects = [];
        const affiliation = snapshot.val();

        for (let key in affiliation) {
          for (let character in affiliation[key]){
            let lowerCharacter = character.toLowerCase();
            let characterObject = {
              name: character,
              icon: `./thumbnails/${lowerCharacter}.png`,
              banner: `./large-image/${lowerCharacter}.png`,
              iconClassName: 'character-icon',
              portraitClassName: 'character-portrait',
              fullName: affiliation[key][character]
            };
            characterObject.key = key + " " + character;
            arrayOfObjects.push(characterObject);
          }          
        }

        this.setState({
          characters: arrayOfObjects
        })
      })
    }


    componentDidMount() {
      this.fillStates();
    }
 
    playClickSound(){
      const randomSoundArray = ['./sounds/rare_in.mp3', './sounds/select1.mp3', './sounds/select2.mp3'];
      //randoms from 0 to 2 index
      const randomSoundIndex = Math.floor((Math.random() * 3))
      const sfx2 = new Audio(randomSoundArray[randomSoundIndex]);

      sfx2.volume = 0.3;
      sfx2.currentTime = 0;
      sfx2.play();
    }

    playHoverSound(){
      // const sound = $(this).children('#audio')[0];
      const sfx = new Audio("./sounds/mid_carsol.mp3");
      
        sfx.volume = 0.3;
        sfx.currentTime = 0;
        sfx.play();
        
      
    }

    handleHover(keyToCheck, keyName){
      this.playHoverSound();
      this.setState({
        hoveredCharacter: keyName
      })
    }

    async handleClick(keyToCheck, keyName){
      // this.movePortrait(); for stretch goal
      this.playClickSound();
      const PRIV_KEY = "bd850bd2f3d2253e7a5db89b1ce45e89ab777718";
      const PUBLIC_KEY = "add222b556f382954b89547491d0a92f"
      const ts = new Date().getTime();
      // //concatenate all the strings together as required by the marvel API
      let hashedString = ts + PRIV_KEY + PUBLIC_KEY;
      // //md5 is a hashing function. we pass the concatenated string into it as a parameter
      let URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}&name=${keyName}`
      
      let desc;
      // //axios api call to marvel
      await axios.get(URL)
        .then(async result => {
          desc = result.data.data.results[0].description;
          
          if(desc === "")
          {
            desc = "Very sad times for this character as Marvel didn't give enough poops to add a description for them."
          }

        });
      this.setState({
        fullName: keyName,
        visible: true,
        description: desc
      })

    }

    setMusic(passedTrack){
      let currentAudioCopy = this.state.currentAudio;

      if (currentAudioCopy.src === passedTrack)
      {
        return;
      }
      else{
        currentAudioCopy.src = passedTrack;
      }
      
      this.setState({
        currentAudio: currentAudioCopy
      })
    }

    playMusic(passedTrack){
      this.setMusic(passedTrack);
      if(!this.state.currentAudio) return;
      this.state.currentAudio.currentTime = 0;
      this.state.currentAudio.volume = 0.1;
      this.state.currentAudio.play();
    }


    render() {
      return (
        <div>
          <div className="wrapper">
          <Dropdown audioLib={this.state.audioLib}
            playMusic = {this.playMusic}
          />
          <div className="logo">
            <img src={"/logo.png"} alt=""/>
          </div>
          <div className="flex-container-char">
            <div className="character-portrait">
              <Portrait characterName={this.state.hoveredCharacter}/>
            </div>
            <InfoFrame characterName={this.state.fullName} visible={this.state.visible} description={this.state.description}/>
          </div>
          <ul className="characters-container">
            {this.state.characters.map((element, index) => {
              return <Icon
                key = {element.key}
                name = {element.name}
                icon = {element.icon}
                fullName = {element.fullName}
                iconClassName = {element.iconClassName}
                handleHover = {this.handleHover}
                handleClick = {this.handleClick}
                firebaseKey = {element.key}
              />
            })}

          </ul>
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


