import React from 'react';
import PropTypes from 'prop-types';

const Resident = ({
    image,
    name,
    height,
    mass,
}) => {
    return (<div className="resident-container">
        <div className="info-container">
            <div className="info">
                <label className="name">NAME: </label>
                <label className="value">{name}</label>
            </div>
            <div className="info">
                <label className="name">HEIGHT: </label>
                <label className="value">{height}</label>
            </div>
            <div className="info">
                <label className="name">MASS: </label>
                <label className="value">{mass}</label>
            </div>
        </div>
        {image && <img alt={''} className="resident-image" src={image} ></img>}
    </div>
    );
};

Resident.propTypes = {
    height: PropTypes.string,
    image: PropTypes.any,
    mass: PropTypes.string,
    name: PropTypes.string
};

Resident.defaultProps = {
    image: null,
    name: "R5-D4", 
    height: "97", 
    mass: "32"
};

export default Resident;
