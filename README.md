# Time Stories Scraper

This is a simple Node.js application that fetches the latest stories from https://time.com/ and returns them as a JSON response through a web server. The application listens on port 8000 and responds to requests made to the /getTimeStories endpoint.

# Features
1-Fetches the latest stories from TIME.com.
2-Parses the HTML to extract story titles and links.
3-Returns the top 6 stories in JSON format.

# Prerequisites
Node.js installed on the system.

# Usage
1- Start the server by running the following command in your terminal: node server.js
2- Open your browser and go to: http://localhost:8000/getTimeStories
3- You should receive a JSON response containing the latest stories from https://time.com/

# Project Structure
server.js: The main file containing the server setup, HTML fetching, and parsing logic.

# How It Works
1-The server is created using Node.js's built-in http module.
2-The fetchHTML function makes an HTTPS GET request to https://time.com/ and retrieves the HTML content.
3-The parseStories function extracts the top 6 stories by finding the relevant HTML tags and parsing out the titles and links.
4-The /getTimeStories endpoint returns these stories as a JSON response.

# Error Handling
1-If there is an error while fetching the HTML, it will be logged to the console.
2-If the server receives any request other than a GET request to /getTimeStories, it will return a 404 status with a "Not Found" message.

