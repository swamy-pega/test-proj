/**
 * Calculates and displays the location of the 'Eiffel Tower'
 * using a landmark geocoding search
 *
 *
 * A full list of available request parameters can be found in the Geocoding and Search API documentation.
 * see: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1discover/get
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */


function landmarkGeocode(platform) {
  var geocoder = platform.getSearchService(),
      landmarkGeocodingParameters = {
        q: 'Eiffel Tower',
        at: '0,0',
        limit: 1
      };

  geocoder.discover(
    landmarkGeocodingParameters,
    onSuccess,
    onError
  );
}

/**
 * This function will be called once the Geocoder REST API provides a response
 * @param  {Object} result A JSON object representing the location(s) found.
 * See: https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1discover/get
 */
function onSuccess(result) {
  console.log('Found ' + result.items.length + ' locations');
  var locations = result.items;
 /*
  * The styling of the geocoding response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addLocationsToMap(locations);
  addLocationsToPanel(locations);
  // ... etc.
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
  alert('Can\'t reach the remote server');
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  
  apikey: 'DlqeuMym9uodgxow7dJBpcLJypNMo3p5WbukDvfSW8I'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over California
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:37.376, lng:-122.034},
  zoom: 15,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

var locationsContainer = document.getElementById('panel');

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Hold a reference to any infobubble opened
var bubble;

/**
 * Opens/Closes a infobubble
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text){
 if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

/**
 * Creates a series of list items for each location found, and adds it to the panel.
 * @param {Object[]} locations An array of locations as received from the
 *                             H.service.GeocodingService
 */
function addLocationsToPanel(locations){

  var nodeOL = document.createElement('ul'),
      i;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';


  for (i = 0;  i < locations.length; i += 1) {
    let location = locations[i],
        li = document.createElement('li'),
        divLabel = document.createElement('div'),
        content =  '<strong style="font-size: large;">' + location.title  + '</strong></br>';
        position = location.position;

      content += '<strong>houseNumber:</strong> ' + location.address.houseNumber + '<br/>';
      content += '<strong>street:</strong> '  + location.address.label + '<br/>';
      content += '<strong>district:</strong> '  + location.address.district + '<br/>';
      content += '<strong>city:</strong> ' + location.address.city + '<br/>';
      content += '<strong>postalCode:</strong> ' + location.address.postalCode + '<br/>';
      content += '<strong>county:</strong> ' + location.address.county + '<br/>';
      content += '<strong>country:</strong> ' + location.address.countryName + '<br/>';
      content += '<strong>position:</strong> ' +
        Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
        ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W') + '<br/>';

      divLabel.innerHTML = content;
      li.appendChild(divLabel);

      nodeOL.appendChild(li);
  }

  locationsContainer.appendChild(nodeOL);
}


/**
 * Creates a series of H.map.Markers for each location found, and adds it to the map.
 * @param {Object[]} locations An array of locations as received from the
 *                             H.service.GeocodingService
 */
function addLocationsToMap(locations){
  var group = new  H.map.Group(),
      i;

  // Add a marker for each location found
  for (i = 0;  i < locations.length; i += 1) {
    let location = locations[i];
    marker = new H.map.Marker(location.position);
    marker.label = location.title;
    group.addObject(marker);
  }

  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getGeometry());
    openBubble(
       evt.target.getGeometry(), evt.target.label);
  }, false);

  // Add the locations group to the map
  map.addObject(group);
  map.getViewModel().setLookAtData({
    bounds: group.getBoundingBox()
  });
  map.setZoom(Math.min(map.getZoom(), 16));
}

// Now use the map as required...
landmarkGeocode(platform);
