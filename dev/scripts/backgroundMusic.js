import React from 'react';

const BackgroundMusic = (props) => {
    return (
        <audio id="foraride" data-sound="test" src={props.playMusic()}></audio>
    )
}


export default BackgroundMusic;