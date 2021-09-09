const axios = require('axios');
const { response, request } = require('express');

const sortPlayersByHeight = (players) => {
  return players.sort((first, second) => first.h_in - second.h_in);
};

const getMapFromArray = (players) => {
  return players.reduce((map, player) => {
    if (map[player.h_in]) {
      map[player.h_in] = [...map[player.h_in], player];
    } else {
      map[player.h_in] = [player];
    }
    return map;
  }, {});
};

const getPairsByHeight = (playersMap, players, heightRef) => {
  const result = new Set();
  players.forEach((player) => {
    const candidates = playersMap[heightRef - player.h_in];
    if (candidates && candidates.length > 0) {
      candidates.forEach((elm) => {
        if (
          !(
            result.has(
              `${player.first_name} ${player.last_name} - ${elm.first_name} ${elm.last_name}`
            ) ||
            result.has(
              `${elm.first_name} ${elm.last_name} - ${player.first_name} ${player.last_name}`
            )
          )
        ) {
          if (
            `${player.first_name} ${player.last_name}` !==
            `${elm.first_name} ${elm.last_name}`
          ) {
            result.add(
              `${player.first_name} ${player.last_name} - ${elm.first_name} ${elm.last_name}`
            );
          }
        }
      });
    }
  });
  return result;
};

const getPairsOfPlayers = async (req = request, resp = response, next) => {
  try {
    const { input } = req.query;
    const { data } = await axios('https://mach-eight.uc.r.appspot.com/');
    const playersSorted = sortPlayersByHeight(data.values);
    const mapByHeight = getMapFromArray(playersSorted);
    let result = [...getPairsByHeight(mapByHeight, playersSorted, input)];
    result = result && result.length > 0 ? result : 'No Matches found';
    return resp.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getPairsOfPlayers, getPairsByHeight, sortPlayersByHeight };
