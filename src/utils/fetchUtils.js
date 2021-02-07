export const getRequest = () => {
    let content = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };

    return content;
};

export const postRequest = (params, headers) => {
    let content = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(params)
    };

    return content;
};

export const parseResponse = response => {
    return response.json().then(json => {
        if (!response.ok && !(json?.results)) {
            return undefined;
        }

        return json.results;
    }).catch(error => console.error(`Error when parsing response json: ${error}`));
};
