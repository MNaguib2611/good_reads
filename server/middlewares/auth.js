function ensureNotAuthentication(req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) {
        // req.flash('error_msg', 'You should logout to view that page')
        res.redirect('/logoutToView');
    } else {
        return next();
    }
}

// Access Control -- Middleware used before requesting index page
//put all routes that needs authentication here
function ensureAuthentication(req, res, next) {
    console.log(req.user);
    
    if (req.isAuthenticated()) {
        return next();
    } else {
        // req.flash('error_msg', 'You are not authorized to view that page')
        res.redirect('/loginToView');
    }
}


function isAdmin(req, res, next) {
    if (req.user.isAdmin) {
        return next();
    } else {
        res.redirect('/notAuthorized');
    }
}

module.exports =
        { ensureNotAuthentication,ensureAuthentication}