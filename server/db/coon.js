const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const { Game } = require("../models/GameModel")

require("dotenv").config();

router.get("/", async (req, res) => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.URLDATA, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao banco de dados com sucesso cheerio 1337x.");
  } catch (error) {
    console.log(`Error ${error}`);
  }

  async function scrapeGames(url, gamesList, listname) {
    try {
      let response = await axios.get(url);
      let html = response.data;
      const $ = cheerio.load(html);
      let gamesElements = $("table>tbody>tr");
      let id = 1;
      gamesElements.each((i, element) => {
        let gameTitle = $(element).find("td:first-child").text();
        let gameUploader = $(element).find(".coll-5.uploader a").text();
        let gamePlatform = $(element).find(".coll-1.name i").attr("class");
        let linkgamePlatform = $(element).find(".icon").attr("href");
        let size = $(element).find("td.coll-4.size.mob-uploader").text();
        let gameDate = $(element).find(".coll-date").text();
        let linkpagegame = $(element)
          .find('td:first-child a[href^="/torrent/"]')
          .attr("href");
        let magnetlink = '';
        gamesList.push({
          game_Title: gameTitle,
          Link_to_gamePage: linkpagegame,
          magnet_link: magnetlink,
          uploader_by: gameUploader,
          platform: gamePlatform,
          size_of_game: size,
          linkgamePlatform: linkgamePlatform,
          date_time_uploaded: gameDate,
          category: listname,
          id: id
        });
        id++;
      });

      await Game.collection.insertMany(gamesList, { ordered: false });

    } catch (error) {
      console.log(error);
    }
  }

  const top100games = "https://www.1377x.to/top-100-games"; /* Gamelist1 */
  // const trending_games_Day = "https://www.1377x.to/trending/d/games/"; /* Gamelist2 */
  const trending_games_Week = "https://www.1377x.to/trending/w/games/"; /* Gamelist3 */
  const favorited_games = "https://www.1377x.to/sort-sub/17/seeders/desc/1/"; /* Gamelist4 */
  // const latest_pc_Games = "https://www.1377x.to/sub/17/1/"; /* Gamelist5 */
  const favorited_games2 = "https://www.1377x.to/sort-cat/Games/leechers/desc/1/"; /* Gamelist6 */


  let gamesList1 = [];
  // let gamesList2 = [];
  let gamesList3 = [];
  let gamesList4 = [];
  // let gamesList5 = [];
  let gamesList6 = [];

  const gameLists = [
    { path: top100games, listname: 'top100games', list: gamesList1 },
    // { path: trending_games_Day, listname: 'trending_games_Day', list: gamesList2 },
    { path: trending_games_Week, listname: 'trending_games_Week', list: gamesList3 },
    { path: favorited_games, listname: 'favorited_games', list: gamesList4 },
    // { path: latest_pc_Games, listname: 'latest_pc_Games', list: gamesList5 },
    { path: favorited_games2, listname: 'favorited_games2', list: gamesList6 },
  ];

  gameLists.forEach(async (gameList) => {
    let category = gameList.listname;
    await scrapeGames(gameList.path, gameList.list, category);
  });

  res.json(gameLists)

});

module.exports = router;
