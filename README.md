# Get Info

This worker gets the headers from a response. The headers selected are mentioned in [getInfoConfig.json] and more can be read in a section below.


## Live Version of the Worker

The live version of the worker can be accessed at 


## REST API Documentation

Access the documentation on your browser or through your Postman client using the button below

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1286054-70962096-e5b7-4e3d-950b-cd7aebb20ee6?action=collection%2Ffork&collection-url=entityId%3D1286054-70962096-e5b7-4e3d-950b-cd7aebb20ee6%26entityType%3Dcollection%26workspaceId%3D1fbb7e17-9ab9-4f64-811f-744014867d88)


## Deployment instructions

## Required modifications 

### Modify Parameters in wrangler.toml

Following parameters need to be modified especially for your usage 

- route (wildcard URL pattern that should match the URLs that this worker should intercept)
- account_id (Cloudflare Account ID is also available in Cloudflare Dashboard)

More can be learnt about the above parameters on https://developers.cloudflare.com/workers/cli-wrangler/configuration/

## Deployment Instruction for Github Action

The Cloudflare Deployment Github Action is given in .github/actions.yml

- Make the necessary modifications according to guide above
- Create an API Token for Cloudflare, refer to this guide to create one and copy it https://developers.cloudflare.com/api/tokens/create/
- After creating one add a Secret to Github Action by the name of "CF_API_TOKEN"
- A helpful guide for adding secrets is available on https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository
- Trigger a redeploy by pushing or through Github Actions dashboard

## Deployment Instructions Manually

- Run `npm install -g @cloudflare/wrangler`
- Make modifications as to the wrangler.toml as desired, keep in consideration the modifications mentioned in wrangler.toml in previous section
- Run `wrangler login`
- Run `wrangler publish`


## Worker Specific Configuration

### getInfoConfig.json


The file [getInfoConfig.json](./getInfoConfig.json) is a configuration file aimed at modifying the logical functionality of worker. 

Following are the parameters supported in this json file, their types and descrtipions.


|Parameter|Type|Description|
|---|---|---|
|selectedHeaders|`string[]`|The only headers that are shown from the response|