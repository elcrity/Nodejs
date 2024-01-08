import Sequelize from "sequelize";

class Post extends Sequelize.Model{
    static initiate(sequelize){
        Post.init({
            content : {
                type : Sequelize.STRING(140),
                allowNull : false,
            },
            img : {
                type : Sequelize.STRING(200),
                allowNull : true,
            }
        })
    }

    static associate(db) {}

}
export default Post;