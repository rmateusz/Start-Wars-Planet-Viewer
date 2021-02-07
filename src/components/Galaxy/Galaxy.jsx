import { useSelector } from 'react-redux';
import Planet from './components/Planet/Planet';
import falconCockpit from '../../assets/img/pureFalconCockpit.png';
import galaxy from '../../assets/img/galaxy.png';
import warp from '../../assets/img/warp.gif';
import { selectAllPlanets, selectChosenPlanet, selectShipState } from '../../redux/galaxy/galaxySlice';
import { useCallback } from 'react';
import store from '../../redux/store';
import { fetchPlanetDetails } from '../../redux/galaxy/galaxyThunks';
import PlanetDetails from './components/Planet/PlanetDetails';
import { StatesEnum } from '../../redux/galaxy/StatesEnum';

const Galaxy = () => {
    const planets = useSelector(selectAllPlanets);
    const selectedPlanet = useSelector(selectChosenPlanet);
    const shipState = useSelector(selectShipState);

    const onPlanetClick = useCallback((name) => {
        const chosenPlanet = planets.find(p => p.name === name);

        if (chosenPlanet) {
            store.dispatch(fetchPlanetDetails(chosenPlanet));
        }
    }, [planets]);

    const renderBasedOnState = (state) => {
        switch (state) {
            case StatesEnum.idle:
                return <div>Loading...</div>;
            case StatesEnum.planet:
                return <PlanetDetails planetDetails={selectedPlanet} />;
            case StatesEnum.warp:
                return <div className="planets-container">
                    <img className={"cockpit-image"} src={falconCockpit} alt="Logo" />
                    <img className={"galaxy-image"} src={warp} alt="Logo" />
                </div>;
            default:
                return <div className="planets-container">
                    <img className={"cockpit-image"} src={falconCockpit} alt="Logo" />
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
