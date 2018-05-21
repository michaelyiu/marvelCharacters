import React from 'react';

class InfoFrame extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            // <img src={`/marvel-images/large-image/${this.props.characterName}.png`} />
            <div className="info-frame">
                <p>
                    {`${this.props.characterName}`}
                </p>
            </div>
        )
    }
}
export default InfoFrame;