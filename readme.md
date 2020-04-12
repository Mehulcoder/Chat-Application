# # ChatApp

## [Live Demo](https://mehul-chat-app.herokuapp.com/) 


## Features

-   Join a specified room to chat
    
-   Send the geographical location to other users in the room if permission is granted
    
-   Automatically scroll down upon receiving a new message
    
-   Responsive web design (RWD)


## [](https://github.com/rubychi/udemy-chatapp#getting-started)Getting Started

Follow the instructions below to set up the environment and run this project on your local machine

### [](https://github.com/rubychi/udemy-chatapp#prerequisites)Prerequisites

-   Node.js

### [](https://github.com/rubychi/udemy-chatapp#installing)Installing

1.  Download ZIP or clone this repo

```
> git clone https://github.com/Mehulcoder/Chat-Application.git
```

2.  Install dependencies via NPM

```
> npm install
```

5.  Back to the root directory and type the below command to start the server and the service

```
> npm run dev
```

6.  See it up and running on  [http://localhost:8000](http://localhost:8000/)

## [](https://github.com/rubychi/udemy-chatapp#deployment)Deployment

1.  Deploy to Heroku

```
> heroku create
> git push heroku master
```

2.  Open the app in the browser

```
> heroku open
```



## [](https://github.com/rubychi/udemy-chatapp#built-with)Built With

### [](https://github.com/rubychi/udemy-chatapp#frontend)Frontend

-   jquery
-   mustache

### [](https://github.com/rubychi/udemy-chatapp#backend)Backend

-   express
-  NodeJS
-   compression
-   helmet

### [](https://github.com/rubychi/udemy-chatapp#utils)Utils

-   socket.io
-   moment


##  Notes

-   Send an event to everybody in the room 'The Office Fans'

```
io.emit -> io.to('The Office Fans').emit

```

-   Send an event to everybody in the room 'The Office Fans' except for the current user

```
socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit

```

-   Send an event to a specific user

```
socket.emit
```

## Authors

- [Mehul Chaturvedi](https://github.com/Mehulcoder)