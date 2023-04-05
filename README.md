# Weather Radar

## Description
A simple responsive React.js Weather Radar application.

Displays the current weather and 3h forecast of various locations.
<br> Weather data comes from [OpenWeatherMap](https://openweathermap.org/) Weather APIs

Supports screens starting from 320px wide and up.

### Known issues
 - Looks bad on screens smaller than 320px wide.
  <br> Should create a passable fallback look for smaller screens in a future update.

## Installation | Setting up development server
You need a Node.js installation on your system to use npm install.
Get Node from https://nodejs.org/en

You need an [OpenWeatherMap](https://openweathermap.org/) api key to get data from their APIs.

### Setup:
- Clone this repository to the location of your choice.
- Navigate to the root folder, and create a file named: `.env`
  - Root folder is the one that includes files package.json and package-lock.json
- Add the following line to `.env`: <br/>`REACT_APP_API_KEY=your-apikey-here`
- Replace `your-apikey-here` with your api key from OpenWeatherMap. No quotation marks needed.
- Open the project root folder in a terminal of your choice
- Run following command to install dependencies: `npm install`

### Starting the development server:
- After running `npm install` you should be able to start the development server by running: `npm start`
- Development server can be accessed in a browser at `http://localhost:3000`

### Creating a production build:
 - To create a build, run following command in project root in a terminal: `npm run build`
 - Production build will be found in the `/build` folder
 - You can run the production version of the app by running `npm run server-start`
   
# Screenshots
Mobile             |  Desktop
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/56929826/226603935-5e8a3e96-0000-45fb-bcae-c377b9fbc193.jpg" width="auto" height="400"> | <img src="https://user-images.githubusercontent.com/56929826/226603996-0de6ce3a-f02a-4ae3-85aa-d585eab5b269.jpg" height="400">

