# SREiendom

This is a web application where users can search for accommodations in Norway.

## About the project

SREiendom is a web application that allows users to find accommodation throughout Norway. In order to simplify and speed up the search for accommodations has been added a field with filtering and a map with binding that shows the exact location. On the front page you can see the cards with information about accommodations, slideshows and like buttons to add a card to the wishlist. By clicking on an accommodation container, you can get detailed information with a gallery, the list of essentials and a map. The page about us contains information about the company, which is also was obtained from the data base.

## Features

- Data base with all accommodations and information about company
- Filter by category, property type, county, number of beds, price range
- Ability to search for
- Mapbox with binding
- Carousel
- Wishlist
- Animation on scroll
- Responsive layout depending on the device screen size
- Keyboard navigation
- Hamburger menu
- Popup on accommodation container click with gallery, accommodation details and the exact location of an accommodation
- Popup on marker click on the map
- Zoom to marker on click on the map
- Ability to scroll up on button click
- Dynamic about us page using mapbox

### The project is build with

- HTML5
- CSS3
- CSS Flexbox
- CSS Grid
- JavaScript
- Sanity Studio
- Query language GROQ
- Mapbox
- Figma

## Process
### Minimum Viable Product (MVP)

The MVP for this project was a web application which contains header, footer, displays accommodations with information, and has ability to filter accommodations by property type, county name and the number of beds. 

![MVP](/_app/assets/images/mvp.jpeg)

In the images below you can se the project planning process.

![Screenshot of the GitHub project](/_app/assets/images/github_project_first.jpeg)
![Screenshot of the GitHub project](/_app/assets/images/github_project_second.jpeg)
![Screenshot of the GitHub project](/_app/assets/images/github_project_third.jpeg)

### Data base model

The database consists of three documents: accommodation, county and information about us. In the accommodation scheme, when choosing a region, we refer to the document county. In order to see the database model in more detail, I have attached an image of the database diagram.

![Data base model](/_app/assets/images/data_base_model.jpeg)

### Access

http://localhost:5500
http://localhost:3333

## Links

- Project: https://github.com/users/SergeiRavinski/projects/5
- Projects repository: https://github.com/SergeiRavinski/SREiendom
- Live demo: https://sreiendom.netlify.app