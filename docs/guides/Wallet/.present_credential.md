---
title: Present Credential
order: 40
---



# Present a credential

A credential is a cryptographic object, containing a set of claims and a signature from a trusted issuer. 

The purpose of having a credential is to able to **prove the claims** to someone in a **secure and private way**. In order to prove the claims, you will need to *present the credential*, the term 'present' has technical implication that involve: 
- Cryptographic transformations applied to the credential in order to produce a **Verifiable Presentation**
- The communication of the Verifiable Presentation to an application or microservice (called *Relying Party*) that will verify the claims 

Those steps (among with others that we omit for simplicity) occur in the **Verification Flow**. 

## The Verification Flow

The Verification Flow is initiated by a Verifier, meaning a user equipped with the [Verifier App](https://github.com/ForkbombEu/verifier) and the following happens: 
1. The Verifier App produces a QR-Code
1. The user holding the Wallet App, opens QR-Code reader and scans the QR-Code
1. The Wallet App reads the QR-Code, reads the request of the Verifier and search through list of obtained credentials to see if any of them matches the request.
1. If a credential is found, that matches the request of the Verifier, than a Verifiable Presentation is produced and sent to Relying Party
1. If the verification of the Verifiable Presentation is successful (or fails), a notification will appear in both the Wallet and Verififer App