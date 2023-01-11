
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
const superAdminRoutesOnly = (req, res, next) => {
    const user = req.user;
    if(user.role === 'electoralbodySuperAdmin'){
        next();
    }else{
        return  res.json({
            status: 401,
            message: "you are not allowed to access this routes",
            successful: false,
          });
        }
}


const superAdminAndAdminRoutesOnly = (req, res, next) => {
    const user = req.user;
    if(user.role === 'electoralbodySuperAdmin' || user.role === 'electoralBodyAdmin'){
        next();
    }else{
        return  res.json({
            status: 401,
            message: "you are not allowed to access this routes",
            successful: false,
          });
        }
}

const voterOnlyRoute = (req, res, next) => {
    const user = req.user;
    if(user.role === 'voter'){
        next();
    }else{
        return  res.json({
            status: 401,
            message: "you are not allowed to access this routes",
            successful: false,
          });
        }
}
const umpireAndsuperAdminAndAdminRoutesOnly = (req, res, next) => {
    const user = req.user;
    if(user.role === 'electoralbodySuperAdmin' || user.role === 'electoralBodyAdmin'  || user.role === 'umpire'){
        next();
    }else{
        return  res.json({
            status: 401,
            message: "you are not allowed to access this routes",
            successful: false,
          });
        }
}
    


module.exports = {authPage, superAdminRoutesOnly, 
    superAdminAndAdminRoutesOnly, voterOnlyRoute, umpireAndsuperAdminAndAdminRoutesOnly}