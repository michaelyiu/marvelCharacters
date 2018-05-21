import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import md5 from 'md5';
import firebase from 'firebase';
import Icon from './Icon'
import Portrait from './Portrait'
import BackgroundMusic from './BackgroundMusic'
import Dropdown from './Dropdown'
// import hashing from './hashFunction';

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
          key: ""
          // iconClassName: "",
          // portraitClassName: ""
        }],
        charURL: '',
        hoveredCharacter: null,
        currentAudio: new Audio("./music/mvc2-foraride.mp3")
    }; 
    this.handleHover = this.handleHover.bind(this);
    this.playMusic = this.playMusic.bind(this);
  }


    fillStates() {
      const dbRef = firebase.database().ref('affiliation');
      dbRef.on('value', (snapshot) => {
        // console.log(snapshot.val());
        // const characterObject = {};
        const arrayOfObjects = [];
        const affiliation = snapshot.val();

        for (let key in affiliation) {
          for (let character in affiliation[key]){

            let characterObject = {
              name: character,
              icon: `./marvel-images/thumbnails/${character}.png`,
              banner: `./marvel-images/large-image/${character}.png`,
              iconClassName: 'character-icon',
              portraitClassName: 'character-portrait'
            };
            characterObject.key = key + " " + character;
            
            arrayOfObjects.push(characterObject);
          }          

        }

        this.setState({
          characters: arrayOfObjects
        })


      })
      // return key;
    }


    componentDidMount() {
      this.fillStates();

      const PRIV_KEY = "bd850bd2f3d2253e7a5db89b1ce45e89ab777718";
      const PUBLIC_KEY = "add222b556f382954b89547491d0a92f"
      const ts = new Date().getTime();
      //concatenate all the strings together as required by the marvel API
      let hashedString = ts + PRIV_KEY + PUBLIC_KEY;
      //md5 is a hashing function. we pass the concatenated string into it as a parameter
      let URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}&nameStartsWith=black%20panther`
      // let URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}`


      const dbRef = firebase.database().ref('affiliation');


      //axios api call to marvel
      axios.get(URL)
      .then(result => {
        // console.log(result.data.data.results);
        
//        const resultsArray = result.data.data.results;
        
  //      this.setState({
    //      character: result.data.data.results[0].name
          // character: result.data.data.results[0].name
      //  })
      });


      
    }
 


    handleHover(keyToCheck, keyName){
      // let {hoveredCharacter} = this.state
      // let hoveredCharacter = this.state.hoveredCharacter
      // let hoveredCharacter = keyName;
      this.setState({
        hoveredCharacter: keyName
      })
    }

    setMusic(passedTrack){
      this.setState({
        currentAudio: passedTrack
      })
    }
    playMusic(){

      // const sound = $(this).children('#audio')[0];
      // const audio = new Audio("./music/mvc2-foraride.mp3");
      if(!this.state.currentAudio) return;

      if (!this.state.currentAudio.paused){

      }
      // } console.log('isPlaying')
      else{
        this.state.currentAudio.currentTime = 0;
        this.state.currentAudio.play();
      }
      
    
      
      
    }


    render() {
      return (
        <div>
          <div className="wrapper">
          <Dropdown />
          <h1>Marvel Characters</h1>
          <div className="character-portrait">
            <Portrait characterName={this.state.hoveredCharacter}/>
          </div>
          <ul className="characters-container">
            {this.state.characters.map((element, index) => {
              return <Icon
                key = {element.key}
                name = {element.name}
                icon = {element.icon}
                iconClassName = {element.iconClassName}
                handleHover = {this.handleHover}
                firebaseKey = {element.key}
              />
            })}

          </ul>
          </div>
            
          <BackgroundMusic playMusic={this.playMusic}
          />


          {/* <BackgroundMusic musicSection={this.state.musicSelected}/> */}

        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


