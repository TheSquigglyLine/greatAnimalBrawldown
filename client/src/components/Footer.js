import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <a href="https://discord.gg/jNn4RCQNGg" target="_blank" rel="noopener noreferrer">
                <FaDiscord 
                size={24}
                color='#3d3d3d' />
            </a>
            <p>&copy; 2023 animalfight.org. All rights reserved.</p>

        </footer>
    )
}

export default Footer