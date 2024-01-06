const express = require('express')
const User = require('../schemas/user')
const Comment = require('../schemas/comment')

const router = express.Router();

router.route('/')
    .get( async (req, res, next) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const user = await User.create({
                name : req.body.name,
                age : req.body.age,
                married : req.body.married
            })
            console.log(user);
            res.status(201).json(user);
        } catch (error) {
            console.error(err);
            next(err);
        }
    })

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.find({commenter : req.params.id})
        //데이터 조회시 참조된 다른 모델의 내용을 가져와 참조, 즉 여기선 User를 ref하고 있으므로 User테이블의 데이터도 함께 조회함
            .populate('commenter');
            console.log('comments');
            res.json(comments);
    } catch (error) {
        console.error(err);
            next(err);
    }
})

module.exports = router;