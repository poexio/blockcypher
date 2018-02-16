const request = require('request-promise-native')

const URL_ROOT = 'https://api.blockcypher.com/v1/'

/**
 * <b>BlockCypher API Client</b>.
 * @constructor
 * @param {string}    coin    The coin for which you're using the BlockCypher API. Can be 'btc', 'ltc', 'doge', or 'bcy'.
 * @param {string}    chain   The chain for which you're using the BlockCypher API. Can be 'main', 'test', or 'test3'.
 * @param {string}    token   Your BlockCypher API Token.
 */
var Blockcy = function (coin, chain, token) {
  this.coin = coin
  this.chain = chain
  this.token = token
}

module.exports = Blockcy

/**
 * <b>Helper for GET calls</b>
 *
 * @private
 * @param {string}    url        Endpoint after URL_ROOT.
 * @param {Object}    params     Additional URL parameters.
 * @memberof          Blockcy
 * @method            get
 */
Blockcy.prototype._get = function (url, params) {
  var urlr = URL_ROOT + this.coin + '/' + this.chain + url
  params = Object.assign({}, params, {token: this.token})
  return request.get({
    url: urlr,
    strictSSL: true,
    json: true,
    qs: params
  })
}

/**
 * <b>Helper for POST calls</b>
 *
 * @private
 * @param {string}    url        Endpoint after URL_ROOT.
 * @param {Object}    params     Optional additional URL parameters.
 * @param {Object}    data       Optional data to post.
 * @memberof          Blockcy
 * @method            post
 */
Blockcy.prototype._post = function (url, params, data) {
  var urlr = URL_ROOT + this.coin + '/' + this.chain + url
  params = Object.assign({}, params, {token: this.token})
  return request.post({
    url: urlr,
    strictSSL: true,
    json: true,
    qs: params,
    body: data
  })
}

/**
 * <b>Helper for DELETE calls</b>
 *
 * @private
 * @param {string}    url        Endpoint after URL_ROOT.
 * @param {Object}    params     Additional URL parameters.
 * @memberof          Blockcy
 * @method            get
 */
Blockcy.prototype._del = function (url, params) {
  var urlr = URL_ROOT + this.coin + '/' + this.chain + url
  params = Object.assign({}, params, {token: this.token})
  return request.del({
    url: urlr,
    strictSSL: true,
    json: true,
    qs: params
  })
}

/**
 * <b>Get Chain</b>
 * Get info about the blockchain you're querying.
 * @memberof Blockcy
 * @method getChain
 */
Blockcy.prototype.getChain = function () {
  return this._get('/', {})
}

/**
 * <b>Get Block</b>
 * Get info about a block you're querying under your object's coin/chain, with additional parameters. Can use either block height or hash.
 * @param {(string|number)}    hh         Hash or height of the block you're querying.
 * @param {Object}             [params]   Optional URL parameters.
 * @memberof Blockcy
 * @method getBlock
 */
Blockcy.prototype.getBlock = function (hh, params) {
  // FIXUP
  return this._get('/blocks/' + hh, params)
}

/**
 * <b>Get Addr Bal</b>
 * Get balance information about an address.
 * @param {(string|number)}    addr       Address you're querying.
 * @param {Object}             [params]   Optional URL parameters.
 * @memberof Blockcy
 * @method getAddrBal
 */
Blockcy.prototype.getAddrBal = function (addr, params) {
  // FIXUP
  return this._get('/addrs/' + addr + '/balance', params)
}

/**
 * <b>Get Addr</b>
 * Get information about an address, including concise transaction references.
 * @param {(string|number)}    addr       Address you're querying.
 * @param {Object}             [params]   Optional URL parameters.
 * @memberof Blockcy
 * @method getAddr
 */
Blockcy.prototype.getAddr = function (addr, params) {
  // FIXUP
  return this._get('/addrs/' + addr, params)
}

