import React from 'react';

class Dropdown extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showMenu: false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event){
        event.preventDefault();

        this.setState({
            showMenu: true
        }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(){
        this.setState({
            showMenu: false
        }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div>
                <button className="dropdown-menu" onClick={this.showMenu}>Soundtracks</button>
                {
                    this.state.showMenu
                        ? (
                            <div className="soundtrack">
                                <button className="track" onClick={() => this.props.playMusic(`${this.props.audioLib[0]}`)}>Ultimate Marvel vs Capcom 3</button>
                                <button className="track" onClick={() => this.props.playMusic(`${this.props.audioLib[1]}`)}>Marvel Cinematics Universe</button>
                                <button className="track" onClick={() => this.props.playMusic(`${this.props.audioLib[2]}`)}>Marvel vs Capcom 2</button>
                            </div>
                        ) 
                        : (
                            null
                        )
                }
            </div>
        );
        
    }
}

export default Dropdown;
