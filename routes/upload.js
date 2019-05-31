const IncomingForm = require("formidable").IncomingForm;

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  let data = {
    path: ''
  };

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    data.path = file.path;
  });
  form.on("end", () => {
    res.json(path);
  });
  form.parse(req);
};

// const IncomingForm = require('formidable').IncomingForm
// // User model
// const User = require('../models/User');
// const router = express.Router();
// const { ensureAuthenticated } = require("../config/auth");

// // Upload file
// router.post('/', ensureAuthenticated, (req, res) => {
//     var form = new IncomingForm()

//     form.on('file', (field, file) => {
//       // Do something with the file
//       // e.g. save it to the database
//       // you can access it using file.path
//         // Validation pass
//         User.findOne( {email: req.user.email} )
//         .then(user => {
//             if (user) {
                
//             } else {
//                 console.log("NO USER!");
//             }

//         })
//         .catch(err => {console.log(err);});
//         })
//     form.on('end', () => {
//       res.json()
//     })
//     form.parse(req)
// });

