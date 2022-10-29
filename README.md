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

# AUTH AND DEPLOY. KEY IS IN THEGRAPH PAGE
graph auth --studio {your_key}

# BUILD THE SUBGRAPH
graph codegen && graph build

# DEPLOY THE SUBGRAPH TO STUDIO OR TO HOSTED (FREE VERSION)
graph deploy --product subgraph-studio {subgraph_name}
graph deploy --product hosted-service {your_github_account}/{subgraph_name}
```

### Example query

```
{
  domains(first: 1000, orderBy: index, orderDirection: asc) {
    id
    nameBytecode,
    nameUtf8,
    primary,
    controller,
    index
  }
}
```

