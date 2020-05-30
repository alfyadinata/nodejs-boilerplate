require('dotenv/config');
const jwt = require('jsonwebtoken');
const resp = require('../config/httpResponse')

async function auth(req, res, next) {
	try {
		const token = await req.headers.authorization;
		const key = process.env.JWTKEY;

		await jwt.verify(token, key, (err, decoded) => {
			if (err) {
				return resp.validationError(res, err,  403)
            }
            
			req.user = decoded;

			return next();
		});
	} catch (err) {
        return resp.error(res, err)
    }
}

module.exports = auth;
