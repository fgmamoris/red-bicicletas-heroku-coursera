const { render } = require("pug");
const Usuario = require("../models/usuario");

module.exports = {
  
  list: function (req, res, next) {
    Usuario.find({}, (err, usuarios) => {
      res.render("usuarios/index", { usuarios: usuarios });
    });
  },

  update_get: function (req, res, next) {
    Usuario.findById(req.params.id, (err, usuario) => {
      res.render("usuarios/update", { errors: {}, usuario: usuario });
    });
  },

  update: function (req, res, next) {
    const update_values = { nombre: req.body.nombre };
    Usuario.findByIdAndUpdate(req.params.id, update_values, (err, usuario) => {
      if (err) {
        req.render("usuarios/update", {
          errors: err.errors,
          usuario: new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
          }),
        });
      } else {
        res.redirect("/usuarios");
        return;
      }
    });
  },

  create_get: function (req, res, next) {
    res.render("usuarios/create", { errors: {}, usuario: new Usuario() });
  },

  create: function (req, res, next) {
    if (req.body.password != req.body.confirm_password) {
      res.render("usuarios/create", {
        errors: {
          confirm_password: { message: "Los password no coinciden" },
          usuario: new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
          }),
        },
      });
      return;
    }
    Usuario.create(
      {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
      },
      function (err, nuevoUsuario) {
        if (err) {
          res.render("usuarios/create", {
            errors: err.errors,
            usuario: new Usuario({
              nombre: req.body.nombre,
              email: req.body.email,
            }),
          });
        } else {
          nuevoUsuario.enviar_email_bienvenida();
          console.log("mensaje enviado");
          res.redirect("/usuarios");
        }
      }
    );
  },
  delete: function (req, res, next) {
    Usuario.findByIdAndDelete(req.body.id, function (err, usuario) {
      if (err) {
        next(err);
      } else {
        res.redirect("/usuarios");
        return;
      }
    });
  },
};
