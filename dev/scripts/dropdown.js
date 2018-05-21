import React from 'react';

class Dropdown extends React.Component {
    constructor(){
        super();

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
                <button onClick={this.showMenu}>Soundtracks</button>

                {
                    this.state.showMenu
                        ? (
                            <div className="soundtrack">
                                <button>test1</button>
                                <button>test2</button>
                                <button>test3</button>
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
