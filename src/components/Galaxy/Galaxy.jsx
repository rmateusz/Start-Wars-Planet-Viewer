import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Planet from './components/Planet/Planet';
import falconCockpit from '../../assets/img/pureFalconCockpit.png';
import galaxy from '../../assets/img/galaxy.png';
import warp from '../../assets/img/warp.gif';
import { choosePlanet, selectAllPlanets, selectChosenPlanet, selectShipState, setPlanetView } from '../../redux/galaxy/galaxySlice';
// import store from '../../redux/store';
import { fetchPlanetDetails } from '../../redux/galaxy/galaxyThunks';
import PlanetView from './components/Planet/PlanetView';
import { StatesEnum } from '../../redux/galaxy/StatesEnum';

const Galaxy = () => {
    const dispatch = useDispatch();
    const planets = useSelector(selectAllPlanets);
    const selectedPlanet = useSelector(selectChosenPlanet);
    const shipState = useSelector(selectShipState);

    // const [planetToDisplay, setPlanetToDisplay] = useState(selectedPlanet);

    const onPlanetClick = useCallback((name) => {
        const chosenPlanet = planets.find(p => p.name === name);

        if (chosenPlanet) {
            // setPlanetToDisplay(chosenPlanet);
            dispatch(choosePlanet(chosenPlanet));
            dispatch(fetchPlanetDetails(chosenPlanet));
        }
    }, [dispatch, planets]);

    const onWarpClick = useCallback(() => {
        // navigation.navigateTo(`details/${selectedPlanet?.name}`)
        dispatch(setPlanetView());
    }, [dispatch]);

    const renderBasedOnState = (state) => {
        switch (state) {
            case StatesEnum.idle:
                return <div>Loading...</div>;
            case StatesEnum.planet:
                return selectedPlanet ? <PlanetView planetDetails={selectedPlanet} /> : <div></div>;
            case StatesEnum.warp:
                return <div className="cockpit-container warp" onClick={onWarpClick}>
                    <img className={"cockpit-image"} src={falconCockpit} alt="Logo" />
                    <img className={"galaxy-image warp"} src={warp} alt="Logo" />
                </div>;
            default:
                return <div className="cockpit-container">
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
