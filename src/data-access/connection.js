import mongoose from 'mongoose';

export default function connectDb(app) {
  (() => {
    const databaseURI = process.env.MONGO_URI;
    const port = process.env.PORT || 3000;

    mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(response => { 
          console.log('connected to DB');
          app.listen(port, () => {
            console.log(`Listening on port ${port}`);
          });
        })
        .catch(err => { console.log(err) });

    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));

  })();
}
