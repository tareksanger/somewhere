const express = require("express");
const bodyParser = require("body-parser");
const logger = require('morgan');
const path = require('path')
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
var bcrypt = require("bcryptjs");
// var whitelist = ['http://localhost:8081', 'http://www.somewheredinebar.com', 'https://www.somewheredinebar.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(logger('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Contact = db.contact;
const Settings = db.settings;
const Address = db.address;
const Role = db.role;
const User = db.user
const About = db.about;

db.mongoose
  // .connect(`mongodb://heroku_7lddlv0h:9vq2bo700eckaq4f1727podhuq@ds141078.mlab.com:41078/heroku_7lddlv0h`, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.use(express.static(path.join(__dirname, '../build')))

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
// routes
require("./app/routes/main.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/dashboard.routes")(app); 
require("./app/routes/about.routes")(app); 
require("./app/routes/contact.routes")(app);
require("./app/routes/food.routes")(app);
require("./app/routes/drink.routes")(app);
require("./app/routes/beer.routes")(app);
require("./app/routes/wine.routes")(app);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




function initial() {
  About.estimatedDocumentCount((err, count)=> {
    if(!err && count === 0)
    new About({text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'}).save(
    err => {
      if (err) console.log('error', err)
      console.log(`about added to db`)
    })
  })

  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // TODO : Change maintenance to false before production launch
      new User({username: 'tarek', email: 'tarek.sanger@me.com', password: bcrypt.hashSync('yA752818', 8)  }).save(err => {
        if (err) console.log('error', err)
        console.log(`user 1 added to db`)
      })

      new User({username: 'majd', email: 'm.el.samrout@gmail.com', password: bcrypt.hashSync('somewhere2020', 8)}).save(err => {
        if (err) console.log('error', err)
        console.log(`user 2 added to db`)
      })
    }
  })
  Settings.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // TODO : Change maintenance to false before production launch
      new Settings({ maintenance: true }).save(err => {
        if (err) console.log('error', err)
        console.log(`settings added to db`)
      })
    }
  })

  Contact.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      let contact = new Contact({ email: 'sample@sample.ca', tel: '(132)456-7890' })

      let address = new Address({ street: '123 Example Street', city: 'Ottawa', province: 'ON', postalCode: "A0B 1C2", country: 'Canada' })

      address.save(err => {
        if (err) console.log('error', err)
        contact.address = address

        console.log('Address added to db')

        contact.save(err => {
          if (err) console.log('error', err)
          console.log('contact added to db')
        })
      })
    }
  })

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
