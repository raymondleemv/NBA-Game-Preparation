# NBA Game Preparation

The NBA game preparation app lists all the upcoming NBA games today, both ones in progress and ones that have not yet started. By clicking the team logos, information about the star player of that team a list of YouTube videos about this player's highlights will be shown, so that you can prepare yourself for this team's upcoming game, knowing that the player will be one of the key points of the match.

## Warm Reminder

The NBA game preparation only shows games if there is at least one game scheduled today. If you dont see a game in this app, try again when there is a game scheduled!

This application uses the Rapid API and Google YouTube API and they both restrict the amount of API requests to 100/day. If you see error messages showing the amount of API calls have exceeded the limit today, try again tomorrow!

## Steps to use this app

1. Clone this repository
2. Go to the project folder `cd NBA-Game-Preparation`
3. run `npm i`
4. Go to [Google API developer console](https://console.cloud.google.com/) and [Rapid API - Tank 01 Fantasy Stats](https://rapidapi.com/tank01/api/tank01-fantasy-stats) to generate your own API Keys
5. Rename the `.env.example` file to `.env` and replace the API Keys with your own.
6. run `npm start`
