import React from 'react';


class Portrait extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: this.props.charURL
        };
    };

    componentWillReceiveProps(nextProps){
        this.setState({
            characters: nextProps.charURL
        })
    }


    render() {
        // console.log(this.props.characters[someid].banner);
        
        return(
            // <div className={this.props.portraitClassName}>
                <img src={this.props.characters} />
            // </div>
        )

    }

}



// const Portrait = (props) => {
//     return(
//         <div className={props.portraitClassName}>
//             <img src={props.banner} />

//         </div>
//     )
// };
//componentwillreceiveprops
export default Portrait;