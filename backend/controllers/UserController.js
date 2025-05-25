const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtScret = process.env.JWT_SECRET

// Generate user token

const generateToken = (id) => {
    return jwt.sign({id}, jwtScret, {
        expiresIn: "7d",
    })
}

// Register user and sign in

const register = async (req, res) => {
    
    const {name, email, password} = req.body

    
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]})
        return
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde. "]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })
}

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Dados recebidos:", req.body);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ errors: ["Usuário não encontrado."] });
  }

  console.log("Usuário encontrado:", user);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(422).json({ errors: ["Senha inválida"] });
  }

  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};


const getCurrentUser = async(req, res) => {
    const user = req.user

    res.status(200).json(user)
}

module.exports = {
    register,
    login,
    getCurrentUser,
};