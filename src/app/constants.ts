import config from "./config";

export default {
    // urlPrefix: `${config.backendProtocol}://${config.backendHost}:${config.backendPort}`,
    // urlPrefix is replaced by proxy.conf.json for cors issues
    appName: 'Ephemeral',
    lsTokenKey: 'ephemere_app_token',
    lsCookieKey: 'ephemere_cookie_accepted' 
}