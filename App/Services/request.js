/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

function parseHTML(response) {
  debugger;
  return response.text();
}

function parseBlob(response) {
  // console.log(response.getFirstHeader('Content-Disposition'));
  // return {
  //   body: response.blob()
  //   filename: response.
  // };
  return response.blob();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, isHTML) {
  if (isHTML) {
    return fetch(url, options)
      .then((response) =>response)
      .then((responseJson) => {
        debugger;
        return responseJson.url;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      if (!error.status) {
        // toastr.error('Unable to connect to internet. Please check your connection once and refresh', { timeOut: 15000 });
      }
      throw error;
    });
}
