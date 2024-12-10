import{_ as e,c as o,o as t,a3 as i}from"./chunks/framework.Dcugq_a2.js";const b=JSON.parse('{"title":"💡 The Solution","description":"","frontmatter":{},"headers":[],"relativePath":"solution.md","filePath":"solution.md","lastUpdated":1713910977000}'),r={name:"solution.md"},a=i('<h1 id="💡-the-solution" tabindex="-1">💡 The Solution <a class="header-anchor" href="#💡-the-solution" aria-label="Permalink to &quot;💡 The Solution&quot;">​</a></h1><p>Our solution is divided into different repositories, each focusing on a specific component. This modular approach allows us to maintain flexibility and scalability, enabling users to customize and integrate the solution according to their specific needs and requirements.</p><h2 id="didroom-control-room-dashboard" tabindex="-1">DIDroom Dashboard (Dashboard) <a class="header-anchor" href="#didroom-control-room-dashboard" aria-label="Permalink to &quot;DIDroom Dashboard (Dashboard)&quot;">​</a></h2><p>The DIDroom Dashboard/Dashboard serves as the central hub for managing decentralized identity solutions. It provides a user-friendly interface for configuring settings, monitoring performance, and accessing key functionalities.</p><p>The core features of the Control Room are:</p><ul><li>Creation of credential issuance and verification flows</li><li>Deployment and provisioning of the DIDroom Microservices</li><li>Creation of organizations, assigning of privileges to different users</li><li>The admin panel of the Control Room offers: <ul><li>User management</li><li>Setup of web-hooks and automation flows</li><li>Customization of the Control Room menu entries</li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">RESOURCES</p><p><a href="https://github.com/forkbombeu/signroom" target="_blank" rel="noreferrer">GitHub</a></p><p><a href="https://dashboard.didroom.com" target="_blank" rel="noreferrer">Public beta</a></p></div><h2 id="didroom-mobile-libs-mobile-zencode" tabindex="-1">DIDroom Mobile libs (Mobile Zencode) <a class="header-anchor" href="#didroom-mobile-libs-mobile-zencode" aria-label="Permalink to &quot;DIDroom Mobile libs (Mobile Zencode)&quot;">​</a></h2><p>A collection of mobile library, <em>Zencode Mobile</em> holds all the business logic and contracts shared between the different components of the DIDroom Solution. It serves as a centralized repository for managing and updating the core business logic used across various mobile applications and components.</p><div class="tip custom-block"><p class="custom-block-title">RESOURCES</p><p><a href="https://github.com/forkbombeu/mobile_zencode" target="_blank" rel="noreferrer">GitHub</a></p></div><h2 id="didroom-microservices" tabindex="-1">DIDroom microservices <a class="header-anchor" href="#didroom-microservices" aria-label="Permalink to &quot;DIDroom microservices&quot;">​</a></h2><p>Those are the technological core of the solution: those components offer cryptographic functions as well as transport protocols. The microservices are completely isolated from the Dashboard, meaning that:</p><ul><li>The code is hosted in a separated repo</li><li>The microservices can run independently from the Dashboard</li><li>Each microservice has its own secret keys and DID to identify them: those are generated by the microservice at its first provisioning</li></ul><p>DIDroom microservices are generated using No-code-room (NCR) and utilize the Zencode Mobile repository to create three different microservices:</p><ul><li><strong>Credential Issuers</strong>: These microservices are compliant with Openid4VCI standards and handle the issuance of credentials.</li><li><strong>Authorization Servers</strong>: These microservices implement OAuth2 and work seamlessly with our DID Service for authentication and authorization.</li><li><strong>Relying Party</strong>: These microservices are compliant with Openid4VP standards and act as relying parties for authentication and authorization.</li></ul><div class="tip custom-block"><p class="custom-block-title">RESOURCES</p><p><a href="https://github.com/forkbombeu/DIDroom_microservices" target="_blank" rel="noreferrer">GitHub</a></p></div><h2 id="wallet-holder-app" tabindex="-1">Wallet Holder App <a class="header-anchor" href="#wallet-holder-app" aria-label="Permalink to &quot;Wallet Holder App&quot;">​</a></h2><p>The Wallet Holder App offers a secure and user-friendly interface for managing decentralized identities and digital credentials. It allows users to store, view, and share their identity information with ease inside a TEE (Trusted execution environment) directly on citizens devices.</p><div class="tip custom-block"><p class="custom-block-title">RESOURCES</p><p><a href="https://github.com/forkbombeu/wallet" target="_blank" rel="noreferrer">GitHub</a></p><p><a href="https://github.com/ForkbombEu/wallet/releases/latest/download/wallet.apk" target="_blank" rel="noreferrer">Latest relase</a></p></div><h2 id="verifier-app" tabindex="-1">Verifier App <a class="header-anchor" href="#verifier-app" aria-label="Permalink to &quot;Verifier App&quot;">​</a></h2><p>The Verifier App provides tools for verifying the authenticity and validity of decentralized identities and digital credentials. It enables organizations to validate identity claims and ensure compliance with regulatory requirements.</p><div class="tip custom-block"><p class="custom-block-title">RESOURCES</p><p><a href="https://github.com/forkbombeu/verifier" target="_blank" rel="noreferrer">GitHub</a></p><p><a href="https://github.com/ForkbombEu/verifier/releases/latest/download/wallet.apk" target="_blank" rel="noreferrer">Latest relase</a></p></div><h2 id="didroom-web-components" tabindex="-1">DIDroom web components <a class="header-anchor" href="#didroom-web-components" aria-label="Permalink to &quot;DIDroom web components&quot;">​</a></h2><p>DIDroom Web Components hold all the UI web components used across all the projects to ensure a coherent Atomic design and allow for white-labeling.</p><div class="tip custom-block"><p class="custom-block-title">RESOURCES</p><p><a href="https://forkbombeu.github.io/DIDroom-components" target="_blank" rel="noreferrer">Storybook</a></p><p><a href="https://github.com/forkbombeu/DIDroom-components" target="_blank" rel="noreferrer">GitHub</a></p></div>',25),s=[a];function n(l,c,d,h,m,p){return t(),o("div",null,s)}const f=e(r,[["render",n]]);export{b as __pageData,f as default};
