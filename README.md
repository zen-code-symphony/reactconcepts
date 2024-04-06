# React concepts

Below is a basic ReactJS dev setup using:

- [Vite](https://vitejs.dev/) as the build tool and local dev server. It enables rapid development by leveraging native ES module imports, offers HMR for instantaneous updates, and provides optimized bundling for production deployment.
- [ESLint](https://eslint.org/) for static code analysis. It identifies and fix code errors, maintain code consistency, and enforce coding standards.
- [Prettier](https://prettier.io/) for code formatting. It automatically formats code in a consistent style (opinionated), simplifying the process of maintaining a cohesive codebase across dev teams.
- [VSCode](https://code.visualstudio.com/) as the code editor. It includes extensions for ESLint, Prettier etc.
- [npm](https://www.npmjs.com/) as the JavaScript package manager.

```mermaid
---
title: ReactJS dev setup (uses Node.js v21+, npm v10+)
---
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart TB
    subgraph Vite
        direction TB
        viteserver[vite: port 5173] --> viteconfig[vite.config.js]
        vitepreview[vite preview: port 4173] --> viteconfig
        viteconfig --> viteplugineslint[vite-plugin-eslint]
        viteconfig --> vitejspluginreact[vitejs/plugin-react]
        vitebuild[vite build]
    end
    subgraph dist
        direction TB
        index.html1[index.html, assets/xxxx.js,css,svg]
    end
    subgraph code-repository
        direction TB
        index.html2[index.html, src/..., public/...]
        packagejson[package.json]
        prettierconfig[.prettierrc.json]
        eslintconfig[.eslintrc.cjs]
    end
    prettier --uses--> prettierconfig
    eslint --uses--> eslintconfig
    subgraph VS Code
        direction LR
        vscode-eslint[ext: dbaeumer.vscode-eslint]
        vscode-prettier[ext: esbenp.prettier-vscode]
    end
    subgraph Node Package Manager
        npm --> packagejson
        npm --> node_modules
    end

    viteplugineslint --> eslint
    eslint --lints--> index.html2
    prettier --formats--> index.html2
    VSCode --code editing--> code-repository
    vscode-eslint --lints using--> eslint
    vscode-prettier --formats using--> prettier

    vitebuild --generates--> dist
    vitepreview --serves--> dist
    viteserver --serves --> index.html2
    Browser --dev mode--> viteserver
    Browser --prod mode--> vitepreview
```
