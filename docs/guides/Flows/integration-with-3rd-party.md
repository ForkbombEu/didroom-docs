---
title: 3rd party integration
order: 40
---

## 1) Dashboard Overview

The DIDroom dashboard brings together everything required to configure and run **OpenID4VCI** and **OpenID4VP** flows.

- **Templates** hold custom Zencode executed inside OpenID4VCI or OpenID4VP endpoints.
- **Flows** bundle these templates into runnable endpoints that define a complete issuance or verification process.
- **Microservices** (Authorization Server, Credential Issuer, Verifier) expose those endpoints over HTTPS and execute the templates in real time.

This view is the entry point for any integration: from here you create templates, link them into flows, and deploy the corresponding microservices.

`[![Dashboard Overview](../../images/dashboard-overview.png)]`


## 2) Authorization Template — Collect & Call External API

An **Authorization Template** extends the **OpenID4VCI `/authorize`** phase with custom logic.
It can collect user input through a JSON Schema form and perform external API calls using Zencode.
This allows DIDroom to validate or enrich credential data before issuance.

Example — calling an external REST API (e.g., KoboToolbox):

```
zencode
Scenario 'authorization'
  Given I have a 'request' named 'form'
  Given I have a 'string' named 'token'
  When I set the HTTP header 'Authorization' to 'Bearer ' + token
  When I do a POST request to 'https://api.example.org/submissions/' with body from 'form'
  Then save the HTTP 'response' into 'authorization.result'
```

### → Flow: Authorization → Issuance

Once the template is saved, it is linked into an OpenID4VCI Issuance Flow together with an Issuance Template.
At runtime:

1. The Authorization Server displays the form defined in the template.

1. Zencode executes, calling the external API.

1. The collected and validated data (authorization.result.*) is passed automatically to the Issuance Template, which runs during /credential.

This separation lets you integrate third-party services without modifying the main flow logic


## 3) Issuance Template — Build the Credential Claims

An **Issuance Template** defines the logic that runs during the **OpenID4VCI `/credential`** phase.
It transforms the output of the Authorization step into the final credential claims that will be signed and issued.

Example — mapping values from the authorization result into credential claims:

```zencode
Scenario 'issuance'
  Given I have a 'map' named 'authorization'
  When I create a 'map' named 'holder_claims'
  And I copy 'authorization.result.formId' to 'holder_claims.formId'
  And I copy 'authorization.result.submissionDate' to 'holder_claims.submissionDate'
  Then set 'claims' to 'holder_claims'
```

### → Flow: Issuance (Authorization + Issuance)

The Issuance Flow connects both templates into a single OpenID4VCI process:

1. The Authorization Server collects and validates input through its template.

1. The Credential Issuer invokes this Issuance Template to build and sign the credential.

1. The final credential is returned to the holder, completing the OpenID4VCI transaction.

This modular design lets you swap or update Authorization and Issuance logic independently while keeping the same flow structure.

## 4) Verification Template — Declare Rules with DCQL

A **Verification Template** runs during the **OpenID4VP verification** phase.
It defines what the verifier expects from the presented credential using **DCQL (Declarative Claim Query Language)**.
This allows verifiers to describe claim requirements in a clear, machine-readable way.

Example — simple DCQL rule requiring a `submissionDate` claim:

```json
{
  "query": {
    "credentialType": "KoboSubmission",
    "claims": {
      "submissionDate": { "present": true }
    }
  }
}
```

### → Flow: Verification

The Verification Flow binds this template to a Verifier microservice running OpenID4VP endpoints.

1. The Verifier publishes the DCQL rules defined in the template.

1. The Wallet selects credentials that satisfy those rules.

1. During /verify, the Verifier executes any attached Zencode to perform additional business logic.

1. The result confirms whether the presented credential meets all declared conditions.

This approach keeps verification logic declarative, modular, and easy to audit.


## 5) Deploy Microservices — Run the Flows

Once your templates and flows are configured, DIDroom packages them into ready-to-run microservices.
Each microservice hosts its **OpenID4VCI** or **OpenID4VP** endpoints and executes the templates attached to its flow.

**Key points**

- Every microservice exposes an **HTTPS URL**, typically served behind **Caddy** or another reverse proxy.
- The **Authorization Server** runs `/authorize` for OpenID4VCI.
- The **Credential Issuer** runs `/credential`, issuing signed credentials.
- The **Verifier** runs `/presentation_definition` and `/verify` for OpenID4VP.
- Each service embeds its linked templates and flow configuration at build time.


`[![Download Microservice](../../images/integrating-microservices-download-curl.png)]`

`[![cURL excerpt](../../images/integrating-microservices-download-curl-excerpt.png)]`

---

### → Deployment Steps

1. In the DIDroom dashboard, open **Microservices → Download via Curl**.
2. Copy the generated **cURL** command to your terminal.
3. Run it to pull and start the container (Authorization / Issuer / Verifier).
4. Use **Docker Compose** or another orchestrator to run them together.
5. Set up **Caddy** (or Nginx) to terminate TLS and route traffic to each service.

After deployment, your endpoints are live and can be used by any OpenID4VCI or OpenID4VP-compliant wallet.

---

### → Flow Integration Recap

- **Issuance Flow:** combines Authorization + Issuance templates; hosted by Authorization Server + Issuer.
- **Verification Flow:** combines a single Verification template; hosted by Verifier.
- All flows share the same architecture, and every microservice runs the templates you selected at configuration time.

## 6) Summary & Troubleshooting

The DIDroom integration flow connects templates, flows, and microservices to enable secure credential issuance and verification using OpenID4VCI and OpenID4VP.

---

### ✅ Quick Summary

1. **Authorization Template**
   - Collect input and call external APIs.
   - Save responses under `authorization.result.*`.

2. **Issuance Template**
   - Map data from `authorization.result.*` into final credential `claims`.
   - Define how credentials are signed (SD-JWT or W3C VC).

3. **Issuance Flow**
   - Connect Authorization + Issuance templates under the same OpenID4VCI flow.

4. **Verification Template**
   - Declare credential and claim requirements using **DCQL**.
   - Optionally run Zencode for extra business logic.

5. **Verification Flow**
   - Bind the Verification template to a Verifier microservice (OpenID4VP).

6. **Deploy Microservices**
   - Download and run the Authorization Server, Credential Issuer, and Verifier.
   - Serve them behind Caddy or another reverse proxy with HTTPS enabled.

`[![Credential Output](../../images/issuance-flow-qr.png)]`

---

### 🧩 Troubleshooting

| Issue | Cause | Solution |
|-------|--------|-----------|
| **Missing claims** | Data not saved correctly in `authorization.result.*` | Check the Authorization Template’s Zencode output |
| **Verification fails** | DCQL field names don’t match credential claims | Align claim paths and names in both Issuance and Verification templates |
| **Invalid signature** | Wrong crypto profile or key mismatch | Re-generate credentials with matching SD-JWT or W3C VC configuration |
| **HTTPS / port conflicts** | Reverse proxy misconfiguration | Adjust Caddy/Nginx routes and container ports |

---

### 🏁 Next Steps

- Test the flows with any **OpenID4VCI-compatible wallet**.
- Reuse the same integration pattern for other APIs (HR, education, IoT, etc.).
- Publish your flows on **DIDroom** to make them reusable by partners (available on request).



