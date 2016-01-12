/* BIOGRAPHY
----------------------------------*/

/**
  * JSON strict RFC 4627 spec requires names / keys to be in double quotes
  * also jsonlint.com won't work if you use single quotes
  */
var bio = {
  "name": "Kara Danvers",
  "role": "Supergirl",
  "contacts" : {
    "mobile": "555-324-5983",
    "email": "kara.danvers@catco.com",
    "github": "supergirl",
    "twitter": "@supergirlcbs",
    "location": "National City"
  },
  "welcomeMessage": "To most people I'm an assistant at Catco Worldwide Media. But in secret, I work with my adoptive sister for the DEO to protect my city from alien life and anyone else that means to cause it harm. I am Supergirl.",
  "skills": ["Super strength", "Flight","Invulnerability","Super hearing","X-ray vision","Solar energy absorption"],
  "biopic": "images/supergirl.gif"
}

bio.display = function() {
  var formattedName = '',
      formattedRole = '',
      contact = '',
      formattedContact = '',
      formattedBioPic = 'http://placehold.it/110x150',
      formattedWelcomeMsg = '',
      formattedSkills = '';

  formattedRole = HTMLheaderRole.replace('%data%', bio.role);
  $('#header').prepend(formattedRole);

  formattedName = HTMLheaderName.replace('%data%', bio.name);
  $('#header').prepend(formattedName);

  $.each(bio.contacts, function(key, value) {
    // html here so i can re-use it in the loop
    contact = '<li><i class="icons icon-%icon%"></i> %contact%</li>';
    formattedContact += contact.replace('%icon%', key).replace('%contact%', value);
  }); // $.each

  $('#topContacts').append(formattedContact);
  $('#footerContacts').append(formattedContact);

  formattedWelcomeMsg = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);
  $('#bio').prepend(formattedWelcomeMsg);

  formattedBioPic = HTMLbioPic.replace('%data%', bio.biopic);
  $('#bio').prepend(formattedBioPic);

  if(bio.skills.length > 0) {
    $(HTMLskillsStart).insertAfter('.welcome-message');
    $.each(bio.skills, function(key, value) {
      formattedSkills = HTMLskills.replace('%data%', value);
      $('#skills:last').append(formattedSkills);
    }); // $.each skills
  } // if
} // bio.display

/* EDUCATION
----------------------------------*/
var education = {
  "schools": [
    {
      "name": "Arapahoe School",
      "location": "Centennial, CO",
      "degree": "Bachelors",
      "majors": ["Marketing", "Business"],
      "dates": "2003-2007",
      "url": "https://en.wikipedia.org/wiki/Arapahoe_High_School_(Colorado)"
    },
    {
      "name": "Marymount Manhattan College",
      "location": "New York City, NY",
      "degree": "Masters",
      "majors": ["Drama"],
      "dates": "2011",
      "url": "http://http://www.mmm.edu"
    }
  ],
  "onlineCourses": [
    {
      "title": "Javascript Basics",
      "school": "Udacity",
      "date": "2016",
      "url": "https://www.udacity.com/wiki/ud804"
    },
    {
      "title": "Intro to jQuery",
      "school": "Udacity",
      "date": "2016",
      "url": "https://www.udacity.com/wiki/ud245"
    }
  ]
}

education.display = function() {
  var formattedName = '',
      formattedDegree = '',
      formattedDates = '',
      formattedLoc = '',
      formattedMajor = '',
      formattedTitle = '',
      formattedSchool = '',
      formattedDate = '',
      formattedURL = '';

  $.each(education.schools, function(index, schoolsObj) {
    // inserts .education-entry div
    $('#education').append(HTMLschoolStart);

    formattedName = HTMLschoolName.replace('%data%', schoolsObj.name).replace('%url%', schoolsObj.url);
    formattedDegree = HTMLschoolDegree.replace('%data%', schoolsObj.degree);
    $('.education-entry:last').append(formattedName + formattedDegree);

    formattedDates = HTMLschoolDates.replace('%data%', schoolsObj.dates);
    $('.education-entry:last').append(formattedDates);

    formattedLoc = HTMLschoolLocation.replace('%data%', schoolsObj.location);
    $('.education-entry:last').append(formattedLoc);

    if(schoolsObj.majors.length > 0) {
      $.each(schoolsObj.majors, function(key, value) {
        formattedMajor = HTMLschoolMajor.replace('%data%', value);
        $('.education-entry:last').append(formattedMajor);
      }); // $.each majors
    } // if
  }); // $.each schools

  $.each(education.onlineCourses, function(index, onlineCoursesObj) {
    // insert the header only once
    if(index == 0) $('#education').append(HTMLonlineClasses);

    // inserts .education-entry div
    $('#education').append(HTMLschoolStart);

    formattedTitle = HTMLonlineTitle.replace('%data%', onlineCoursesObj.title);
    formattedSchool = HTMLonlineSchool.replace('%data%', onlineCoursesObj.school);
    $('.education-entry:last').append(formattedTitle + formattedSchool);

    formattedDate = HTMLonlineDates.replace('%data%', onlineCoursesObj.date);
    $('.education-entry:last').append(formattedDate);

    formattedURL = HTMLonlineURL.replace('%data%', onlineCoursesObj.url);
    $('.education-entry:last').append(formattedURL);
  }); // $.each onlineCourses
} // education.display

