const { SHA3 } = require('sha3');

const secret = "exe";

// Base64 Decoder Middleware
const base64Decoder = (req, res, next) => {
    if (req.body && req.body.data) {
        try {
            req.body = JSON.parse(Buffer.from(req.body.data, "base64").toString());
            next();
        } catch (error) {
            res.status(400).json({ success: false, message: "Invalid base64 data" });
        }
    } else {
        next();
    }
};

// SHA3 Hash Verifier Middleware
const sha3HashVerifier = (req, res, next) => {
    const { hash, salt, input, timestamp } = req.body;
    const inputString = JSON.stringify(input);
    const combinedString = salt + inputString + timestamp + secret;

    const currentTimestamp = Date.now();
    const timeDifference = (currentTimestamp - timestamp) / 1000; // Convert to seconds

    if (timeDifference > 4000) {
        return res.status(401).json({ success: false, message: "Expired" });
    }

    const sha3Hash = new SHA3(256).update(combinedString).digest('hex');

    if (hash === sha3Hash) {
        req.body = input;
        next();
    } else {
        res.status(401).json({ success: false, message: "Auth failed" });
    }
};

module.exports = { base64Decoder, sha3HashVerifier };