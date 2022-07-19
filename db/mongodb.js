const { default: mongoose } = require("mongoose")

module.exports = {
    closeConnect: async () => {
        try {
            //necessaire quand on manage du code asynchrone avec async await
            const conn = await mongoose.disconnect()
            console.log('disconnect to my DB on Atlas');
            // Creating a model    
          } catch (err) {
            console.error(err.message);
          }
    },
    connect: async (url,username,password,dbname) => {
        try {
            //necessaire quand on manage du code asynchrone avec async await
            const conn = await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/${dbname}?retryWrites=true&w=majority`,);
            console.log('Connected to my DB on Atlas');
            // Creating a model    
          } catch (err) {
            console.error(err.message);
          }
    }
  }