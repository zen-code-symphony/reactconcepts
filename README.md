# React concepts

NOTE: The example app in this repository is based on [Brian Holt's React course on Frontend Masters](https://frontendmasters.com/courses/intermediate-react-v5/).

## Table of contents

1. [ReactJS dev setup](#reactjs-dev-setup-toc)
2. React fundamentals
   - [Unidirectional data flow](#react-fundamentals-unidirectional-data-flow-toc)
   - [Custom hook](#react-fundamentals-custom-hook-toc)
   - [TanStack / React Query](#react-fundamentals-tanstack--react-query-toc)
   - [Context](#react-fundamentals-context-toc)
   - [Code splitting](#react-fundamentals-code-splitting-toc)

<details open>
  <summary>
  
  ## ReactJS dev setup [[TOC]](#table-of-contents)
  
  </summary>

We will be creating a basic ReactJS dev setup using:

- [Vite](https://vitejs.dev/) as the build tool and local dev server. It enables rapid development by leveraging native ES module imports, offers HMR for instantaneous updates, and provides optimized bundling for production deployment.
- [ESLint](https://eslint.org/) for static code analysis. It identifies and fix code errors, maintain code consistency, and enforce coding standards.
- [Prettier](https://prettier.io/) for code formatting. It automatically formats code in a consistent style (opinionated), simplifying the process of maintaining a cohesive codebase across dev teams.
- [Tailwind CSS](https://tailwindcss.com/) as CSS framework. It is a utility-first CSS framework that streamlines web development by providing a comprehensive set of pre-designed utility classes for styling HTML elements.
- [VS Code](https://code.visualstudio.com/) as the code editor. It includes extensions for ESLint, Prettier etc.
- [npm](https://www.npmjs.com/) as the JavaScript package manager.
- [TypeScript](https://www.typescriptlang.org/) as a strongly typed programming language that builds on JavaScript. Refer [official doc](https://react.dev/learn/typescript) for more information.
- [Vitest](http://vitest.dev) as the testing framework.

Below is a high-level diagram that depicts how all the above pieces fit together:

```mermaid
---
title: ReactJS dev setup (uses Node.js v21+, npm v10+)
---
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart TB
    subgraph Node
      direction TB
      nodeserver[node server.js: port 3100]
    end
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
        indexcss[assets/xxxx.css]
        clientdist[client: index.html,  assets/xxxx.js,css,svg]
        serverdist[server: ServerApp.js, assets/xxxx.js]
    end
    subgraph code-repository
        direction TB
        index.html2[index.html, src/..., public/...]
        packagejson[package.json]
        prettierconfig[.prettierrc.json]
        eslintconfig[.eslintrc.cjs]
        tsconfigjson[tsconfig.json]
        tailwindconfig[tailwind.config.js]
        postcssconfig[postcss.config.js]
        tests[src/__tests__]
    end
    vitest --runs--> tests
    tailwindconfig --> tailwindcss
    postcssconfig --> tailwindcss
    index.html2 --> tailwindcss
    tailwindcss --> indexcss
    prettier --uses--> prettierconfig
    eslint --uses--> eslintconfig
    eslint --uses--> tsconfigjson
    subgraph VSCode[VS Code]
        direction LR
        vscode-eslint[ext: dbaeumer.vscode-eslint]
        vscode-prettier[ext: esbenp.prettier-vscode]
        vscode-tailwind[ext: bradlc.vscode-tailwindcss]
        vscode-ts[ext: ms-vscode.vscode-typescript-next]
        vscodesettings[.vscode/settings.json]
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
    vscodesettings --format on save--> prettier

    vitebuild --generates--> dist
    vitepreview --serves--> dist
    viteserver --serves --> index.html2
    Browser --dev mode--> viteserver
    Browser --prod mode--> vitepreview
    Browser --> nodeserver
    nodeserver --> clientdist
    nodeserver --> serverdist
```

Follow the below steps to create the above setup:

1.  Create React app using Vite's React template. Change `myreactapp` app name to your own custom name.

    ```sh
     npm create vite@latest myreactapp -- --template react
    ```

2.  npm install all dependencies:

    ```sh
    cd myreactapp
    npm i
    ```

3.  Install Vite's ESLint plugin and Prettier.

    ```sh
    npm i -D vite-plugin-eslint prettier
    ```

4.  Configure Prettier:

    - Create Prettier config file i.e. `.prettierrc.json` with an empty config object i.e. `{}`. Install [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Refer [.prettierrc](./.prettierrc.json).

    - Add [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports) prettier plugin to sort and organize imports. Add the following configuration to `.prettierrc.json`. Refer [.prettierrc.json](./.prettierrc.json).

    ```json
    {
      "importOrderSeparation": true,
      "importOrderSortSpecifiers": true,
      "plugins": ["@trivago/prettier-plugin-sort-imports"]
    }
    ```

    - Configure VS Code to format on save using Prettier. Create `.vscode` folder to save workspace
      settings. Create `.vscode/settings.json` file to configure workspace settings. Refer [.vscode/settings.json](./.vscode/settings.json). Following are the relevant lines to configure format on save using prettier:

      ```json
      {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "eslint.run": "onSave",
        "[html]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "editor.formatOnSave": true
        },
        "prettier.requireConfig": true,
        "css.lint.unknownAtRules": "ignore"
      }
      ```

5.  Configure ESLint

    - Update `vite.config.js` to include eslint plugin. Add `import eslint from "vite-plugin-eslint";` and call `eslint()` inside `plugins` array. Refer [vite.config.js](./vite.config.js).

    - Further, install [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

    - Install ESLint plugins for a11y and Prettier.

      ```sh
      npm install -D eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-config-prettier
      ```

    - Refer [.eslintrc.cjs](./.eslintrc.cjs) and update following entries:
      ```js
      module.exports = {
        // Snip
        extends: ["plugin:jsx-a11y/recommended", "plugin:prettier/recommended"],
        plugins: ["react-refresh", "jsx-a11y"],
        // Snip
      };
      ```

6.  Configure Tailwind CSS

    - Install `tailwindcss` along with its peer dependencies, and generate `tailwind.config.js` and `postcss.config.js` files.

      ```sh
      npm install -D tailwindcss postcss autoprefixer
      npx tailwindcss init -p
      ```

    - Update `content` settings in `tailwind.config.js` file. Refer [tailwind.config.js](./tailwind.config.js).

      ```json
      {
        "content": ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
      }
      ```

    - Add the @tailwind directives for each of Tailwind’s layers inside [./src/index.css](./src/index.css) file.

      ```css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      ```

    - Install [Tailwind CSS Intellisense extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

    - Add [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) prettier plugin to automatically sorts classes based on [recommended class order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted). Update `plugins` property in [.prettierrc.json](./.prettierrc.json).

      ```json
      {
        "plugins": ["prettier-plugin-tailwindcss"]
      }
      ```

7.  Add the following `format` command inside `"scripts"` config property of the `package.json` file in order to format files using prettier using CLI. Refer [package.json](./package.json) file.

    ```json
    {
      "scripts": {
        "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\""
      }
    }
    ```

8.  Install and configure TypeScript for React and ESLint. Refer [.eslintrc.cjs](./.eslintrc.cjs) for TypeScript settings. Also, refer [package.json](./package.json) file to update TypeScript relates changes in the the `scripts`.

    ```sh
    npm i -D typescript
    npx tsc --init
    npm i -D @types/react @types/react-dom
    npm install -D eslint-import-resolver-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
    ```

9.  Install and configure [Vitest](http://vitest.dev).

    - Install dependencies.

    ```sh
    npm install -D vitest @testing-library/react happy-dom vitest-fetch-mock
    ```

    - Configure [vite.config.js](./vite.config.js) to include test config:

    ```json
    {
      "test": {
        "environment": "happy-dom"
      }
    }
    ```

    - Add `"test": "vitest"` to `scripts` in [package.json](./package.json).

    - Create `__tests__` folder under [src](./src/) directory. All tests can be added inside this directory.

    - We can run the below commands to run or watch tests.

      ```sh
      npm t # Runs Vitest in watch mode.
      npm run test # Runs Vitest in watch mode.

      npm run test -- run # Runs all tests without watch mode.
      ```

10. Run Vite dev server and visite [http://localhost:5173](http://localhost:5173) to access the newly configured app.
    ```sh
    npm run dev
    ```

</details>

<details open>

  <summary>
  
  ## React fundamentals: Unidirectional data flow [[TOC]](#table-of-contents)
  
  </summary>

```mermaid
flowchart LR
  ParentComponent[Parent Component]

  subgraph Component
    direction LR
    State[State - Read/Write data]
    Props[Props - Read-only data]
    UI --setState (event handler, useEffect)--> State
    Props --Update UI on change--> UI
    State --Update UI on change--> UI
  end


  ParentComponent --data--> Props
```

</details>

<details open>

  <summary>
  
  ## React fundamentals: Custom hook [[TOC]](#table-of-contents)
  
  </summary>

[Custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) are used to hide all complexity from the user component and provide a clean interface to get access to the required data. This design pattern makes the code simple & easy to follow, improves code maintainability, and enables reusability.

```mermaid
flowchart LR
  subgraph useCustomHook
    direction LR
    State[State - Read/Write data]
    useEffect[useEffect: side effect e.g. fetch, localStorage etc.]
    useEffect --sets--> State
  end

  subgraph Component
    direction LR
    importhook[import useCustomHook]
    hookstate[state = useCustomHook]
  end

  useCustomHook --imports--> importhook
  State --returned--> hookstate
```

</details>

<details open>

  <summary>
  
  ## React fundamentals: TanStack / React Query [[TOC]](#table-of-contents)
  
  </summary>

[TanStack / React Query](https://tanstack.com/query/latest/docs/framework/react/overview) is a data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze.

```mermaid
flowchart LR
  subgraph react-query
    direction LR
    QueryClientProvider --> QueryClient
    useQuery[useQuery: queryKey, queryFn]
    useQueryClient --uses--> QueryClient
    useMutation[useMutation: mutationFn, onSuccess, onError]
  end
  results[results: error, isLoading, data]
  resultsmutate[results: mutate, isLoading]

  AppComponent --wraps app components inside--> QueryClientProvider
  Component --calls--> useQuery
  useQuery --returns--> results
  results --uses--> Component
  Component --refers--> fetchApiFn
  Component --calls--> useMutation
  useMutation -->returns--> resultsmutate
  resultsmutate --uses--> Component
  Component --uses--> QueryClient
```

</details>

<details open>

  <summary>
  
  ## React fundamentals: Context [[TOC]](#table-of-contents)
  
  </summary>

React [Context](https://react.dev/learn/passing-data-deeply-with-context) allows you to share data (like global state) across different components in a React application without having to pass props down through each level of the component tree. It simplifies state management by providing a way to access and update shared data directly in any component. It fills the same need as Redux. However, Redux offers advance global state management so choose what works best for your use case.

```mermaid
flowchart LR
  subgraph Context
    direction LR
    ContextProvider
    ContextConsumer
  end
  subgraph State
    direction LR
    contextState-->useState
  end

  createContext--returns-->Context
  ContextProvider--holds-->useState
  ContextProvider--wraps-->Component
  Component--calls-->useContext
  contextState--returned-->useContext
  useContext--returns state-->Component
  useContext--uses-->Context
```

</details>

<details open>

  <summary>
  
  ## React fundamentals: Code splitting [[TOC]](#table-of-contents)
  
  </summary>

Vite examines `lazy` imports to split the code into different file chunks. A chunk is loaded automatically at the point of usage. And while the chunk is loading, the `fallback` component (e.g. loading animation, etc.) configured using `Suspense` wrapper component is displayed.

```mermaid
flowchart LR
  Component1[Component: lazy]--uses-->lazy--to import-->Component2[Component: actual]
  AppComponent--uses-->Component1
  Suspense[Suspense: fallback]--wraps-->AppComponent
```

</details>
