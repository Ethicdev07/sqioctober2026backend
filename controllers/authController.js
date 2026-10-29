const users =  require('../models/users');

//User register

const register = (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            status: "Failed",
            message: "Please provide name, email and password"
        });
    };

    //make sure all users register with unique email address

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);


    res.status(201).json({
        message: "User registered successfully",
        users: newUser,
    });

};

//getAllUsers




module.exports = register;
