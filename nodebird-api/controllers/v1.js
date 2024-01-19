const jwt = require('jsonwebtoken')
const { Domain, User, Post, Hashtag } = require('../models')

exports.createToken = async (req, res) => {
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attribute: ['nick', 'id']
            },
        });
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인, 먼저 등록하세요'
            })
        }
        const token = jwt.sign({
            id: domain.User.id,
            nick: domain.User.nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: 'nodebird'
        });
        return res.json({
            code: 200,
            message: '토큰 발급',
            token// token : token
        });
    } catch (err) {
        console.error(err);
        return res.status(500), json({
            code: 500,
            message: '서버 에러'
        })
    }
}

exports.tokenTest = (req, res) => {
    res.json(res.locals.decoded);
}

exports.getMyPosts = (req, res) => {
    Post.findAll({ where: { userId: res.locals.decoded.id } })
        .then((posts) => {
            console.log(posts);
            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: '서버 에러',
            });
        });
};
exports.getPostsByHashtag = async (req, res) => {
    try {
        const hashtag = Hashtag.findOne({
            where: { title: req.params.title }
        })
        if (!hashtag) {
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다.'
            })
        }
        const posts = Hashtag.getPosts();
        return res.json({
            code: 200,
            message: posts,
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        })
    }
}