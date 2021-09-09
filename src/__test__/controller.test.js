const controller = require('../controller');
const { players, mapPlayers } = require('./mocks');

describe('controller logic tests', () => {
  test('getPairs odd number', () => {
    const pairs = controller.getPairsByHeight(mapPlayers, players, 151);
    const result = [...pairs];
    console.log(result);
    expect(result.length).toBe(6);
    expect(result[0]).toBe('Alex Acker - Alex Perez');
  });
  test('getPairs no results', () => {
    const pairs = controller.getPairsByHeight(mapPlayers, players, 10);
    const result = [...pairs];
    expect(result.length).toBe(0);
  });
  test('getPairs even number', () => {
    const pairs = controller.getPairsByHeight(mapPlayers, players, 150);
    const result = [...pairs];
    expect(result.length).toBe(1);
  });
  test('sortArray', () => {
    const sort = controller.sortPlayersByHeight(players);
    expect(sort[0].first_name).toBe('Alex');
    expect(sort[sort.length - 1].first_name).toBe('Mariano');
  });
});
