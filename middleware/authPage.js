
const authPage = (permission) => {
return (req, res, next) => {
    const userRole = req.body.userRole
    if (permission.includes(userRole)){
        next() ;
    } else {
        return res.status(401).json('you are not allowed to access this routes')
    }
};
};

module.exports = authPage