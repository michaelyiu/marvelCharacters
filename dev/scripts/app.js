import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import md5 from 'md5';
import firebase from 'firebase';
import Icon from './Icon'
import Portrait from './Portrait'

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
        hoveredCharacter: null
    }; 
    this.handleHover = this.handleHover.bind(this);
  }

  // getInitialState (){
  //   console.log("reached");
    
  //   defaultCharacter = [{
  //     name: "Wolverine",
  //     banner: `./marvel-images/large-image/wolverine.png`,
  //     iconClassName: 'character-icon',
  //     portraitClassName: 'character-portrait'
  //   }];

  //   console.log(defaultCharacter);


  //   this.setState({
  //     characters: defaultCharacter
  //   });
  // }

  // //makes it so you can only run this once.
  // once(fn, context) {
  //   var result;

  //   return function () {
  //     if (fn) {
  //       result = fn.apply(context || this, arguments);
  //       fn = null;
  //     }

  //     return result;
  //   };
  // }

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
            // affiliation[key][character].key = character;
            // console.log(characterObject.key);
            
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

      // this.state.characters[0] && this.state.characters[0].focus();
      // this.state.characters.find("wolverine");

      const PRIV_KEY = "bd850bd2f3d2253e7a5db89b1ce45e89ab777718";
      const PUBLIC_KEY = "add222b556f382954b89547491d0a92f"
      const ts = new Date().getTime();
      //concatenate all the strings together as required by the marvel API
      let hashedString = ts + PRIV_KEY + PUBLIC_KEY;
      //md5 is a hashing function. we pass the concatenated string into it as a parameter
      let URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}&nameStartsWith=black%20panther`
      // let URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${md5(hashedString)}`


      const dbRef = firebase.database().ref('affiliation');

      // dbRef.on('value', (snapshot) => {
      //   // console.log(snapshot.val());
      //   const data = snapshot.val();
      //   for(let key in affiliation)
      //   {
      //     console.log(key);
          
      //     // affiliation.
      //     // for(let key in affiliation[character]){

      //     // }
      //   }
        
      // })


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
      let {hoveredCharacter} = this.state
      hoveredCharacter = keyName;
      this.setState({
        hoveredCharacter: hoveredCharacter
      })
      
      // app.setState({
        
      //   charURL: keyName
      // })
      // return "";
    }

    render() {
      // console.log(this.state.characters);
      
      return (
        
        <div>
          <div className="wrapper">
          <h1>Marvel Characters</h1>
          <div className="character-portrait">
          {/* <Portrait 
            * key={this.state.characters[0].key}
            name={this.state.characters[0].name}
            icon={this.state.characters[0].icon}
            banner={this.state.characters[0].banner}
            portraitClassName={this.state.characters[0].portraitClassName}
            firebaseKey={this.state.characters[0].key}
            
          /> */}
          {/* {this.state.characters.map((element, index) => {
            return <Portrait 
              key={element.key}
              name={element.name}
              icon={element.icon}
              banner={element.banner}
              portraitClassName={element.portraitClassName}
              handleHover={this.handleHover}
              firebaseKey={element.key} />
          })} */}
          
          <Portrait characters={this.state.charURL} identifier="" characterName={this.state.hoveredCharacter}/>
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
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


