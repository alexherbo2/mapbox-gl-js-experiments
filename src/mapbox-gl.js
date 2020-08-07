// Mapbox GL JS
// https://docs.mapbox.com/mapbox-gl-js/api/

function MapboxGL(self) {

  self.getURL = ({ searchText }) => {
    const endpoint = 'mapbox.places'

    return `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=${self.accessToken}`
  }

  self.search = (address) => {
    // Decision: Get the first result.
    // Motivation: User interface.  Type more text to refine the search.
    return fetch(self.getURL({ searchText: address }))
      .then((response) => response.json())
      .then((data) => data.features[0])
  }

  return self

}
