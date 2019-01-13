const moment = require("moment");

module.exports = (app, User) => {
  // POST - CREATE NEW USER
  app.post("./api/users/create", (req, res) => {
    console.log(
      `CLIENT REQUESTED : CREATE NEW User at ${moment().format(
        "YYMMDDHHmmss"
      )} `
    );
    let user = new User();
    user.name = req.body.name;
    user.user_id = req.body.user_id;
    user.phone = req.body.user;
    user.profileUrl = req.body.profileUrl;

    //IT RETURNS ARRAY
    User.find({ user_id: user.user_id }, { user_id: 1 }, (err, users) => {
      if (err) {
        return res.status(500).send({ err });
      }
      // SO, IF USERS is EMPTY, WE CAN REGISTER USER
      if (users.length === 0) {
        user.save(err => {
          if (err) {
            console.error(err);
            res.json({ result: 0 });
            return;
          }
        });
        console.log(`user ${user.name} created complete!`);
        res.json({ result: 1 });
        // OTHERWISE, USER ALREADY EXISTS
      } else {
        console.log(`user ${user.name} is already EXISTS`);
        res.json({ result: 0 });
      }
    });
  });

  //GET - GET USER INFORMATION
  app.get("api/users/info:user_id", (req, res) => {
    console.log(
      `CLIENT USERINFO id: ${req.params.user_id}, name: ${
        req.params.name
      } REQUESTED, ${moment().format("YYMMDDHHmmss")}`
    );
    User.find(
      { user_id: req.params.user_id },
      { user_id: 1, name: 1, phone: 1, _id: 0 },
      (err, user) => {
        if (err) return res.status(500).send({ error: err });
        if (user.length === 0) {
          if (err) {
            console.error(err);
            res.json({ result: err });
            return;
          }
          console.log("REQUESTED user not exsited");
          res.json({ result: false });
        } else {
          // console.log(users[0]);
          res.json(user[0]);
          console.log(
            `SUCCESSFULLY respond userinfo at ${moment().format(
              "YYMMDDHHmmss"
            )}`
          );
        }
      }
    );
  });

  //GET - login
  app.get("/api/users/login/:user_id", function(req, res) {
    console.log(moment().format("YYMMDDHHmmss") + "    client request, login");
    User.find({ user_id: req.params.user_id }, { user_id: 1 }, function(
      err,
      users
    ) {
      if (err) return res.status(500).send({ error: err });
      if (users.length === 0) {
        if (err) {
          console.error(err);
          res.json({ result: err });
          return;
        }
        console.log("first login");
        res.json({ result: false });
      } else {
        console.log(users[0]);
        res.json({ result: true });
      }
      console.log(moment().format("YYMMDDHHmmss") + "    OK");
    });
  });

  //GET ALL USERS
  app.get("/api/users/all/:user_id", function(req, res) {
    console.log(
      moment().format("YYMMDDHHmmss") + "    client request, get all users"
    );
    User.find(
      { $nor: [{ user_id: req.params.user_id }] },
      { user_id: 1, name: 1, phone: 1, friends: 1 },
      function(err, users) {
        if (err) return res.status(500).send({ error: "database failure" });
        res.json(users);
        console.log(moment().format("YYMMDDHHmmss") + "    OK");
      }
    );
  });
};
