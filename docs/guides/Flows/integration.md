---
title: 3rd party integration
order: 40
---

### **Tutorial: Integrating a Third-Party Service (e.g., DIDroom) for EUDI Credential Issuance**

**Objective:** This tutorial guides you through using the **Forkbom Dashboard** to create a credential issuance flow that authorizes a user and pulls data from an external REST API service. We will use **DIDroom** as our example third-party service, but the principles apply to any service with a compatible API.

**Core Concept:** The flow is built on three pillars, defined in the dashboard as **Templates**:

1. **Authorization Template:** Authenticates the user and calls the external API.
2. **Issuance Template:** Formats the data from the API into verifiable credential claims.
3. **Verification Template:** Defines the rules for verifying the issued credential.

These templates are then bundled into **Flows** and deployed as **Microservices**.

---

### **Part 1: Dashboard & Organization Setup**

1. **Access the Dashboard:** Go to `dashboard.didroom.com` and log in.
2. **Create an Organization:**
   * This is your workspace. Navigate to "My Organization" and click "Create a new organization."
   * Give it a name, upload a logo, and add a description.

### **Part 2: Creating the Templates (The Business Logic)**

#### **Step 2.1: Create the Authorization Template**

This template handles the initial user interaction and the call to your external service (e.g., DIDroom).

1. **Create a New Template:**
   * Go to the **Templates** section and click "New Template."
   * Select the **Authorization** type.
   * **Name:** `demo-didroom-service-authorization`
2. **Design the User Form (JSON Schema):**
   * This form is what the user will see and fill out in their wallet. It collects the data needed for your API call.
   * You can use the UI editor or the JSON editor for more control. For a DIDroom-like service, you might ask for:
     * `user_handle` (text input)
     * `api_token` (password input)
   * **Example JSON Schema Snippet:**

     ```json
     {
       "type": "object",
       "properties": {
         "user_handle": {
           "title": "Your DIDroom Handle",
           "type": "string"
         },
         "api_token": {
           "title": "Your API Token",
           "type": "string",
           "format": "password"
         }
       },
       "required": ["user_handle", "api_token"]
     }
     ```
3. **Write the Custom Logic (ZenCode):**
   * This is where you call the DIDroom API. The data from the form is available as variables (e.g., `input.user_handle`).
   * **Key Steps in the Code:**
     * **Prepare the Request:** Create the HTTP request to the DIDroom API endpoint. Include necessary headers (like an `Authorization` header using `input.api_token`).
     * **Make the Call:** Use the `http_post` or `http_get` function to call the API.
     * **Process the Response:** Extract the relevant data from the API's JSON response.
     * **Save for Issuance:** Store all data that should end up in the credential in the `data` object (e.g., `data.didroom_id`, `data.verification_status`, `data.timestamp`). This makes it available for the next template.

#### **Step 2.2: Create the Issuance Template**

This template defines the structure of the verifiable credential itself.

1. **Create a New Template:**
   * Click "New Template" and select the **Issuance** type.
   * **Name:** `demo-didroom-service-issuance`
2. **Define Credential Claims (Form Structure):**
   * Unlike the authorization template, this form defines the *output* claims of the credential.
   * List the claims that will be in the credential. These should match the data you saved in the previous step.
     * `didroom_id` (string)
     * `verification_status` (string)
     * `timestamp` (string)
3. **Write the Custom Logic (ZenCode):**
   * The main goal here is to map the data from the authorization step into the final credential.
   * **Key Steps in the Code:**
     * **Access Authorization Data:** Retrieve the data saved earlier using `authorization.details.claims.<claim_name>` (e.g., `authorization.details.claims.didroom_id`).
     * **Populate Holder Claims:** Create a `holder_claims` dictionary and assign the values from the authorization data to it. This is what gets signed into the credential.
     * **Example Code:**

       ```zencode
       var holder_claims := string_dictionary[]
       holder_claims["didroom_id"] = authorization.details.claims.didroom_id
       holder_claims["verification_status"] = authorization.details.claims.verification_status
       holder_claims["timestamp"] = authorization.details.claims.timestamp
       ```

#### **Step 2.3: Create the Verification Template**

