// Do a GET to request url with parameters
const CallAPI = async (url, queryParameters) => {
  try {
    //const queryParameters =
    //  'app_id=20a4ae44&app_key=7a532b9cbfe185d11b01cc02e5d2f758&nutrition-type=logging&ingr=' +
    //  searchContent;
    //const request = 'https://api.edamam.com/api/nutrition-data?' + queryParameters;

    const request = url + '?' + queryParameters;
    const response = await fetch(request);
    if (response.status !== 200) {
      console.log('API Response with status ' + response.status + ' received');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching API : ', error);
  }
};

export default CallAPI;