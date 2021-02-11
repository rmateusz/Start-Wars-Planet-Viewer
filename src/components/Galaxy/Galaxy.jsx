import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Planet from './components/Planet/Planet';
import CockpitNone from '../../assets/img/cockpits/CockpitNone.png';

import galaxy from '../../assets/img/galaxy.png';
import warp from '../../assets/img/warp.gif';
import {
    choosePlanet,
    selectAllPlanets,
    selectChosenPlanet,
    selectShipState,
    setGalaxyView,
    setPlanetView
} from '../../redux/galaxy/galaxySlice';

import { fetchPlanetDetails } from '../../redux/galaxy/galaxyThunks';
import PlanetView from './components/Planet/PlanetView';
import { StatesEnum } from '../../redux/galaxy/StatesEnum';

const Galaxy = () => {
    const dispatch = useDispatch();
    const planets = useSelector(selectAllPlanets);
    const selectedPlanet = useSelector(selectChosenPlanet);
    const shipState = useSelector(selectShipState);
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });

    const onPlanetClick = useCallback((name) => {
        const chosenPlanet = planets.find(p => p.name === name);

        if (chosenPlanet) {
            dispatch(choosePlanet(chosenPlanet));
            dispatch(fetchPlanetDetails(chosenPlanet));
        }
    }, [dispatch, planets]);

    const onWarpClick = useCallback(e => {
        setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        setTimeout(() => {

            dispatch(setPlanetView());
        }, 1000);

    }, [dispatch, setMousePosition]);

    const onReturnClick = useCallback(() => {
        setMousePosition({ x: null, y: null });
        dispatch(setGalaxyView());
    }, [dispatch]);

    const renderBasedOnState = (state) => {
        switch (state) {
            case StatesEnum.idle:
                return <div>Loading...</div>;
            case StatesEnum.planet:
                return selectedPlanet ?
                    <PlanetView planetDetails={selectedPlanet}
                        onReturn={onReturnClick}
                    /> : <div></div>;
            case StatesEnum.warp:
                return <div className="cockpit-container warp" onClick={onWarpClick}>
                    <img className={"cockpit-image"} src={CockpitNone} alt="Logo" />
                    <img className={"galaxy-image warp"} src={warp} alt="Logo" />
                    <div className="bullet-left"
                        style={{ left: `${mousePosition.x ? mousePosition.x : 0}px`, top: `${mousePosition.y ? `${mousePosition.y}px` : '90vh'}` }}></div>
                    <div className="bullet-right"
                        style={{ left: `${mousePosition.x ? `${mousePosition.x}px` : '90vw'}`, top: `${mousePosition.y ? `${mousePosition.y}px` : '90vh'}` }}></div>
                </div>;
            default:
                return <div className="cockpit-container">
                    <img className={"cockpit-image"} src={CockpitNone} alt="Logo" />
                    <img className={"galaxy-image"} src={galaxy} alt="Logo" />
                    <div className="planets-container">
                        {planets.map(planet => <Planet
                            planetDetails={planet}
                            onClick={onPlanetClick}
                            {...planet}
                        />)}
                    </div>
                </div>;
        }
    }

    return renderBasedOnState(shipState);
}

export default Galaxy;
