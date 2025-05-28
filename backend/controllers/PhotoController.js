const Photo = require ("../models/Photo")
const User = require("../models/User")

const mongoose = require ("mongoose")

const insertPhoto = async(req, res) => {

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user;


    const user = await User.findById(reqUser._id)

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    if(!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde."]
        })
    }

    res.status(201).json(newPhoto)
}

// excluir foto

    const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

        try {
            const photo = await Photo.findById(id);

            if (!photo) {
            return res.status(404).json({ errors: ["Foto não encontrada!"] });
            }

            if (!photo.userId.equals(reqUser._id)) {
            return res
                .status(403)
                .json({ errors: ["Acesso negado! Você não pode deletar esta foto."] });
            }

            await Photo.findByIdAndDelete(photo._id);

            res
            .status(200)
            .json({ id: photo._id, message: "Foto excluída com sucesso." });
        } catch (error) {
            console.error("Erro ao excluir foto:", error);
            return res.status(500).json({ errors: ["Erro ao excluir foto."] });
        }
    };
  
module.exports = {
    insertPhoto,
    deletePhoto,
}