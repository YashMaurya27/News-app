export const GET = (endpoint, params = {}, fullURL = false) => {

    let url = '';
    if (!fullURL) {
        url = 'https://newsapi.org/v2/' + endpoint;
        const paramKeys = Object.keys(params);

        if (paramKeys.length > 0) {
            url += '?';
            Object.keys(params).forEach((item, index) => {
                url += (item + '=' + params[item]);
                if (index < paramKeys.length - 1)
                    url += '&'
            });
        }
    }
    else {
        url = endpoint;
    }
    return fetch(url, {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((e) => {
            // console.log(e);
            if (e.status === 'ok') {
                return {
                    success: true,
                    message: 'Data fetched',
                    data: e
                }
            }
        })
        .catch((e) => {
            return { success: false, message: 'Something went wrong', data: [] };
        });
}