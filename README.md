# React concepts

```mermaid
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart TB
    subgraph vite
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
    subgraph src
        direction TB
        index.html2[index.html, src/..., public/...]
    end
    vitebuild --generates--> dist
    vitepreview --serves--> dist
    viteserver --serves --> src
    Browser --dev mode--> viteserver
    Browser --prod mode--> vitepreview
```
