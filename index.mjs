//import required modules
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import * as api from './js/api.mjs';
import * as func from './js/functions.mjs';

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

app.set('views', './views');
app.set('view engine', 'pug');
//setup public folder
app.use(express.static('./public'));

let teamNames;

//PAGE ROUTES
app.get('/', async (request, response) => {
	// get the upcoming (either in progress or games not started yet) games today because there is no point preparing for a finished game
	// https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
	var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
	var today = new Date(Date.now() - tzoffset);
	today = today.toISOString().split('T')[0].replaceAll('-', '');
	let gameList = await func.getUpcomingGamesOnDate(today);
	response.render('index', {
		title: 'API Project',
		games: gameList,
		date: today,
	});
});

app.get('/team', async (request, response) => {
	// get the team name from the query parameter
	let team = request.query.name;
	// get the previous game for team (which should already be finished -> so that the player stats would be available)
	let lastGame = await func.getPreviousGameForTeam(
		team,
		request.query.currentGameDate
	);
	// get some of the info for displaying the star player of the team
	let lastGameInfo = {};
	if (lastGame.away !== team) {
		lastGameInfo.opponent = teamNames[lastGame.away];
	} else {
		lastGameInfo.opponent = teamNames[lastGame.home];
	}
	lastGameInfo.date = lastGame.gameDate;
	// get the star player, which would be the player who scored the most points in the last game for this team
	let starPlayer = await func.getStarPlayerForTeamInGame(team, lastGame.gameID);
	// search YouTube for this player's highlights
	let searchResult = await api.searchYouTube(`${starPlayer.name} Highlights`);
	response.render('team', {
		title: 'API Project',
		teamName: teamNames[team],
		starPlayer: starPlayer,
		lastGame: lastGameInfo,
		highlights: searchResult.items,
	});
});

app.get('/update', async (request, response) => {
	// This endpoint is for updating necessary info for the app such as the team names should there be any changes when the app is hosted, so that it does not need to be re-run.
	teamNames = await func.getTeamNames();
});

//set up server listening
app.listen(port, async () => {
	// Get the team names before the app runs
	teamNames = await func.getTeamNames();
	console.log(`Listening on http://localhost:${port}`);
});
