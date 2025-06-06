const {body} = require ("express-validator")

const photoInsertValidation = () => {
    return [
      body("title")
        .not()
        .equals("undefined")
        .withMessage("O titulo é obrgatório")
        .isString(0)
        .withMessage("O titulo é obrgatório")
        .isLength({ min: 3 })
        .withMessage("O titulo precisa ter no mínimo 3 caracteres"),
      body("image").custom((value, { req }) => {
        if (!req.file) {
          throw new Error("A imagem é obrigatória");
        }
        return true;
      }),
    ]; 
}

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrgatório.")
      .isLength({ min: 3 })
      .withMessage("O titulo precisa ter no mínimo 3 caracteres"),
  ];
}

const commentValidation = () => {
  return [
    body("comment").isString().withMessage("O comentário é obrigatório."),
  ]
}

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};