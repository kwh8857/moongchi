const functions = require("firebase-functions");

const client = require("./router/client");

const storageCleaner = require("./scheduler/storageCleaner");

exports.clientApi = functions.region("asia-northeast3").https.onRequest(client);
