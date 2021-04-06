import mongoose from 'mongoose';

import options from '../config';

export const connect = (url = options.dbUrl, opts = {}) => {
  try {
    return mongoose.connect(
      url,
      { ...opts, useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(' Mongoose is connected')
    );
  } catch (e) {
    console.log('Could not connect');
    console.error(e);
  }
};
