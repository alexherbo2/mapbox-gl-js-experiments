// Mapbox GL JS
// https://docs.mapbox.com/mapbox-gl-js/api/

function MapboxGL(self) {

  self.getURL = ({ searchText }) => {
    const endpoint = 'mapbox.places'

    return `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=${self.accessToken}`
  }

  self.search = async (address) => {
    const response = await fetch(self.getURL({
      searchText: address
    }))

    // Get our data
    const data = await response.json()

    // Decision: Get the first result.
    // Motivation: User interface.  Type more text to refine the search.
    const [feature] = data.features

    return feature
  }

  return self

}
