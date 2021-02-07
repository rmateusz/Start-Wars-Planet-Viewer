import React from 'react';
import PropTypes from 'prop-types';
import falconCockpit from '../../../../assets/img/pureFalconCockpit.png' //'../../assets/img/pureFalconCockpit.png';
import stars from '../../../../assets/img/stars.png';

const PlanetDetails = ({
    img
}) => {
    return (<div className="planet-detail-view">
        <img className={"cockpit-image"} src={falconCockpit} alt="Logo" />
        <img className={"galaxy-image"} src={stars} alt="Logo" />
        <div className="planets-container">
            <img alt={''} className="planet-image" src={img} ></img>
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
    name: '',
    orbital_period: '',
    population: '',
    rotation_period: '',
    surface_water: '',
    terrain: ''
};

export default PlanetDetails;
