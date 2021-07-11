const credentials = require("./credentials.json");

const redirectUrlFormEncoded = encodeURIComponent(credentials.redirect_uri);
const clientIdUrlFormEncoded = encodeURIComponent(credentials.client_id);
console.log(`https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${redirectUrlFormEncoded}&client_id=${clientIdUrlFormEncoded}%40AMER.OAUTHAP`);
