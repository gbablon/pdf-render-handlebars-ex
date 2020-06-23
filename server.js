const express = require('express');

const app = express();

// set up the port to listen on
app.set('port', process.env.PORT || 3000);

// set up our static resource directory
app.use(express.static(__dirname + '/public'));

/*
 * Set up templating engine
*/

var handlebars = require('express-handlebars').create({ 
  defaultLayout: 'main', 
  helpers: {
    section: function(name, options) { 
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    if_eq: function(a, b, opts) {
      if (a == b) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
    }
  }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*
 * Set up routes
 */

 app.get('/pathak', (req, res) => {
  let context = {};
  context["layout"] = "empty";
  context["data"] = {
    patient: {
      firstName: "Geoffroy",
      lastName: "Bablon",
      birthdate: "01/01/1000",
      sex: "Male",
      email: "ggggg@gmail.com",
      cellPhone: "2121231234"
    },
    signature: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Benjamin_Franklin_Signature.svg/1200px-Benjamin_Franklin_Signature.svg.png",
    metadata: {
      createdAtDate: "Monday, June 22, 2020"
    }
  };
  res.render('pathak', context);
});

/*
 * Run server
 */

// run `export NODE_ENV=production` to change env
app.listen(app.get('port'), function(){
  console.log( 'Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') 
    + '; press Ctrl-C to terminate.' );
});