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
          key: "",
          fullName: ""
          // iconClassName: "",
          // portraitClassName: ""
        }],
        charURL: '',
        hoveredCharacter: 'wolverine',
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
        // console.log(snapshot.val());
        // const characterObject = {};
        const arrayOfObjects = [];
        const affiliation = snapshot.val();

        for (let key in affiliation) {
          for (let character in affiliation[key]){
            // console.log(affiliation[key][character]);
            
            let characterObject = {
              name: character,
              icon: `./marvel-images/thumbnails/${character}.png`,
              banner: `./marvel-images/large-image/${character}.png`,
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
      // return key;
    }


    componentDidMount() {
      this.fillStates();

      

      
    }
 
    playClickSound(){
      const randomSoundArray = ['./sounds/rare_in.mp3', './sounds/select1.mp3', './sounds/select2.mp3'];
      //randoms from 0 to 2 index
      const randomSoundIndex = Math.floor((Math.random() * 3))
      const sfx2 = new Audio(randomSoundArray[randomSoundIndex]);
      sfx2.currentTime = 0;
      sfx2.play();
    }

    playHoverSound(){
      // const sound = $(this).children('#audio')[0];
      const sfx = new Audio("./sounds/mid_carsol.mp3");
      
        sfx.currentTime = 0;
        sfx.play();
        
      
    }

    handleHover(keyToCheck, keyName){
      // let {hoveredCharacter} = this.state
      // let hoveredCharacter = this.state.hoveredCharacter
      // let hoveredCharacter = keyName;
      this.playHoverSound();
      this.setState({
        hoveredCharacter: keyName
      })
    }

    async handleClick(keyToCheck, keyName){
      this.movePortrait();
      this.playClickSound();
      console.log(keyName);
      
      const PRIV_KEY = "bd850bd2f3d2253e7a5db89b1ce45e89ab777718";
      const PUBLIC_KEY = "add222b556f382954b89547491d0a92f"
      const ts = new Date().getTime();
      // //concatenate all the strings together as required by the marvel API
      let hashedString = ts + PRIV_KEY + PUBLIC_KEY;
      // //md5 is a hashing function. we pass the concatenated string into it as a parameter
      let URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}&name=${keyName}`

      // //axios api call to marvel
      await axios.get(URL)
        .then(async result => {
          let description = result.data.data.results[0].description;
          let additionalComicLink = result.data.data.results[0].urls[0].url;
          let singleComic = result.data.data.results[0].comics.collectionURI;
          let comicImage;
          if(description === "")
          {
            description = "Very sad times for this character as Marvel didn't give enough poops to add a description for them."
          }
          let comicURL = `${singleComic}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}`
          await axios.get(comicURL)
            .then(comicResult => {
              let comicRoot = comicResult.data.data.results[0].images;
              comicImage = comicRoot.path + "." + comicRoot.extension;
              console.log(comicImage);
              
              
            })          
          console.log(description);
          console.log(additionalComicLink);
          console.log(comicURL);
          
          
          
      //     //        const resultsArray = result.data.data.results;

      //     //      this.setState({
      //     //      character: result.data.data.results[0].name
      //     // character: result.data.data.results[0].name
          //  })
        });
      this.setState({
        fullName: keyName
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
      console.log(currentAudioCopy);
      
      this.setState({
        currentAudio: currentAudioCopy
      })
    }
    playMusic(passedTrack){
      this.setMusic(passedTrack);
      console.log(passedTrack);
      // const sound = $(this).children('#audio')[0];
      // const audio = new Audio(passedTrack);
      
      console.log(this.state.currentAudio);
      
      
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
          <h1>Marvel Characters</h1>
          <div className="flex-container-char">
            <div className="character-portrait">
              <Portrait characterName={this.state.hoveredCharacter}/>
            </div>
            <InfoFrame characterName={this.state.fullName} />
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
            
          {/* <BackgroundMusic playMusic={this.playMusic} */}
          {/* /> */}


          {/* <BackgroundMusic musicSection={this.state.musicSelected}/> */}

        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


