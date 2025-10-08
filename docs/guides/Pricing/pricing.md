---
title: Pricing
order: 10
---

# 🫱🏽‍🫲🏿 Pricing 🫱🏾‍🫲🏼
 
## Pricing Tables

Our pricing table. For a quick description of the different items, see below. 

|                         										| **Free**        | **Pro**       |        **Enterprise** |  
|--|--|--|--|
|<span style="color:blue">Organizations</span>    				|  		 1          |      1       	| Unlimited             |
|<span style="color:blue">Issuance flows</span>					|  		 1          |      5       	| Unlimited             |
|<span style="color:blue">Verification flows</span>				|  		 1          |      5       	| Unlimited             |
|<span style="color:blue">Public credentials</span>				|  		No          |      No      	|  	Yes                 |
|Microservices Deployment 										|  Manual         	| Manual, Auto  | Manual, Auto, CI      |
|Control Room             										|  SaaS           	| SaaS          | SaaS, on premises     |
|<span style="color:red">Admin Dashboard</span> 				|  No             	| No            | On premises           |
|<span style="color:red">Credential customization Support</span> |    No   			|     Github  	| Training, Support, Customization |
|<span style="color:red">White labeling</span>					|  No	            |     No        | Yes  	                    |
|<span style="color:red">W3C-DID service</span> 				|  SaaS	          	|     SaaS      | SaaS, on premises, customizable     |
|**Price**                										| **Free!**       	| **99 €/month**|  [Call Sales](mailto:sales@forkbomb.eu)   |



## Feature description

Below a description of the individual features. 

### Organizations
- Description: an Organization contains users, Credential Issuance and Verification, and Microservices setup.  
- Info: [Dashboard Basics](/guides/Flows/basics.html)

### Issuance flows and Verification flows
- Description: Credential Issuance and Verification flows define what a Credential contains, how it is issued and how it is verified. Issuance and Verification are operated by Microservices.  
- Info: [Create an Issuance/Verification Flow](/guides/Flows/flows.md)  

### Microservices Deployment 

- Description: Microservices operate Credential Issuance and Verification. The Wallet and Verifier apps exchange information with the Microservices. 
- Info: [Deploy Microservices](/guides/Orgadmin/microservices-provision-deployment.html) 

### Control Room
- Description: the DIDroom Dashboard is the main web application to setup Organizations, users, Credential Issuance and Verification Flows and Microservices.
- Info: [DIDroom Dashboard](../Orgadmin/index) 

### Admin Dashboard
- Description: the DIDroom Admin Dashboard is the backend of the whole DIDroom ecosystem. It is based on [Starters SaaS](https://github.com/dyne/starters) which itself is powered by [Pocketbase](https://github.com/pocketbase/pocketbase)
- Info: [System Administrator](../Sysadmin/)

### Public credentials      
- Description: this feature allows you to have your credential Issuance flow visible by anyone who installs the DIDroom Wallet and Verifier app. The Wallet users can request the credentials by clicking on the credential from the Wallet's home.

### Credential customization Support
- Description: the Credential Authorization, Issuance and Verification, can be customised, for example to read the credential's data from an external database or to perform Authorization on a 3rd party service. Customization is implemented on our Online IDE [Apiroom](https://apiroom.net/) using [Zenroom](https://dev.zenroom.org/) and [Slangroom](https://dyne.org/slangroom/).
- Info: we offer custom development and training for the customization 

### White labeling
- Description: the [Wallet app](https://github.com/forkbombEu/wallet), the [Verifier App](https://github.com/forkbombEu/verifier) and the [DIDroom Dashboard](https://github.com/ForkbombEu/signroom/tree/main/webapp) are white-label friendly. White-labeling is performed using [DIDroom-Components](https://github.com/ForkbombEu/didroom-components) and the [Playbook](https://forkbombeu.github.io/didroom-components/).  
- Info: we offer support for white-labeling and custom development  

### W3C-DID service
- Description: DIDroom uses Dyne.org's W3C-DID [implementation](https://github.com/dyne/w3c-did) and [service](https://explorer.did.dyne.org/).  
- Info: we offer support for deployment and custom development of W3C-DID services. 
