var express = require('express');
require('./db/mongoose.js');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
const User = require('./models/user');
const Measurement = require('./models/measurement');
const schema = require('./graph/schema');

var app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: {
      users: () => {
        return User.find({});
      },
      user: async args => {
        console.log(args);
        const user = await User.findById(args.id);
        await user.populate('measurements').execPopulate();
        console.log(user);
        return user;
      },
      createUser: async args => {
        console.log(args);
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: args.userInput.password,
          phone: args.userInput.phone,
          permanentAddress: args.userInput.permanentAddress,
          temporaryAddress: args.userInput.temporaryAddress
        });
        await user.save();
        const token = await user.generateAuthToken();
        console.log(user);

        return user;
      },
      recordMeasurement: async args => {
        console.log(args);
        const measurement = new Measurement({
          height: args.measurementInput.height,
          weight: args.measurementInput.weight,
          chest: args.measurementInput.chest,
          bicep: args.measurementInput.bicep,
          shoulder: args.measurementInput.shoulder,
          forearm: args.measurementInput.forearm,
          upperAbs: args.measurementInput.upperAbs,
          lowerAbs: args.measurementInput.lowerAbs,
          hip: args.measurementInput.hip,
          thigh: args.measurementInput.thigh,
          calf: args.measurementInput.calf,
          owner: args.measurementInput.owner
        });
        await measurement.save();
        return measurement;
      }
    },
    graphiql: true
  })
);

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
