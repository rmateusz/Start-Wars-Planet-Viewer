import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import CockpitPlanetDetails from '../../../../assets/img/cockpits/CockpitPlanetDetails.png';
import CockpitResidents from '../../../../assets/img/cockpits/CockpitResidents.png';
import stars from '../../../../assets/img/stars.png';
import PlanetDetails from './PlanetDetails';
import Resident from './Resident';

const PlanetView = ({
    planetDetails,
    onReturn
}) => {
    const [residents] = useState(planetDetails.residents);
    const [residentSelected, setResidentSelected] = useState(planetDetails.residents.find(r => r.image));
    const [cockpitImage] = useState(residentSelected ? CockpitResidents : CockpitPlanetDetails);
    const [isPlanetDetailsOpen, setIsPlanetDetailsOpen] = useState(false);
    const onChangeResident = useCallback(() => {
        const selectedResidentId = residents
            .map(r => r?.name)
            .indexOf(residentSelected?.name);

        let chosenResident = residents
            .slice(selectedResidentId + 1)
            .find(r => r.image);

        if (!chosenResident) {
            chosenResident = residents
            .find(r => r.image);
        }
            
        setResidentSelected(chosenResident);
    }, [residents, residentSelected]);

    const onPlanetButtonClick = useCallback(() => {
        setIsPlanetDetailsOpen(!isPlanetDetailsOpen);
    }, [isPlanetDetailsOpen, setIsPlanetDetailsOpen]);

    const onBackButtonClick = useCallback(() => {
        onReturn();
    }, [onReturn]);

    return (<div className="cockpit-container">
        <img className={"cockpit-image"} src={cockpitImage} alt="Logo" />
        <img className={"galaxy-image"} src={stars} alt="Logo" />
        <div className={`planet-details-panel${isPlanetDetailsOpen ? ' open' : ''}`}>
            <div className="info">
                <label className="name">NAME: </label>
                <label className="value">{planetDetails.name}</label>
            </div>
            <div className="info">
                <label className="name">GRAVITY: </label>
                <label className="value">{planetDetails.gravity}</label>
            </div>
            <div className="info">
                <label className="name">CLIMATE: </label>
                <label className="value">{planetDetails.climate}</label>
            </div>
            <div className="info">
                <label className="name">DIAMETER: </label>
                <label className="value">{planetDetails.diameter}</label>
            </div>
            <div className="info">
                <label className="name">ORBITAL PERIOD: </label>
                <label className="value">{planetDetails.orbital_period}</label>
            </div>
            <div className="info">
                <label className="name">POPULATION: </label>
                <label className="value">{planetDetails.population}</label>
            </div>
            <div className="info">
                <label className="name">ROTATION PERIOD: </label>
                <label className="value">{planetDetails.rotation_period}</label>
            </div>
            <div className="info">
                <label className="name">SURFACE WATER: </label>
                <label className="value">{planetDetails.surface_water}</label>
            </div>
            <div className="info">
                <label className="name">TERRAIN: </label>
                <label className="value">{planetDetails.terrain}</label>
            </div>
            
        </div>
        {/* {residentImage && <img alt={''} className="resident-image" src={residentImage} ></img>} */}
        {residentSelected && <Resident {...residentSelected} />}
        <button className="cockpit-button-planet" onClick={onPlanetButtonClick}></button>
        <button className="cockpit-button-back" onClick={onBackButtonClick}></button>
        <button className="cockpit-button-residents" onClick={onChangeResident}></button>
        <div className="planet-container">
            <img alt={''} className="planet-image" src={planetDetails.img} ></img>
            <PlanetDetails {...planetDetails} />
        </div>
    </div>
    );
};

PlanetView.propTypes = {
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
    terrain: PropTypes.string,
    onReturn: PropTypes.func
};

PlanetView.defaultProps = {
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
    terrain: '',
    onReturn: () => { }
};

export default PlanetView;
