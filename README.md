# Super Amazing Trivia Game!  Wow!
---

## About

[Super Amazing Trivia Game](https://super-amazing-trivia-game.onrender.com/) is a live, multi-player trivia game.  Grab a friend or co-worker (or two, or three, or eight; it supports up to 9 players!) and see who knows more random trivia!

You are looking at the repository for the front end.  The back end can be found at [https://github.com/AlpineCurt/capstone2-backend](https://github.com/AlpineCurt/capstone2-backend).

## Features
### Live Multi-player

Using websockets, a each player maintains a constant connection to the server to send and receive game data.  The amount of updates being sent and received during a game is too much for a RESTful API, and with the addition of both client and server side timers, websockets are a better tool.

### Trivia Database

Using the [Open Trivia DB](https://opentdb.com/), the game provides over 4,000 multiple-choice questions.  If users play more than one game together, a token is used to ensure they don't get the same questions again.

### Chatting

Multi-player games need a way for users to communicate, and chatting is provided in game by speech bubbles from their avatar.

### High Scores

High scores are kept using a PostgreSQL database.  When a player achieves a new high score, they're added to the database. 

## Testing

```
npm run test
```

## User Flow

### Home Page

Links to High Scores and Game Rules and Credits are here.  Users enter a username and either start a new game or join an existing game.  If they're starting a new game, a new random five consonant string is generated (after being verified on the back end that the string isn't already in use) and the user is taken to a new game lobby.  If a player is joining a game, they enter the five character string and are taken to the lobby of that game.

### Game Lobby

The lobby is where players gather before the game begins.  The player who started the game is designated the "Host" and can start the game at any time.  Players are able to chat with other players in the same game.  Once everyone has joined the game, the host clicks "Begin Game".

### In Game

Chatting is allowed throughout the game.  The game flow proceeds as follows:

- A question is displayed for five seconds
- The multiple choice answer options will appear and a timer countdown begins.
- As players select answers, the text "Answered!" will appear above their avatar.  The player's answer choice is not displayed.
	- The faster players answer, the more points they're receive.
	- Letting the timer reach 0 will give a point penalty.
- When all players have answered or time runs out, the correct answer will pulsate for a few seconds. At the same time, the text above each avatar will say if they got it correct or not.
- The next question gets displayed and this repeats for 10 questions.
- Once all 10 questions are complete, players are taken to:

### Results

The player with the highest score is displayed as the winner and everyone else is listed in order of their scores.  Chatting is still enabled.  Links to the High Scores page is displayed, and the host has the option to start a new game.

## Tech Stack
**React** - This is a single page app built with React.  
**WebSockets** - The majority of communication with the back end uses websockets.  It uses a browsers built-in websockets.  
**Axios** - Non-websocket communiation with the backend is handled using Axios in api.js.
