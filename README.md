# Blockcypher Client

A fork of the official Node.js SDK for the BlockCypher Web services. See
[http://dev.blockcypher.com](http://dev.blockcypher.com/) for detailed
documentation.

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

  // get block height with an optional "txstart" param, as outlined in docs here: http://dev.blockcypher.com/
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

## License

The MIT License (MIT)

Copyright &copy; 2015 BlockCypher, Inc.  
Copyright &copy; 2018 PoEx Co., Ltd
