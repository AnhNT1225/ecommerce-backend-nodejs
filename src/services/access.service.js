"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async () => {
    try {
      // step 1: check email status
      const holderShop = await shopModel.findOne({ email: email }).lean();

      if (holderShop) {
        return {
          code: "xxx",
          message: "Shop already registered",
          status: "error",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
              type: "pkcs1",
              format: "pem",
          },
          // public key cryptography standard!
          privateKeyEncoding: {
              type: "pkcs1",
              format: "pem",
          },
        });

        console.log("privateKey: ", privateKey);
        console.log("publicKey: ", publicKey); // save collection keyStore

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "Error creating publicKey",
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKey);
        console.log("publicKeyObject:: ", publicKeyObject);

        //create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyObject,
          privateKey
        );
        console.log("Created Token Success:: ", tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
            tokens: tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error  ",
      };
    }
  };
}

module.exports = AccessService;