/**
 * <b>Get Addr Full</b>
 * Get information about an address, including full transactions.
 * @param {(string|number)}    addr       Address you're querying.
 * @param {Object}             [params]   Optional URL parameters.
 * @memberof Blockcy
 * @method getAddrFull
 */
Blockcy.prototype.getAddrFull = function (addr, params) {
  // FIXUP
  return this._get('/addrs/' + addr + '/full', params)
}

/**
 * <b>Gen Addr</b>
 * Generates a new address and associate private/public keys.
 * @param {Object}   data    Optional JSON data, which could be used for generating multisig addresses, for exampl.JSON data, which could be used for generating multisig addresses, for example.
 * @memberof Blockcy
 * @method genAddr
 */
Blockcy.prototype.genAddr = function (data) {
  return this._post('/addrs', {}, data)
}

/**
 * <b>Faucet</b>
 * Funds an address. Must be used within a test blockchain (bcy-test or btc-test3).
 * @param {string}    addr     Address to be funded.
 * @param {number}    value    Amount to fund.
 * @memberof Blockcy
 * @method faucet
 */
Blockcy.prototype.faucet = function (addr, value) {
  return this._post('/faucet', {}, {address: addr, amount: value})
}

/**
 * <b>Create Wallet</b>
 * Creates a new wallet.
 * @param {Object}    data    JSON Data used to create wallet.
 * @memberof Blockcy
 * @method createWallet
 */
Blockcy.prototype.createWallet = function (data) {
  return this._post('/wallets', {}, data)
}

/**
 * <b>Create HD Wallet</b>
 * Creates a new HD wallet.
 * @param {Object}    data    JSON Data used to create HD wallet.
 * @memberof Blockcy
 * @method createHDWallet
 */
Blockcy.prototype.createHDWallet = function (data) {
  return this._post('/wallets/hd', {}, data)
}

/**
 * <b>List Wallets</b>
 * List wallets under token.
 * @memberof Blockcy
 * @method listWallets
 */
Blockcy.prototype.listWallets = function (cb) {
  return this._get('/wallets', {})
}

/**
 * <b>List HD Wallets</b>
 * List HD wallets under token.
 * @memberof Blockcy
 * @method listHDWallets
 */
Blockcy.prototype.listHDWallets = function (cb) {
  return this._get('/wallets/hd', {})
}

/**
 * <b>Get Wallet</b>
 * Get named wallet.
 * @param {string}    name    Name of the wallet you're querying.
 * @memberof Blockcy
 * @method getWallet
 */
Blockcy.prototype.getWallet = function (name) {
  return this._get('/wallets/' + name, {})
}

/**
 * <b>Get HD Wallet</b>
 * Get named HD wallet.
 * @param {string}    name    Name of the HD wallet you're querying.
 * @memberof Blockcy
 * @method getHDWallet
 */
Blockcy.prototype.getHDWallet = function (name) {
  return this._get('/wallets/hd/' + name, {})
}

/**
 * <b>Add Addresses to Wallet</b>
 * Add array of addresses to named wallet.
 * @param {string}     name    Name of the wallet you're querying.
 * @param {string[]}   addrs   Array of addresses you're adding.
 * @memberof Blockcy
 * @method addAddrWallet
 */
Blockcy.prototype.addAddrWallet = function (name, addrs) {
  return this._post('/wallets/' + name + '/addresses', {}, {addresses: addrs})
}

/**
 * <b>Get Addresses from Wallet</b>
 * Get array of addresses from named wallet.
 * @param {string}     name    Name of the wallet you're querying.
 * @memberof Blockcy
 * @method getAddrsWallet
 */
Blockcy.prototype.getAddrsWallet = function (name) {
  return this._get('/wallets/' + name + '/addresses', {})
}

/**
 * <b>Get Addresses from HD Wallet</b>
 * Get array of addresses from named HD wallet.
 * @param {string}     name    Name of the HD wallet you're querying.
 * @memberof Blockcy
 * @method getAddrsHDWallet
 */
