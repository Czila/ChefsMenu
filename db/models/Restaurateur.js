const {default:mongoose} = require("mongoose")

const restaurateurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    mail: {
        type: String,
        unique: true // `email` dois etre unique
    },
    motdepasse : String
})

restaurateurSchema.pre("save", function(next) {
    const rest = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(login.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            rest.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

module.exports = mongoose.model("Restaurateur", restaurateurSchema)