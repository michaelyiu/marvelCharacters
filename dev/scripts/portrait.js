import React from 'react';

class Portrait extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
                <img src={`./large-image/${this.props.characterName}.png`} />
        )
    }
}
export default Portrait;