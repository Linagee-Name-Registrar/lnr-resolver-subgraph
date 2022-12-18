# Linagee Resolver Subgraph

##### Linagee resolver-subgraph to keep track of primary and controllers set

### Important 
When the Resolver implementation contract is updated, the ABI from 
this subgraph must also be updated and the subgraph deployed again.

### Deployed url
Currently this subgraph is deployed [here](https://thegraph.com/hosted-service/subgraph/chriton/lnr-resolver-subgraph).
You can deploy your own or use that one.

# How to deploy this subgraph

- Create an account at [thegraph](https://thegraph.com/)
- From the Subgraph Studio(not free) or Hosted Service (free) section create a subgraph.   
  Note that the Subgraph Studio / Hosted Service section will also have installation instructions.
- After you create it, follow these steps to deploy this graph:

```shell
# INSTALL GRAPH CLI 
yarn global add @graphprotocol/graph-cli

# INSTALL THE DEPENDENCIES
yarn install

# AUTH (ON STUDIO OR HOSTED) AND DEPLOY. KEY IS IN THEGRAPH PAGE
graph auth --product subgraph-studio {your_key}
graph auth --product hosted-service {your_key}

# BUILD THE SUBGRAPH
graph codegen && graph build

# DEPLOY THE SUBGRAPH TO STUDIO OR TO HOSTED (FREE VERSION)
graph deploy --product subgraph-studio {subgraph_name}
graph deploy --product hosted-service {your_github_account}/{subgraph_name}
```

### Example query to get the users/addresses

```
{
  users(first: 1000, orderBy: index, orderDirection: asc) {
    id,
    isPrimaryForDomain,
    isControllerForDomain,
    index
  }
}
```

### Example query to see the number of primary and controllers set
```
{
  stats(id:1) {
    totalPrimary,
    totalController
  }
}
```

### Example query to see the primary domain and controller set for x address
```
{
  users(where: {id: "0xf0330757848fce323cc55f9768dc641f966325b2"}) {
    isPrimaryForDomain,
    isControllerForDomain
  }
}
```

Note that at the moment the address provided must be lower case. <br/>
The value returned for isControllerForDomain is an array because a user can set an address to be
the controller for multiple domains.

