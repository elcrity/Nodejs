import Sequelize from "sequelize";
import Post from './Post.mjs'


class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            email : {
                type : Sequelize.STRING(40),
                allowNull : true,
                unique : true,
            },
            nick : {
                type : Sequelize.STRING(15),
                allowNull : false,
            },
            password : {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
            provider : {
                type : Sequelize.ENUM('local','kakao'),
                allowNull : false,
                defaultValue : 'local'
            },
            snsID : {
                type:Sequelize.STRING(30),
                allowNull : true
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        });
    }

    static associate(db){
        db.User.hasMany(db.Post)
        db.User.belongsToMany(db.User, {
            //팔로워가 참조하는 키는 팔로우 할 유저의 키이므로 followingId
            foreignKey : 'followingId',
            //이 별칭은 follower로
            as: 'Followers',
            //Follow라는 모델을 통해 N:M관계를 정의
            through : 'Follow',
        });
        db.User.belongsToMany(db.User, {
            //팔로우 된 유저가 참조할 키는 자신을 팔로우 한 유저의 키이므로 followerId
            foreignKey : 'followerId',
            //이 관계의 별칭은 Followings
            as: 'Followings',
            //Follow라는 모델을 통해 N:M관계를 정의
            through : 'Follow',
        });
    }
}

export default User;