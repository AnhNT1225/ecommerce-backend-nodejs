'use strict';
const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
    // create or update publicKey, privateKey
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({ user: userId, publicKey: publicKeyString}).lean();

            return tokens ? publicKeyString : null;
        } catch(error) {
            return error;
        }
    }
}

module.exports = KeyTokenService;