import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import umlPlugin from "markdown-it-plantuml";

const vitepressSidebarOptions = {
  documentRootPath: "/docs",
  useTitleFromFrontmatter: true,
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: 999,
  includeFolderIndexFile: false,
  useFolderTitleFromIndexFile: true,
  manualSortFileNameByPriority: [
    "intro.md",
    "core-technologies.md",
    "solution.md",
    "get_started.md",
    "guides",
  ],
  includeDotFiles: false,
};

export default defineConfig({
  base: "/",
  title: "EUDI Wallet",
  description: "Empower your Identity strategy: customize, plug, deploy",
  lang: "en-US",

  lastUpdated: true,
  metaChunk: true,

  head: [
    [
      "script",
      {},
      `window.$crisp=[];window.CRISP_WEBSITE_ID="8dd97823-ddac-401e-991a-7498234e4f00";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "./public/favicon/favicon.ico",
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Guide",
        items: [
          { text: "Wallet App", link: "/guides/Wallet/wallet" },
		  { text: "Web Verifier", link: "/guides/Verifier/web-verifier" },
          { text: "Credential issuance", link: "guides/Flows/basics" },
          { text: "Microservices", link: "guides/Orgadmin/microservices" },
          { text: "Sysadmins", link: "/guides/Sysadmin/sysadmin" },
        ],
      },
      { text: "Get started", link: "/get_started" },
      { text: "Pricing", link: "/guides/Pricing/pricing" },
    ],
    logo: "https://raw.githubusercontent.com/ForkbombEu/DIDroom/45a5ffb737d81c33449bf2d394627a88ddbfc1d0/images/DIDroom_logo.svg",
    sidebar: generateSidebar(vitepressSidebarOptions),
    socialLinks: [
      { icon: "github", link: "https://github.com/topics/didroom" },
      { icon: "linkedin", link: "https://linkedin.com/company/forkbomb" },
    ],

    footer: {
      message:
        'Released under the <a href="https://raw.githubusercontent.com/ForkbombEu/signroom/refs/heads/main/LICENSES/AGPL-3.0-or-later.txt">AGPLv3 License</a>.',
      copyright:
        'Copyleft 🄯 2023-present <a href="https://forkbomb.solutions">Forkbomb B.V.</a>',
    },
    search: {
      provider: "local",
    },
  },
  markdown: {
    config(md) {
      md.use(umlPlugin);
    },
  },
});
