import react from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{ max : 25 }}>
                <div>
                    <div className='Tilt-inner pa3'>
                        <img alt='logo' src={logo}/>
                    </div>
                </div>
            </Tilt>
        </div>
    );    
}

export default Logo;