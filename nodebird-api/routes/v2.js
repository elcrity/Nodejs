const express = require('express')
const cors = require('cors')

const { verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares')
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();

router.use(corsWhenDomainMatches);

router.use(cors({
    Credential:true,
}))
// ==
// router.use((req,res,next) => {
// cors()(req,res,next);
// })

router.post('/token', apiLimiter, createToken);

router.get('/test', apiLimiter, verifyToken, tokenTest);

router.get('/posts/my', apiLimiter, verifyToken, getMyPosts);

router.get('/posts/hashtag/:title', apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;