import Cookies from 'js-cookie';

//async function
export async function csrfFetch(url, options = {}){
    //set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    //set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    //if the options.method is not 'GET', then 'Content-Type header is set to
        //"application/json", and 'XSRF-TOKEN header value is set to "XSRF-TOKEN" cookie
    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    //call the default window's fetch with url and the options passed in
    const res = await window.fetch(url, options);

    //if the response status code is 400 or above, throw an error w/the error being the response
    if(res.status >= 400) throw res;

    //if the response status code is under 400, return response to next promise chain
    return res;
};

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  };
