import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        {/* will refer to the path where we store our image */}
        <img src={burgerLogo} alt="TastyBurger" />
    </div>
);

export default logo;
