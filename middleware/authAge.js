const authAge = (permission) => {
    return (req, res, next) => {
        const userAge = req.body.userAge
        if (permission.includes(userAge)){
            next() ;
        } else {
            return res.status(401).json('you are not allowed to access this routes')
        }
    };
    };
    const voteRoutesOnly = (req, res, next) => {
        const user = req.user;
        if(user.age >= 18 ){
            next();
        }else{
            return  res.json({
                status: 401,
                message: "you are not allowed to vote in this election",
                successful: false,
              });
            }
    }
    
    module.exports = {voteRoutesOnly}