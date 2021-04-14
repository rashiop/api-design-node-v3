import cuid from 'cuid';
import _ from 'lodash';
import mongoose from 'mongoose';

import { Item } from './src/resources/item/item.model';
import { List } from './src/resources/list/list.model';
import { User } from './src/resources/user/user.model';

const models = { User, List, Item };

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb+srv://process.env.DB_USERNAME:process.env.DB_PASSWORD@cluster0.0ohiw.mongodb.net/process.env.DB_NAME';

global.newId = () => {
  return mongoose.Types.ObjectId();
};

const remove = collection =>
  new Promise((resolve, reject) => {
    collection.deleteMany(err => {
      if (err) return reject(err);
      resolve();
    });
  });

beforeEach(async done => {
  const db = cuid().substr(0, 10);
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)));
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        url + db + '?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      await clearDB();
      await Promise.all(Object.keys(models).map(name => models[name].init()));
    } catch (e) {
      console.log('connection error');
      console.error(e);
      throw e;
    }
  } else {
    await clearDB();
  }
  done();
});
afterEach(async done => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});
afterAll(done => {
  return done();
});
