import React from 'react';
import { push as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import { FaHome, FaQuestion } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu() {
        this.setState({ menuOpen: false })
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu() {
        this.setState(state => ({ menuOpen: !state.menuOpen }))
    }


    render() {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
                width={ '200px' }
            >
                <Link to="/" onClick={() => { this.closeMenu(); }}>
                    <FaHome />
                    <span>Home</span>
                </Link>
                <Link to="/Leaderbaords" onClick={() => { this.closeMenu(); }}>
                    <MdLeaderboard />
                    <span>Leaderboard</span>
                </Link>
                <Link to="/Suggest" onClick={() => { this.closeMenu(); }}>
                    <AiOutlineForm />
                    <span>Suggest</span>
                </Link>
                <Link to="/About" onClick={() => { this.closeMenu(); }}>
                    <FaQuestion />
                    <span>About</span>
                </Link>
            </Menu>
        );
    }
}

export default Navigation;