const Sequelize = require('sequelize')
const User = require('./user.mjs')
const Post = require('./Post.mjs')
const Hashtag = require('./hashtag.mjs')
const { fstat } = require('fs')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const fs = require('fs')

const db = {};

const sequelize = new Sequelize(
  config.database, copnfig.username, config.password, config,
);

db.sequelize = sequelize
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);

User.associate(sequelize);
Post.associate(sequelize);
Hashtag.associate(sequelize);


module.exports = db;

const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {// 숨김 파일, index.js, .js가 아닌 ㅣ파일 필터링
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file =>{
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

  Object.keys(db).forEach(modelName => {//associate 호출
    if(db[modelName].associate){
      db[modelName].associate(db);
    }
    })