Blockcy.prototype.getAddrsHDWallet = function (name) {
  return this._get('/wallets/hd/' + name + '/addresses', {})
}

/**
 * <b>Delete Addresses from Wallet</b>
 * Delete addresses from named wallet.
 * @param {string}      name    Name of the wallet you're querying.
 * @param {string[]}    addrs   Array of addresses you're deleting.
 * @memberof Blockcy
 * @method delAddrsWallet
 */
Blockcy.prototype.delAddrsWallet = function (name, addrs) {
  return this._del('/wallets/' + name + '/addresses', {address: addrs.join([';'])})
}

/**
 * <b>Generate Address in Wallet</b>
 * Add a generated address to named wallet.
 * @param {string}     name    Name of the wallet you're querying.
 * @memberof Blockcy
 * @method genAddrWallet
 */
Blockcy.prototype.genAddrWallet = function (name) {
  return this._post('/wallets/' + name + '/addresses/generate', {}, {})
}

/**
 * <b>Derive Address in Wallet</b>
 * Derive an address in named HD wallet.
 * @param {string}     name      Name of the wallet you're querying.
 * @param {Object}     [params]  Optional URL parameters.
 * @memberof Blockcy
 * @method deriveAddrHDWallet
 */
Blockcy.prototype.deriveAddrHDWallet = function (name, params) {
  // FIXUP
  return this._post('/wallets/hd/' + name + '/addresses/derive', params, {})
}

/**
 * <b>Delete Wallet</b>
 * Deletes named wallet.
 * @param {string}      name    Name of the wallet you're querying.
 * @memberof Blockcy
 * @method delWallet
 */
Blockcy.prototype.delWallet = function (name) {
  return this._del('/wallets/' + name, {})
}

/**
 * <b>Delete HD Wallet</b>
 * Deletes named HD wallet.
 * @param {string}      name    Name of the HD wallet you're querying.
 * @memberof Blockcy
 * @method delHDWallet
 */
Blockcy.prototype.delHDWallet = function (name) {
  return this._del('/wallets/hd/' + name, {})
}

/**
 * <b>Get Transaction</b>
 * Get transaction by hash.
 * @param {string}    hash    Hash of the transaction.
 * @param {Object}    params  Optional URL parameters.
 * @memberof Blockcy
 * @method getTX
 */
Blockcy.prototype.getTX = function (hash, params) {
  return this._get('/txs/' + hash, params)
}

/**
 * <b>Get Unconfirmed Transactions</b>
 * Get currently unconfirmed transactions.
 * @memberof Blockcy
 * @method getUnTXs
 */
Blockcy.prototype.getUnTXs = function (cb) {
  return this._get('/txs', {})
}

/**
 * <b>New Transaction</b>
 * Creates a new transaction skeleton, which returns the transaction along with data that needs to be signed. You can see more information on how this process works here: <a href="http://dev.blockcypher.com/?javascript#creating-transactions">http://dev.blockcypher.com/?javascript#creating-transactions</a>
 * @param {Object}     tx      Transaction base you're using to build a TX.
 * @memberof Blockcy
 * @method newTX
 */
Blockcy.prototype.newTX = function (tx) {
  return this._post('/txs/new', {}, tx)
}

/**
 * <b>Send Transaction</b>
 * Sends a signed transaction skeleton, which returns the completed transaction. You can read more information on how this process works here: <a href="http://dev.blockcypher.com/?javascript#creating-transactions">http://dev.blockcypher.com/?javascript#creating-transactions</a>
 * @param {Object}     txskel     Signed transaction skeleton you're sending.
 * @memberof Blockcy
 * @method sendTX
 */
Blockcy.prototype.sendTX = function (txskel) {
  return this._post('/txs/send', {}, txskel)
}

