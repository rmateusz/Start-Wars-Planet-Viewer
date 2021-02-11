/* eslint-disable no-undef */
import { mockData } from './mockData';
import AlderaanImg from '../../assets/img/planets/Alderaan.png';
import HothImg from '../../assets/img/planets/Hoth.png';
import RandomPlanetImg from '../../assets/img/planets/RandomPlanet.png';
import TatooineImg from '../../assets/img/planets/Tatooine.png';
import LeiaImg from '../../assets/img/residents/leia.png';
import LukeImg from '../../assets/img/residents/luke.png';
import VaderImg from '../../assets/img/residents/vader.png';
import AnakinSkywalkerImg from '../../assets/img/residents/AnakinSkywalker.png';
import BeruWhitesunlarsImg from '../../assets/img/residents/BeruWhitesunlars.png';
import BiggsDarklighterImg from '../../assets/img/residents/BiggsDarklighter.png';
import OwenLarsImg from '../../assets/img/residents/OwenLars.png';
import R5D4Img from '../../assets/img/residents/R5D4.png';
import ShmiSkywalkerImg from '../../assets/img/residents/ShmiSkywalker.png';
import RaymusAntillesImg from '../../assets/img/residents/RaymusAntilles.png';
import BailPrestorOrganaImg from '../../assets/img/residents/BailPrestorOrgana.png';

const imageDictionary = {
    "Alderaan": AlderaanImg,
    "Hoth": HothImg,
    "Tatooine": TatooineImg,
}

const imageResidentsDictionary = {
    "Leia Organa": LeiaImg,
    "Luke Skywalker": LukeImg,
    "Darth Vader": VaderImg,
    "Anakin Skywalker": AnakinSkywalkerImg,
    "Beru Whitesunlars": BeruWhitesunlarsImg, 
    "Biggs Darklighter": BiggsDarklighterImg,
    "Owen Lars": OwenLarsImg,
    "R5-D4": R5D4Img,
    "Shmi Skywalker": ShmiSkywalkerImg,
    "Raymus Antilles": RaymusAntillesImg,
    "Bail Prestor Organa": BailPrestorOrganaImg,
}

export const residentsMapper = (residents) => {
    return residents.map(r => {
        const residentImage = imageResidentsDictionary[r.name];
        return {
            ...r,
            image: residentImage ? residentImage : null
        }
    });
}

export const planetsMapper = (planets) => {
    const findImage = (planetName) => {
        let img = imageDictionary[planetName];

        return img ? img : RandomPlanetImg;
    };

    const getPositions = (planetName) => {
        const planet = mockData.values.find(planet => planet.name === planetName);
        if (planet?.positionX && planet?.positionY) {
            return {
                positionX: planet?.positionX ? 20 + planet?.positionX / 2 : ((Math.floor(Math.random() * 90) + 40) / 2).toString(),
                positionY: planet?.positionY ? 10 + planet?.positionY / 2 : ((Math.floor(Math.random() * 90) + 20) / 2).toString(),
            };
        } else {
            return {
                positionX: 0,
                positionY: 0,
            };
        }
    }

    const getPlanetExtendedData = planet => {
        const image = findImage(planet.name);
        const position = getPositions(planet.name);
        return {
            ...planet,
            ...position,
            img: image
        } 
    }

    const result = planets.map(p => getPlanetExtendedData(p)); 
    return result;
}
