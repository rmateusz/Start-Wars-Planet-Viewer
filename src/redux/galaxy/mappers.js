import { mockData } from './mockData';
import RandomPlanetImg from '../../assets/img/planets/RandomPlanet.png';
import { imagePlanetsDictionary, imageResidentsDictionary } from './imageDictionaries';

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
        let img = imagePlanetsDictionary[planetName];

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
