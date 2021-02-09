import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import falconCockpit from '../../../../assets/img/pureFalconCockpit.png';
import stars from '../../../../assets/img/stars.png';
import PlanetDetails from './PlanetDetails';
import Resident from './Resident';

const PlanetView = ({
    planetDetails
}) => {
    // const currResident = planetDetails.residents.find(r => r.image);
    const [residents] = useState(planetDetails.residents);
    // const [residentImage] = useState(currResident.image);
    const [residentSelected, setResidentSelected] = useState(planetDetails.residents.find(r => r.image));
    const onChangeResident = useCallback(() => {
        const selectedResidentId = residents
        .map(r => r?.name)
        .indexOf(residentSelected?.name);
        // const selectedResidentId = residents.indexOf(r =>{
        //     return r.name === residentSelected.name
        // });
        let chosenResident = residents
            .slice(selectedResidentId + 1)
            .find(r => r.image);

        if (chosenResident) {
            setResidentSelected(chosenResident);
        } else {
            chosenResident = residents
            .find(r => r.image);
        }
    }, [residents, residentSelected]);

    return (<div className="cockpit-container">
        <img className={"cockpit-image"} src={falconCockpit} alt="Logo" />
        <img className={"galaxy-image"} src={stars} alt="Logo" />
        {/* {residentImage && <img alt={''} className="resident-image" src={residentImage} ></img>} */}
            {residentSelected && <Resident {...residentSelected} />}
        <button className="cockpit-button" onClick={onChangeResident}></button>
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
    terrain: PropTypes.string
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
    terrain: ''
};

export default PlanetView;
