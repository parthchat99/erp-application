const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        // console.log(req.headers.authorization.split(" ")[1])
        // console.log(user)
        // console.log(user.accessToken == req.headers.authorization.split(" ")[1])

        const tokenFromHeader = req.headers.authorization.split(" ")[1]
        const tokenFromDatabase = user.accessToken
        if(tokenFromHeader == tokenFromDatabase){
            req.user = user;
            next();
        }
        else{
            return res.status(400).json({message: "Unauthorized Access - Session Expired!"});
        }


    })(req, res, next);
};