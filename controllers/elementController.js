
const elementController = {

getElements: (req,res) => {
    elementSchema.find({}).then((elements)=>res.send(elements))
},

getElement: (req,res) => {
    const _id = req.params.id
    elementSchema.find({_id}).then((element)=>res.send(element))
},

createElement: async (req, res) => {
 const {nom, prix_HT, tva, description} = req.body
try {
 const element = new elementSchema({
    nom,
    prix_HT,
    tva,
    description
 })

 await element.save()
 return(element)
}
catch(err)
{
    return(err.message)
}
},

updateElement: async (req,res) => {
    const _id = req.params.id
    const {nom, prix_HT, tva, description} = req.body

try {
    const elementUpdate = await elementSchema.findByIdAndUpdate(_id, {
        nom,
        prix_HT,
        tva,
        description
    })

    return elementUpdate
}

    catch(err)
{
    return(err.message)
}
},


deleteElement: async (req,res) => {
    const _id = req.params.id

try {
    const elementDelete = await elementSchema.deleteOne({_id: id})

    return elementDelete
}

    catch(err)
{
    return(err.message)
}
}
}
module.exports = elementController;