/* WORK
----------------------------------*/
var work = {
  "jobs": [
    {
      "employer": "CatCo Worldwide Media",
      "title": "Personal Assistant",
      "location": "National City",
      "dates": "2015-Present",
      "description": "Do not question Cat Grant and do everything she says."
    },
    {
      "employer": "Department of Extranormal Operations (DEO)",
      "title": "Agent",
      "location": "Classified",
      "dates": "2015-Present",
      "description": "Monitor those with extranormal superpowers and prevent any threat to the general public."
    }
  ]
}

work.display = function() {
  var formattedEmployer = '',
      formattedTitle = '',
      formattedLoc = '',
      formattedDates = '',
      formattedDesc = '',
      formattedAll = '';

  $.each(work.jobs, function(index, jobsObj) {
      // inserts .work-entry div
      $('#workExperience').append(HTMLworkStart);

      formattedEmployer = HTMLworkEmployer.replace('%data%', jobsObj.employer);
      formattedTitle = HTMLworkTitle.replace('%data%', jobsObj.title);
      formattedLoc = HTMLworkLocation.replace('%data%', jobsObj.location);
      formattedDates = HTMLworkDates.replace('%data%', jobsObj.dates);
      formattedDesc = HTMLworkDescription.replace('%data%', jobsObj.description);
      formattedAll = formattedEmployer + formattedTitle + formattedDates + formattedLoc + formattedDesc;

      $('#workExperience .work-entry:last').append(formattedAll);
  }); // $.each
} // function()

/* PROJECTS
----------------------------------*/
var projects = {
  "projects": [
    {
      "title": "Kryptonite",
      "dates": "2012",
      "description": "A radioactive element from Superman's home planet of Krypton.",
      "images": ["http://placehold.it/150x150", "https://placeimg.com/150/150/tech", "https://placebear.com/150/150"]
    },
    {
      "title": "Reactron",
      "dates": "2014",
      "description": "A biomedical tech suit powered by Thorium 232.",
      "images": ["http://placehold.it/150x150", "https://placeimg.com/150/150/nature", "https://placebear.com/150/150"]
    }
  ]
}

projects.display = function() {
  var formattedTitle = '',
      formattedDates = '',
      formattedDesc = '',
      formattedImg = '';

  $.each(projects.projects, function(index, projectObj) {
    // inserts .project-entry div
    $('#projects').append(HTMLprojectStart);

    formattedTitle = HTMLprojectTitle.replace('%data%', projectObj.title);
    $('.project-entry:last').append(formattedTitle);

    formattedDates = HTMLprojectDates.replace('%data%', projectObj.dates);
    $('.project-entry:last').append(formattedDates);

    formattedDesc = HTMLprojectDescription.replace('%data%', projectObj.description);
    $('.project-entry:last').append(formattedDesc);

    if(projectObj.images.length > 0) {
      $.each(projectObj.images, function(key, value) {
        formattedImg = HTMLprojectImage.replace('%data%', value);
        $('.project-entry:last').append(formattedImg);
      }); // $.each images
    } // if
  }); // $.each
} // projects.display

/* DISPLAY
----------------------------------*/
bio.display();
work.display();
projects.display();
education.display();

/* GOOGLE MAP
----------------------------------*/
$('#mapDiv').append(googleMap);
$('#mapDiv').append(internationalizeButton);