const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_INFO;
const connectToMongo = require('../../mongoconnect');

export default async function handler(req, res) {
    const token = req.headers.authtoken;
    const data = await fetchUserDetails(token);

    if (data.success){
        return res.status(200).json({
            success: true,
            data : data.details
        });
    }
    return res.status(400).json({success : false});
}

async function fetchUserDetails(token){
    if (!token) {
        return ({success : false , details : null});
    }
    await connectToMongo();
    try {
        const userDetail = await jwt.verify(token , JWT_KEY);
        return ({success : true, details : userDetail.user});
    } catch (error) {
        return ({success : false , details : null});
    }
}