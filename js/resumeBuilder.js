$(function() {

/* MODEL
----------------------------------*/
var model = {
    bio: {
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
    }, // bio

    education: {
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
    }, // education

    work: {
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
    }, // work

    projects: {
        "projects": [
            {
                "title": "Kryptonite",
                "dates": "2012",
                "description": "A radioactive element from Superman's home planet of Krypton.",
                "images": ["images/kryptonite1.jpg", "images/kryptonite2.jpg"]
            },
            {
                "title": "Reactron",
                "dates": "2014",
                "description": "A biomedical tech suit powered by Thorium 232.",
                "images": ["images/reactron1.jpg", "images/reactron2.jpg"]
            }
        ]
    } // projects

}; // model

/* CONTROLLER
----------------------------------*/
var controller = {

}; // controller

/* VIEW
----------------------------------*/
var view = {

}; // view

}());