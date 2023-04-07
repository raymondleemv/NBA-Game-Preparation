import fetch from 'node-fetch';

/**
 * Call the YouTube search API to get a list of search results based on keyword
 * @param {string} keyword Search YouTube with this keyword
 * @returns YouTube search result
 */
async function searchYouTube(keyword) {
	const REQ_URL = 'https://www.googleapis.com/youtube/v3/search';
	const API_KEY = process.env.GOOGLE_YOUTUBE_API_KEY;
	let queryParameters = '?part=snippet';
	queryParameters += '&maxResults=10';
	queryParameters += `&q=${encodeURIComponent(keyword)}`;
	queryParameters += `&key=${API_KEY}`;
	let response = await fetch(REQ_URL + queryParameters);
	let data = await response.json();
	return data;
}

/**
 * Call the API to get today's NBA schedule
 * @returns All Today's NBA games
 */
async function getNBAGamesOnDate(date) {
	const REQ_URL =
		'https://tank01-fantasy-stats.p.rapidapi.com/getNBAScoresOnly';
	let queryParameters = `?gameDate=${date}`;
	let response = await fetch(REQ_URL + queryParameters, {
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_NBA_API_KEY,
			'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com',
		},
	});
	let data = await response.json();
	return data;
}

/**
 * Call the API to get all NBA teams
 * @returns All NBA teams
 */
async function getTeams() {
	const REQ_URL = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams';
	let response = await fetch(REQ_URL, {
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_NBA_API_KEY,
			'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com',
		},
	});
	let data = await response.json();
	return data;
}

/**
 * Call the API to get the schedule of a NBA team
 * @param {string} teamAbv team name abbreviation
 * @returns the schedule of {teamAbv}
 */
async function getTeamSchedule(teamAbv) {
	const REQ_URL =
		'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeamSchedule';
	let queryParameters = `?teamAbv=${teamAbv}`;
	let response = await fetch(REQ_URL + queryParameters, {
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_NBA_API_KEY,
			'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com',
		},
	});
	let data = await response.json();
	return data;
}

/**
 * Call the API to get the game stats of {gameID}
 * @param {string} gameID the gameID for the game, should be in the format of YYYYMMDD_{team}@{team}
 * @returns Game stats of {gameID}
 */
async function getGameBoxScore(gameID) {
	const REQ_URL = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBABoxScore';
	let queryParameters = `?gameID=${gameID}`;
	let response = await fetch(REQ_URL + queryParameters, {
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_NBA_API_KEY,
			'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com',
		},
	});
	let data = await response.json();
	return data;
}

export {
	searchYouTube,
	getNBAGamesOnDate,
	getTeamSchedule,
	getGameBoxScore,
	getTeams,
};
