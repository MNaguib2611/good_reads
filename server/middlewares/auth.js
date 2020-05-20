function ensureNotAuthentication(req, res, next) {
    // console.log(req.user);
    if (req.isAuthenticated()) {
        res.redirect('/logoutToView');
    } else {
        return next();
    }
}

// Access Control -- Middleware used before requesting index page
//put all routes that needs authentication here
function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
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
function isSuperAdmin(req, res, next) {
    if (req.user.isSuperAdmin && req.user.isAdmin) {
        return next();
    } else {
        res.redirect('/notAuthorized');
    }
}


module.exports =
        { ensureNotAuthentication,ensureAuthentication,isAdmin,isSuperAdmin}