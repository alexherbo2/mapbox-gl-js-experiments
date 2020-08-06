// Mapbox GL JS
// https://docs.mapbox.com/mapbox-gl-js/api/
mapboxgl = MapboxGL(mapboxgl)

// Get your access token here:
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGhlcmJvMiIsImEiOiJja2Rpam45MmwwNWx5MnhxMzBweHhxdmVlIn0.4EdUAMoqc5olgqDnkY0TQQ'

// Elements
const elements = {}

elements.address = document.getElementById('address')
elements.longitude = document.getElementById('longitude')
elements.latitude = document.getElementById('latitude')

elements.address.addEventListener('input', async (event) => {
  const data = await mapboxgl.search(address.value)

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
