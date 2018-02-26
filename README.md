# Blockcypher Client

A flexible Node.js client for the BlockCypher API, using promises and a
configurable endpoint.

The code is available at
[github.com/poexio/blockcypher](https://github.com/poexio/blockcypher).

See [dev.blockcypher.com](http://dev.blockcypher.com/) for more information.

To install, just use npm:

```bash
npm install --save @poexio/blockcypher
```

## Examples

```javascript
const Bcypher = require('@poexio/blockcypher')

const bcapi = new Bcypher('btc', 'main', 'YOURTOKEN')

const main = async () => {
  // get chain info
  const chain = await bcapi.getChain()

  // get block height without any optional URL params
  const block = await bcapi.getBlock(300000)

  // get block height with an optional "txstart" param
  const block2 = await bcapi.getBlock(300000, {txstart: 2})

  // Let's try a post request, like making a new webhook
  const webhook = {
    event: 'unconfirmed-tx',
    address: '15qx9ug952GWGTNn7Uiv6vode4RcGrRemh',
    url: 'https://my.domain.com/callbacks/new-tx'
  }
  const createdWebHook = await bcapi.createHook(webhook)

  // Now let's list all of our webhooks
  const hooksList = await bcapi.listHooks()

  // Finally let's delete the webhook
  await bcapi.delHook(createdWebHook.id)

  return {chain, block, block2, hooksList}
}

main()
  .then(d => { console.log(d) })
  .catch(e => { console.log(e.message) })
```

### Configurable Endpoint

In case you need to route requests through a proxy, the service URL can be
changed with:

```js
const bcapi = new Bcypher('btc', 'main', 'YOURTOKEN', 'https://some-proxy.example.com/v1/')
```

## Testing

Run tests with:

```sh
npm test
```

## Documentation

Generate docs with:

```sh
npm run docs
```

## License

The MIT License (MIT)

Copyright &copy; 2015 BlockCypher, Inc.  
Copyright &copy; 2018 PoEx Co., Ltd
