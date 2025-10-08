---
order: 10
title: Web Verifier
---
## Web Verifier

The Web Verifier is the latest DIDroom component for verifying credentials through the **OpenID4VP 1.0** protocol.
It replaces the legacy *Mobile Verifier App* for all modern verification flows.

Unlike the mobile app, which implemented a custom verification method, the Web Verifier runs entirely in the browser and supports **standardized presentation requests** and **dynamic session handling**.

### Configuration and Operation

Each Web Verifier instance is configured through two linked components:

- **Verification Template** — defines the presentation request structure, credential types, and trust conditions.
- **Verification Flow** — binds the template to a specific user-facing Verifier page and handles runtime execution.

Both are managed by the **DIDroom Verification Microservice**, which automatically generates the corresponding web interface and QR/URI endpoints.
This microservice runs NCR (No-Code-Room) scripts powered by Zenroom to process OpenID4VP requests and evaluate presentation proofs securely within the browser.


### Overview

Assuming the Verifier is deployed at: `verifier.my-app.com/verifier`

The Web Verifier is accessible at a URL like this:
```
verifier.my-app.com/verifier/8j7f77hq07m405v
```
through a standard web interface looking like this:

![Verifier Landing Page](../../images/verifier-landing-page.png)


Users land on a **list of available verification flows**, each represented by a card.
Clicking on a card opens a dedicated Verifier page with a unique permanent link such as `verifier.my-app.com/verifier/list` :

![Users Landing Page](../../images/users-landing.png)

For reference, see our test deployment here: https://relying-party1.zenswarm.forkbomb.eu/verifier/list

Each verifier page corresponds to a **presentation request** (expressed in DCQL format) that can be rendered both as:
- a **QR code**, ready to be scanned by any compatible wallet, and
- a **clickable OpenID4VP request URI** (URN-style link) for browser-based verification.

### Protocol and Standards

- **Protocol:** OpenID4VP 1.0
- **Credential formats:** W3C VC 2.0, SD-JWT, and soon ISO mdoc
- **Flow type:** Presentation request initiated via QR or URI
- **Execution engine:** NCR (No-Code-Room) + Zenroom

### Verification Flow

1. The verifier operator opens the page at `verifier.my-app.com/verifier/list`.
2. They choose a verification flow (card) and open its permanent link.
3. The wallet holder scans the QR code (or clicks the URI).
4. Both the **Wallet** and the **Web Verifier** display the verification result in real time.
5. Upon successful verification, the Verifier can:
   - trigger a **301 redirect** back to a predefined URL in the Wallet, and/or
   - call an **external API endpoint** (webhook) to notify a third-party system.

### Configuration and Access Control

- The Web Verifier is **publicly accessible** by default.
- Optionally, it can be placed behind an authentication layer if verification should be restricted to authorized users only.

### Integration

For developers wishing to integrate with external systems or automate result handling, see the dedicated guide:
[**Verifier — 3rd Party Integration**](../Flows/integration-with-3rd-party.html)

---

### Legacy Mobile Verifier App

The earlier *Mobile Verifier App* (available on Android and iOS) remains functional but only supports a **custom, non-OpenID4VP flow**.
It is maintained for backward compatibility but will not receive new protocol updates.


