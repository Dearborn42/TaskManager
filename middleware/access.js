import bcrypt from 'bcrypt';
function access(req, res, next) {
    const password = req.session.secret;
    const hashPassword = req.query.token;

    bcrypt.compare(password, hashPassword)
        .then((match)=> {
            if (match)
                next();
            else
                res.status(401)
        }).catch((err)=> {
            if(err)
                res.status(500)
        })
    next();
}

export {access}