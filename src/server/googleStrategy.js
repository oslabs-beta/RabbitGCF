// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const User = require('./models/User.js');


// //change for env variable
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:8080/auth/google/callback",
//     passReqToCallback: true
//   },
  
//   //change code to be able to query from db
//   async function(req, accessToken, refreshToken, profile, done) {
//     const user = await User.findOne({email: profile.email});
//     if(user === null){
//       const newUser = await User.create({
//         firstName: profile.given_name,
//         lastName: profile.family_name,
//         email: profile.email,
//         id: profile.id,
//         picture: profile.picture,
//       });
//       // req.user = newUser;
//       return done(null, user, profile);
//     } else {
//       // console.log(req.user);
//       return done(null, user, profile);
//     }
// }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });