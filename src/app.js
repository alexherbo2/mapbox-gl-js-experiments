// Mapbox GL JS
// https://docs.mapbox.com/mapbox-gl-js/api/

// Get your access token here:
// https://account.mapbox.com
const ACCESS_TOKEN = 'pk.eyJ1IjoiYWxleGhlcmJvMiIsImEiOiJja2Rpam45MmwwNWx5MnhxMzBweHhxdmVlIn0.4EdUAMoqc5olgqDnkY0TQQ'

// Give Mapbox GL our access token.
mapboxgl.accessToken = ACCESS_TOKEN

// Get API URL
const getAPIURL = ({ endpoint, searchText, accessToken }) => (
  `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=${accessToken}`
)

// Elements
const elements = {}

elements.address = document.getElementById('address')
elements.longitude = document.getElementById('longitude')
elements.latitude = document.getElementById('latitude')

const fetchMapboxData = async (address) => {
  const response = await fetch(getAPIURL({
    searchText: address,
    endpoint: 'mapbox.places',
    accessToken: ACCESS_TOKEN
  }))

  // Get our data
  const data = await response.json()

  // Decision: Get the first result.
  // Motivation: User interface.  Type more text to refine the search.
  const [feature] = data.features

  return feature
}

elements.address.addEventListener('input', async (event) => {
  const data = await fetchMapboxData(address.value)

  // Update the coordinates (longitude and latitude).
  const [longitude, latitude] = data.center
  elements.longitude.textContent = longitude
  elements.latitude.textContent = latitude

  // Draw the map
  // https://docs.mapbox.com/mapbox-gl-js/api/map/
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: data.center,
    zoom: 12
  })

  // Position the marker on the map.
  // https://docs.mapbox.com/mapbox-gl-js/api/markers/
  const marker = new mapboxgl.Marker
  marker.setLngLat(data.center)
  marker.addTo(map)
})
