import{_ as e,c as t,o,a3 as r}from"./chunks/framework.CHPBlGxi.js";const y=JSON.parse('{"title":"Keypairoom: (re)generate your secret keys","description":"","frontmatter":{},"headers":[],"relativePath":"guides/5_components/keypairoom.md","filePath":"guides/5_components/keypairoom.md","lastUpdated":1715167532000}'),a={name:"guides/5_components/keypairoom.md"},s=r('<h1 id="keypairoom-re-generate-your-secret-keys" tabindex="-1">Keypairoom: (re)generate your secret keys <a class="header-anchor" href="#keypairoom-re-generate-your-secret-keys" aria-label="Permalink to &quot;Keypairoom: (re)generate your secret keys&quot;">​</a></h1><p>Keypairoom is component to <strong>generate and regenerate a keyring</strong>, containing multiple secret keys (along with the correspondet public keys) in a <strong>deterministic and private way</strong>.</p><p>The cryptographic part consists of multiple <a href="https://zenroom.org/" target="_blank" rel="noreferrer">Zenroom</a> scripts that allows you to generate a seed by answering to questions that (probably) only you can respond, namely &quot;The challenges&quot;.</p><h2 id="privacy" tabindex="-1">Privacy <a class="header-anchor" href="#privacy" aria-label="Permalink to &quot;Privacy&quot;">​</a></h2><p>The challenges are processed inside the client applications (the <a href="https://github.com/ForkbombEu/wallet" target="_blank" rel="noreferrer">Wallet App</a> or the browser where you opened the <a href="https://dashboard.didroom.com/" target="_blank" rel="noreferrer">DIDroom Dashboard</a>. Note:</p><ul><li>The Zenroom scripts processing the answers work <strong>offline</strong>.</li><li>Your answers are <strong>never communicated to any external service</strong>.</li><li><strong>No one can reconstruct them</strong> based on their output: this is certain based on the math behind it, if you&#39;re curious you can read about it <a href="https://github.com/ForkbombEu/client_zencode?tab=readme-ov-file#login-creation" target="_blank" rel="noreferrer">here</a>.</li><li>The answers are not used to identify you in anyway, they are just some text that <strong>only you can write</strong> and belong to your past, so it <strong>should not change over time</strong>.</li></ul><h3 id="more-about-privacy" tabindex="-1">More about privacy <a class="header-anchor" href="#more-about-privacy" aria-label="Permalink to &quot;More about privacy&quot;">​</a></h3><p>We hear you saying:</p><div class="important custom-block github-alert"><p class="custom-block-title">I don&#39;t want to answer any question I don&#39;t trust writing my personal data anywhere... what now?</p><p></p></div><p>So you don&#39;t want to write private data anywhere, cause you don&#39;t trust software security ever? We (the developers) understand you well and share your feelings 😃</p><div class="tip custom-block"><p class="custom-block-title">TLDR: answer using random text and save the seed!</p></div><p>If that&#39;s the case, no problem at all: you can just <strong>answer</strong> to the challenges <strong>with some random/junk text</strong>. After your secret keys are created, you are offered to store the <em>seed</em>: the seed is a piece of data, printed as a <em>mnemonic phrase</em> that will allow you to re-generate the same secret keys at any time.</p><p>What does a mmnemonic phrase look like? Like this:</p><div class="language-mnemonic vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mnemonic</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>expect cart barely fruit learn tortoise work essence guitar</span></span></code></pre></div><p>If you log out from the wallet, or try to login onto a new device (or browser), you are given the option to <strong>paste your seed</strong>: therefore <strong>store your seed in a safe place</strong>, it will work forever, no matter what you answered in that challenges.</p>',15),n=[s];function i(l,c,p,h,u,d){return o(),t("div",null,n)}const g=e(a,[["render",i]]);export{y as __pageData,g as default};
