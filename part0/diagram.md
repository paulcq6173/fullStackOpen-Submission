# Diagram for part0 exercise

## 0.4: New note diagram

The browser fetches the HTML code defining the content and the structure of the page from the server using an HTTP GET request.

Links in the HTML code cause the browser to also fetch the CSS style sheet main.css and the JavaScript code file main.js

The browser executes the JavaScript code. The code makes an HTTP GET request to the address https://studies.cs.helsinki.fi/exampleapp/data.json, which returns the notes as JSON data.

When the data has been fetched, the browser executes an event handler, which renders the notes to the page using the DOM-API.

## 0.5: Single page app diagram

A single-page app version of our example application can be found at https://studies.cs.helsinki.fi/exampleapp/spa. 

At first glance, the application looks exactly the same as the previous one. 

The HTML code is almost identical, but the JavaScript file is different (spa.js) and there is a small change in how the form-tag is defined:<br/>
The form has no action or method attributes to define how and where to send the input data.<br/>
When you now create a new note, you'll notice that the browser sends only one request to the server.

The SPA version of the app does not traditionally send the form data, but instead uses the JavaScript code it fetched from the server. We'll look into this code a bit, even though understanding all the details of it is not important just yet.

## 0.6: New note in Single page app diagram

The Notes page contains a form element.

When the button on the form is clicked, the browser will send the user input to the server.

Surprisingly, submitting the form causes no fewer than five HTTP requests. 

The first one is the form submit event. It is an HTTP POST request to the server address new_note.

The server responds with HTTP status code 302. This is a URL redirect, with which the server asks the browser to do a new HTTP GET request to the address defined in the header's Location - the address notes.

So, the browser reloads the Notes page. The reload causes three more HTTP requests: fetching the style sheet (main.css), the JavaScript code (main.js), and the raw data of the notes (data.json).

The Form tag has attributes action and method, which define that submitting the form is done as an HTTP POST request to the address new_note.

Data is sent as the body of the POST request.

The server can access the data by accessing the req.body field of the request object req.

The server creates a new note object, and adds it to an array called notes.

Each note object has two fields: content containing the actual content of the note, and date containing the date and time the note was created.

The server does not save new notes to a database, so new notes disappear when the server is restarted.








