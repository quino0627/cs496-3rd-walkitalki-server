const moment = require("moment");
module.exports = (app, mapChat) => {
  //CREATE NEW CHAT
  app.post("/api/mapchat/create", (req, res) => {
    const current = moment().format("YYMMDDHHmmss");
    console.log(current + "api - request new chat");
    let mapChat = new mapChat();
    mapChat.username = req.body.username;
    mapChat.userID = req.body.userID;
    mapChat.content = req.body.content;
    mapChat.timestamp = current;
    mapChat.latitude = req.body.latitude;
    mapChat.longitude = req.body.longitude;
    mapChat.chat_id = req.body.userID + current;
    mapChat.save(err => {
      if (err) {
        console.log("CHAT SAVING ERROR : ", err);
        res.json({ result: 0 });
        return;
      }
      console.log("CHAT SAVING COMPLETE");
      res.json({ result: 1 });
    });
  });

  //GET ALL CHATS
  app.get("/api/mapchat/all", (req, res) => {
    const current = moment().format("YYMMDDHHmmss");
    console.log(current.toString + "api - request all chat");
    mapChat.find(
      //   {
      //     username: 1,
      //     userID: 1,
      //     content: 1,
      //     timestamp: 1,
      //     latitude: 1,
      //     longitude: 1
      //   },
      (err, mapChats) => {
        if (err) return res.status(500).send({ error: "database failure" });
        res.json(mapChats);
        //console.log(mapChats);
        console.log(moment().format("YYMMDDHHmmss") + "    OK");
      }
    );
  });

};
