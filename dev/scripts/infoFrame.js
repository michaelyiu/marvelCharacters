import React from 'react';

class InfoFrame extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        console.log(this.props.visible);
        
        return (
            // <img src={`/marvel-images/large-image/${this.props.characterName}.png`} />
            <div className={`info-frame ${this.props.visible ? "show" : null}`}>
                <h3 className="charName">
                    {`${this.props.characterName}`}
                </h3>
                <p className="description">
                    {`${this.props.description}`}
                </p>
            </div>
        )
    }
}
export default InfoFrame;