const api = require('./api');

/**
 * Calls API to get all the NBA teams
 * @returns an object of team names with the abbreviation as key and full name as the value
 */
async function getTeamNames() {
	let teams = await api.getTeams();
	let teamNames = {};
	teams.body.forEach((team) => {
		teamNames[team.teamAbv] = team.teamCity + ' ' + team.teamName;
	});
	return teamNames;
}

/**
 * Calls API to get the games on {date} and filter out completed games
 * @param {string} date date in the format YYYYMMDD
 * @returns an array of games that is either in progress or not started yet
 */
async function getUpcomingGamesOnDate(date) {
	let games = await api.getNBAGamesOnDate(date);
	let liveGames = [];
	Object.values(games.body).forEach((game) => {
		if (game.gameStatus !== 'Completed') {
			liveGames.push(game);
		}
	});
	return liveGames.sort((a, b) => {
		if (a.gameStatus < b.gameStatus) {
			return -1;
		} else if (a.gameStatus > b.gameStatus) {
			return 1;
		} else {
			return 0;
		}
	});
}

/**
 * Calls API to get the star player for team in game
 * Star player scores the most points in a game
 * @param {string} team team name abbreviation
 * @param {string} gameID the gameID for the game, should be in the format of YYYYMMDD_{team}@{team}
 * @returns starPlayer object with name and points scored
 */
async function getStarPlayerForTeamInGame(team, gameID) {
	let game = await api.getGameBoxScore(gameID);
	let starPlayer = {};
	let highestPts = 0;
	Object.values(game.body.playerStats).forEach((player) => {
		if (player.teamAbv !== team) {
			return;
		}
		if (Number(player.pts) > highestPts) {
			highestPts = Number(player.pts);
			starPlayer.name = player.longName;
			starPlayer.pts = player.pts;
		}
	});
	return starPlayer;
}

/**
 * Calls API to get the schedule for {team} and find the previous game {team} played based on {currentGameDate}
 * @param {string} team team name abbreviation
 * @param {string} currentGameDate the current game date in the format YYYYMMDD
 * @returns The previous game for {team} based on {currentGameDate}
 */
async function getPreviousGameForTeam(team, currentGameDate) {
	let data = await api.getTeamSchedule(team);
	let sortedSchedule = data.body.schedule.sort(sortGamesByDate);
	let currentGameIndex = binarySearch(sortedSchedule, currentGameDate);
	return sortedSchedule[currentGameIndex - 1];
}

/**
 * The sort method for sorting an array of games
 * @param {object} a the game object
 * @param {object} b the game object
 * @returns a sorted array of games based on the game date
 */
function sortGamesByDate(a, b) {
	if (a.gameDate < b.gameDate) {
		return -1;
	} else if (a.gameDate > b.gameDate) {
		return 1;
	} else {
		return 0;
	}
}

/**
 * Searches {data} array using the binary search method
 * @param {array} data an array of data for search
 * @param {*} searchValue the target value for search
 * @returns the index of matched search
 */
function binarySearch(data, searchValue) {
	// set lower limit and upper limit of the search
	let lowerLimit = 0;
	let upperLimit = data.length;
	// start searching
	while (true) {
		// set search index
		let searchIndex = Math.floor((upperLimit - lowerLimit) / 2) + lowerLimit;
		let gameDate = data[searchIndex].gameDate;
		let result = searchValue > gameDate;
		if (searchValue > gameDate) {
			lowerLimit = searchIndex;
		} else if (searchValue < gameDate) {
			upperLimit = searchIndex;
		} else {
			return searchIndex;
		}
	}
}

module.exports = {
	getStarPlayerForTeamInGame,
	getPreviousGameForTeam,
	getUpcomingGamesOnDate,
	getTeamNames,
};
