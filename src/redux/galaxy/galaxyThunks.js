import { createAsyncThunk } from '@reduxjs/toolkit'
import { parseResponse } from '../../utils/fetchUtils';
import { GET_PLANETS, GET_PLANET_DETAILS } from './constants'
import { planetsMapper, residentsMapper } from './mappers';

export const fetchAllPlanetsFilms = async planets => {
    return planets.map(p => Promise.all(p.films.map(async f => await fetch(f))));
};
export const fetchFilms = async planet => {
    return Promise.all(planet.films.map(async f => await fetch(f)));
};
export const fetchResidents = async planet => {
    return Promise.all(planet.residents.map(async f => await (await fetch(f)).json()));
};

export const fetchPlanets = createAsyncThunk(GET_PLANETS, async () => {
    const response = await fetch('https://swapi.dev/api/planets/')
        .then(async planets => await parseResponse(planets));

    const mappedPlanets = planetsMapper(response);
    return mappedPlanets;
});

export const fetchPlanetDetails = createAsyncThunk(GET_PLANET_DETAILS, async (planet) => {
    if (!(planet)) {
        return null;
    }

    const residents = await fetchResidents(planet);

    return {
        ...planet,
        residents: residentsMapper(residents)
    };
});
