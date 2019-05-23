const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../my-app/api/models/User');

module.exports = passport => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'SECRET';
    passport.use(new Strategy(opts, (payload, done) => {
        User.findOne({ _id: payload._id })
        .then(user => {
            if (!user) {
                return done( null, false )
            } else {
                return done( null, user )
            }
        })
        .catch(error => {
            console.log(error)
            return done(error);
        })
    }))
}
