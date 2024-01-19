const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;

const request = async (req, api) => {
    try {
        if (!req.session.jwt) {
            console.log('111111111111111');
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET,
            });
                req.session.jwt = tokenResult.data.token;
        }
        console.log(`why dont ${URL}${api}`);
        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session.jwt },
        });
    } catch (err) {
        console.error(err);
        if (err.response?.status === 419) {
            delete req.session.jwt
            return request(req, api);
        }
        throw err;
    }
}

exports.getMyPosts = async (req, res, next) => {
    try {
        console.log("get my post start");
        const result = await request(req, '/posts/my')
        console.log("------------------------  " ,result);
        res.json(result.data)
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.searchByHashtag = async (req, res, next) => {
    try {
        const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`)
        res.json(result.data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}