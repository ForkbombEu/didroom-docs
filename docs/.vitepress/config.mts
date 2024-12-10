import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import umlPlugin from "markdown-it-plantuml";

const vitepressSidebarOptions = {
  documentRootPath: "/docs",
  useTitleFromFrontmatter: true,
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: 999,
  includeFolderIndexFile: false,
  useFolderLinkFromIndexFile: false,
  manualSortFileNameByPriority: [
    "intro.md",
    "core-technologies.md",
    "solution.md",
    "get_started.md",
    "guides",
    "sysadmin",
    "setup.md",
    "setup_dashboard.md",
    "deploy_microservices.md",
    "orgadmin",
  ],
  includeDotFiles: false,
};

export default defineConfig({
  base: "/",
  title: " ",
  description: "Empower your Identity strategy: customize, plug, deploy",

  lastUpdated: true,
  metaChunk: true,

  head: [
    [
      "script",
      {},
      `window.$crisp=[];window.CRISP_WEBSITE_ID="8dd97823-ddac-401e-991a-7498234e4f00";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Guide",
        items: [
          { text: "Organization admins", link: "/guides/Orgadmin/" },
          { text: "Wallet App", link: "/guides/Wallet/" },
          { text: "Verifier App", link: "/guides/Verifier/" },
          { text: "System admins", link: "/guides/Sysadmin/" },
          { text: "Signatures", link: "/guides/Signature/" },
        ],
      },
      { text: "Get started", link: "/get_started" },
      { text: "Pricing", link: "/guides/Pricing/" },
    ],
    logo: "https://raw.githubusercontent.com/ForkbombEu/DIDroom/45a5ffb737d81c33449bf2d394627a88ddbfc1d0/images/DIDroom_logo.svg",
    sidebar: generateSidebar(vitepressSidebarOptions),
    socialLinks: [
      { icon: "github", link: "https://github.com/forkbombeu/didroom" },
      { icon: "linkedin", link: "https://linkedin.com/company/forkbomb" },
    ],

    footer: {
      message:
        'Released under the <a href="https://github.com/forkbombeu/didroom/blob/main/LICENSE">AGPLv3 License</a>.',
      copyright:
        'Copyleft 🄯 2023-present <a href="https://forkbomb.solutions">Forkbomb B.V.</a>',
    },
  },
  markdown: {
    config(md) {
      md.use(umlPlugin);
    },
  },
});