/**
 * <b>Push Transaction</b>
 * Pushes a raw, hex-serialized transaction.
 * @param {string}     hex     Hex-encoded transaction.
 * @memberof Blockcy
 * @method pushTX
 */
Blockcy.prototype.pushTX = function (hex) {
  return this._post('/txs/push', {}, {tx: hex})
}

/**
 * <b>Decode Transaction</b>
 * Decodes (but doesn't send!) a hex-serialized raw transaction. Useful for debugging issues with pushTX.
 * @param {string}     hex     Hex-encoded transaction.
 * @memberof Blockcy
 * @method pushTX
 */
Blockcy.prototype.decodeTX = function (hex) {
  return this._post('/txs/decode', {}, {tx: hex})
}

/**
 * <b>Embed Transaction</b>
 * Embeds data within a given blockchain.
 * @param {string}     hex     Hex-encoded data to embed.
 * @memberof Blockcy
 * @method pushTX
 */
Blockcy.prototype.embedData = function (hex) {
  return this._post('/txs/data', {}, {data: hex})
}

/**
 * <b>Send Micro Transaction</b>
 * Sends a transaction using private (or public) keys via the microtransaction API, as described here: <a href="http://dev.blockcypher.com/?javascript#microtransaction-endpoint">http://dev.blockcypher.com/?javascript#microtransaction-endpoint</a>
 * @param {Object}     micro    Microtransaction object.
 * @memberof Blockcy
 * @method microTX
 */
Blockcy.prototype.microTX = function (micro) {
  return this._post('/txs/micro', {}, micro)
}

/**
 * <b>Get Transaction Confidence</b>
 * Get transaction confidence by hash.
 * @param {string}    hash    Hash of the transaction.
 * @memberof Blockcy
 * @method getTXConf
 */
Blockcy.prototype.getTXConf = function (hash) {
  return this._get('/txs/' + hash + '/confidence', {})
}

/**
 * <b>Create Payment Forward</b>
 * Creates a new payment forward.
 * @param {Object}    data    JSON Data used to create payment forward.
 * @memberof Blockcy
 * @method createPayFwd
 */
Blockcy.prototype.createPayFwd = function (data) {
  return this._post('/payments', {}, data)
}

/**
 * <b>List Payment Forwards</b>
 * Lists current payments associated with this blockchain and token.
 * @memberof Blockcy
 * @method listPayFwds
 */
Blockcy.prototype.listPayFwds = function (cb) {
  return this._get('/payments', {})
}

/**
 * <b>Delete Payment Forward</b>
 * Deletes payment forward by id.
 * @param {string}      id    ID of the payment forward you're deleting.
 * @memberof Blockcy
 * @method delPayFwd
 */
Blockcy.prototype.delPayFwd = function (id) {
  return this._del('/payments/' + id, {})
}

/**
 * <b>Create WebHook</b>
 * Creates a new webhook.
 * @param {Object}    data    JSON Data used to create webhook.
 * @memberof Blockcy
 * @method createHook
 */
Blockcy.prototype.createHook = function (data) {
  return this._post('/hooks', {}, data)
}

/**
 * <b>List WebHooks</b>
 * Lists current webhooks associated with this blockchain and token.
 * @memberof Blockcy
 * @method listHooks
 */
Blockcy.prototype.listHooks = function () {
  return this._get('/hooks', {})
}

/**
 * <b>Get WebHook</b>
 * Get information about a WebHook based on its ID.
 * @param {string}    id    ID of the WebHook you're querying.
 * @memberof Blockcy
 * @method getHook
 */
Blockcy.prototype.getHook = function (id) {
  return this._get('/hooks/' + id)
}

/**
 * <b>Delete WebHook</b>
 * Deletes WebHook by its id.
 * @param {string}      id    ID of the WebHook you're deleting.
 * @memberof Blockcy
 * @method delPayFwd
 */
Blockcy.prototype.delHook = function (id) {
  return this._del('/hooks/' + id, {})
}
