const moment = require("moment");
module.exports = (app, mapPost) => {
  //CREATE NEW Post
  app.post("/api/mappost/create", (req, res) => {
    const current = moment().format("YYMMDDHHmmss");
    console.log(current + "api - request new Post");
    let mapPost = new mapPost();
    const fs = require("fs");
    let buff = new Buffer(req.body.pictureUrl, "base64");
    mapPost.title = req.body.title;
    mapPost.username = req.body.username;
    mapPost.userID = req.body.userID;
    mapPost.content = req.body.content;
    mapPost.timestamp = current;
    mapPost.latitude = req.body.latitude;
    mapPost.longitude = req.body.longitude;
    mapPost.post_id = req.body.userID + current;
    fs.writeFileSync("./storage/" + mapPost.post_id, buff);
    mapPost.pictureUrl = "./storage/" + mapPost.post_id;
    console.log("hjhjhjhj");

    mapPost.save(err => {
      if (err) {
        console.log("Post SAVING ERROR : ", err);
        res.json({ result: 0 });
        return;
      }
      console.log("Post SAVING COMPLETE");
      res.json({ result: 1 });
    });
  });

  //GET ALL PostS
  app.get("/api/mappost/all", (req, res) => {
    const current = moment().format("YYMMDDHHmmss");
    console.log(current.toString + "api - request all Post");
    mapPost.find(
      //   {
      //     username: 1,
      //     userID: 1,
      //     content: 1,
      //     timestamp: 1,
      //     latitude: 1,
      //     longitude: 1
      //   },
      (err, mapPosts) => {
        if (err) return res.status(500).send({ error: "database failure" });
        res.json(mapPosts);
        //console.log(mapPosts);
        console.log(moment().format("YYMMDDHHmmss") + "    OK");
      }
    );
  });
};
