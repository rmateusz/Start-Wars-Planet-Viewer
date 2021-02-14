export const parseResponse = response => {
    return response.json().then(json => {
        if (!response.ok && !(json?.results)) {
            return undefined;
        }

        return json.results;
    }).catch(error => console.error(`Error when parsing response json: ${error}`));
};
