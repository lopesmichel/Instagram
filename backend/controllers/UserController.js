const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")

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

const update = async (req, res) => {
    
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")


    if(name) {
        user.name = name
    }

    if(password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash
    }

    if(profileImage) {
        user.profileImage = profileImage
    }

    if(bio) {
        user.bio = bio
    }

    await user.save()

    res.status(200).json(user);
}

const getUserById = async (req, res) => {
  const { id } = req.params;

    // Verifica se o ID é válido antes de consultar o banco
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ errors: ["Usuário inválido."] });
    }

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
        return res.status(404).json({ errors: ["Usuário não encontrado."] });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return res.status(500).json({ errors: ["Erro ao buscar usuário."] });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};