This template defines what a verifier will check when presented with your credential.

1. **Create a New Template:**
   * Click "New Template" and select the **Verification** type.
   * **Name:** `demo-didroom-service-verification`
2. **Configure the Verification Query:**
   * The system uses a query to specify which credentials are acceptable.
   * You can request that certain claims must be present (e.g., `didroom_id` must exist).
   * **Advanced:** You can specify exact values a claim must have. For example, you could set a rule that only accepts credentials where `verification_status` is `"verified"`.
3. **Optional: Custom Post-Verification Logic (ZenCode):**
   * After a successful verification, you can execute custom code.
   * **Powerful Feature: Redirect URI.** You can set a `data.redirect_uri` variable. After verification, the user's wallet will automatically redirect to this URL, allowing for seamless access to gated content or services.

     ```zencode
     // Example: Redirect to a success page after verification
     if (verification_was_successful) {
         data.redirect_uri := "https://yourapp.com/verified-access-granted"
     }
     ```

### **Part 3: Bundling Logic into Flows**

#### **Step 3.1: Create an Issuance Flow**

This combines your authorization and issuance templates into a single credential offer.

1. Go to the **Issuance Flows** section and click "New Issuance Flow."
2. **Basic Info:** Give it a name (e.g., "DIDroom Verification Credential"), type, description, and a logo.
3. **Credential Cryptography:** Choose the credential format (e.g., SD-JWT or W3C VC).
4. **Template Selection:**
   * **Authorization Template:** Select your `demo-didroom-service-authorization` template.
   * **Credential Template:** Select your `demo-didroom-service-issuance` template.
5. **Expiration:** Set how long the credential is valid.
6. **Microservice Binding:** Select the Authorization Server and Credential Issuer microservices that will host this flow. (You can create these on the Microservices page if they don't exist).

#### **Step 3.2: Create a Verification Flow**

This makes your verification template publicly accessible.

1. Go to the **Verification Flows** section and click "New Verification Flow."
2. **Basic Info:** Provide a name and type.
3. **Template Selection:** Select your `demo-didroom-service-verification` template.
4. **Microservice Binding:** Select the Verifier microservice to host this flow.

### **Part 4: Deployment**

The logic is configured. Now, you need to run it on a server.

1. **Download Microservices:**
   * Go to the **Microservices** page.
   * Use the "Download" or "Download cURL" button. This provides a package or a command to fetch a ZIP file containing your dedicated Authorization Server, Credential Issuer, and Verifier.
2. **Deploy the Microservices:**
   * Upload the downloaded ZIP file to your server and extract it.
   * You will find separate folders for each service (e.g., `demo_AS/`, `demo_CI/`, `demo_VER/`).
   * **You have two main deployment options:**
     * **Docker Compose (Simplicity):** Use the provided `docker-compose.yml` file to start all services with one command. Ideal for testing and clean environments.
     * **Process Manager (Production Flexibility):** As shown in the webinar, you can run each service individually (e.g., using `make run` or a process manager like **PM2**). This is preferred for complex deployments with multiple organizations, as it allows you to manage a central reverse proxy (like Caddy or Nginx).
3. **Test the Flow:**
   * Once running, your services will be available at their configured HTTPS endpoints.
   * **Issuance:** Use a wallet (like the Forkbom web wallet) to scan the credential offer from your Issuance Flow. It will guide the user through your custom form and call the DIDroom API.
   * **Verification:** Visit your Verifier's URL, select the "DIDroom Verification" flow, and scan the resulting QR code with a wallet that holds the credential. The verification result and any redirect will occur.

---

### **Summary & Key Takeaways**

* **Templates are for Logic:** Authorization, Issuance, and Verification templates contain your custom business logic and API calls.
* **Flows are for Users:** Issuance and Verification flows bundle templates into user-facing services.
* **Microservices are for Deployment:** They are the live endpoints where your flows run.
* **Data Passing:** Use the `data` object in the Authorization template to pass information to the Issuance template via `authorization.details.claims`.
* **Flexibility:** The same pattern used for Kobo Toolbox applies to **DIDroom** or any other REST API service for issuing rich, verifiable credentials.
