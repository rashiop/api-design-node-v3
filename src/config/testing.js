const dbUrl =
  'mongodb+srv://process.env.DB_USERNAME:process.env.DB_PASSWORD@cluster0.0ohiw.mongodb.net/process.env.DB_NAME?retryWrites=true&w=majority';

export const config = {
  secrets: { jwt: 'learneverything' },
  dbUrl
};
