import React from 'react';
import PropTypes from 'prop-types';

const PlanetDetails = ({
    climate,
    diameter,
    gravity,
    isPlanetDetailsOpen,
    name,
    orbital_period,
    population,
    rotation_period,
    surface_water,
    terrain
}) => {
    return (<div className={`planet-details-panel${isPlanetDetailsOpen ? ' open' : ''}`}>
    <div className="info">
        <label className="name">NAME: </label>
        <label className="value">{name}</label>
    </div>
    <div className="info">
        <label className="name">GRAVITY: </label>
        <label className="value">{gravity}</label>
    </div>
    <div className="info">
        <label className="name">CLIMATE: </label>
        <label className="value">{climate}</label>
    </div>
    <div className="info">
        <label className="name">DIAMETER: </label>
        <label className="value">{diameter}</label>
    </div>
    <div className="info">
        <label className="name">ORBITAL PERIOD: </label>
        <label className="value">{orbital_period}</label>
    </div>
    <div className="info">
        <label className="name">POPULATION: </label>
        <label className="value">{population}</label>
    </div>
    <div className="info">
        <label className="name">ROTATION PERIOD: </label>
        <label className="value">{rotation_period}</label>
    </div>
    <div className="info">
        <label className="name">SURFACE WATER: </label>
        <label className="value">{surface_water}</label>
    </div>
    <div className="info">
        <label className="name">TERRAIN: </label>
        <label className="value">{terrain}</label>
    </div>
    
</div>
    );
};

PlanetDetails.propTypes = {
    climate: PropTypes.string,
    created: PropTypes.string,
    diameter: PropTypes.string,
    edited: PropTypes.string,
    gravity: PropTypes.string,
    isPlanetDetailsOpen: PropTypes.string,
    name: PropTypes.string,
    orbital_period: PropTypes.string,
    population: PropTypes.string,
    rotation_period: PropTypes.string,
    surface_water: PropTypes.string,
    terrain: PropTypes.string
};

PlanetDetails.defaultProps = {
    climate: '',
    created: '',
    diameter: '',
    edited: '',
    gravity: '',
    isPlanetDetailsOpen: false,
    name: '',
    orbital_period: '',
    population: '',
    rotation_period: '',
    surface_water: '',
    terrain: ''
};

export default PlanetDetails;
