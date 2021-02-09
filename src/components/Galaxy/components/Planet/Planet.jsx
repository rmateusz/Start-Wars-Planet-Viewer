import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { percentegeValue } from '../../../../utils/styles';
import PlanetDetails from './PlanetDetails';

const cssNames = {
    highlighted: "highlighted",
    planet: "planet",
}

const Planet = ({
    planetDetails,
    onClick
}) => {
    const [highlighted, setHighlight] = useState(false);
    const [classesSet, setClassesSet] = useState(cssNames.planet);
    const [imgSrc] = useState(planetDetails.img);
    const [imgStyles] = useState({
        left: percentegeValue(planetDetails.positionX),
        top: percentegeValue(planetDetails.positionY)
    });
    const [visible, setVisibility] = useState(!!(planetDetails.positionX && planetDetails.positionY));
    
    useEffect(() => {
        setVisibility(!!(planetDetails.positionX && planetDetails.positionY));
    }, [planetDetails, setVisibility]);

    useEffect(() => {
        highlighted ? setClassesSet(`${cssNames.planet} ${cssNames.highlighted}`) : setClassesSet('planet');
    }, [highlighted, setClassesSet]);

    const onPlanetHover = useCallback(() => {
        setHighlight(true);
    }, [setHighlight]);

    const onPlanetUnhover = useCallback(() => {
        setHighlight(false);
    }, [setHighlight]);

    const setToMiddle = useCallback(() => {
        setHighlight({
            top: percentegeValue(40),
            left: percentegeValue(40)
        });
    }, [setHighlight]);

    const onPlanetClick = useCallback(() => {
        setToMiddle();
        onClick(planetDetails.name, planetDetails.positionX, planetDetails.positionY);
    }, [planetDetails, onClick, setToMiddle]);

    return (visible &&
        <div className={classesSet}
            style={imgStyles}
            onClick={onPlanetClick}
            onMouseEnter={onPlanetHover}
            onMouseLeave={onPlanetUnhover}>
            <img alt={''}
                className="planet-image"
                src={imgSrc} ></img>
            <div className={"info"}>{planetDetails.name}</div>
        </div>
    );
};

Planet.propTypes = {
    planetDetails: PropTypes.shape({ PlanetDetails }.propTypes),
    onClick: PropTypes.func
};

Planet.defaultProps = {
    planetDetails: { },
    onClick: () => { }
};

export default Planet;
