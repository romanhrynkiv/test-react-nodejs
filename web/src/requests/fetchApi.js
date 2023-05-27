export const fetchApi = async (endpoint, method = 'GET', body = null, params = {}) => {

    let url = `http://localhost:8080/api${endpoint}`

    const options = {
        method,
    };

    if (body) {
        if (typeof body.file !== 'string') {
            const formData = new FormData();

            formData.append('name', body.name);
            formData.append('surname', body.surname);
            formData.append('description', body.description);
            formData.set('avatar', body.avatar);

            options.body = formData;
        } else {
            options.body = JSON.stringify(body);
            options.headers = {
                'Content-Type': 'application/json',
            };
        }
    }

    if (Object.keys(params).length > 0) {
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        url += `?${queryString}`;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}
