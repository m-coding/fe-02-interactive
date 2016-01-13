/* VARIABLES
----------------------------------*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span>';

var HTMLcontactGeneric = '<li class="flex-item"><span>%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span>mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span>email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span>twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span>github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span>blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span>location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' — %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="%url%">%data%';
var HTMLschoolDegree = ' — %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineStart = '<div class="online-entry"></div>';
var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' — %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

/* INTERNATIONAL NAME CONVERTER
----------------------------------*/

/**
 * Converts the last name to all capital letters.
 *
 * @return {string} international name
 */
function inName() {
  var name = bio.name,
      intlName = '';

  name = name.trim().split(' ');
  name[1] = name[1].toUpperCase();
  name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
  intlName = name.join(' ');

  return intlName;
} // inName()

$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function(){};
    $('#name').html(iName);
  });
}); // document.ready

/* CLICK LOCATION LOGGER
----------------------------------*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );

  // check that the console is open, before logging anything
  if(window.console)
     console.log('x location: ' + x + '; y location: ' + y);
} // logClicks()

$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x,y);
}); // document.click

/* GOOGLE MAPS
----------------------------------*/
var map;

/**
 * Displays a Google Map
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference
 */
function initializeMap() {
  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /**
   * Returns an array of every location string from
   * the JSONs written for bio, education, and work.
   *
   * @return {string[]} locations
   */
  function locationFinder() {
    var locations = [];

    locations.push(bio.contacts.location);

    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    work.jobs.forEach(function(job){
      if(job.location != "Classified") // skip this location
         locations.push(job.location);
    });

    return locations;
  } // locationFinder()

  /**
   * Reads Google Places search results to create map pins.
   *
   * @param {object} placeData Information about a single location.
   */
  function createMapMarker(placeData) {
    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are helper windows that open when you click/hover over a pin
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // open the infoWindow when a marker is clicked
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /**
   * If search results are returned, creates a new map marker for that location.
   *
   * @param {object} results
   * @param {string} status
   */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /**
   * Takes locations created by locationFinder() and fires off
   * Google place searches for each location.
   *
   * @param {string[]} locations
   */
  function pinPoster(locations) {
    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // creates pins on the map for each location in the locations array
  pinPoster(locations);

} // initializeMap()

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
window.addEventListener('resize', function(e) {
  map.fitBounds(mapBounds); // Make sure the map bounds get updated on page resize
});
