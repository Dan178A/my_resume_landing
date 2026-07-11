# Graph Report - .  (2026-07-11)

## Corpus Check
- Corpus is ~4,892 words - fits in a single context window. You may not need a graph.

## Summary
- 109 nodes · 103 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Dependencias de Desarrollo
- Manifiesto del Paquete
- TSConfig App
- TSConfig Vitest
- Componentes Vue (Portfolio)
- Identidad y Contenido
- Dependencias Runtime
- TSConfig Raiz
- Store Pinia
- Config Vercel

## God Nodes (most connected - your core abstractions)
1. `scripts` - 7 edges
2. `Portfolio Landing` - 7 edges
3. `include` - 4 edges
4. `compilerOptions` - 4 edges
5. `compilerOptions` - 4 edges
6. `include` - 3 edges
7. `types` - 3 edges
8. `@vercel/analytics` - 2 edges
9. `pinia` - 2 edges
10. `vue` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio Landing` --presenta a--> `Daniel Silva`  [EXTRACTED]
  index.html → src/components/Portfolio.vue
- `Portfolio Landing` --muestra--> `avatar.jpg / 1699966173589.jpg`  [EXTRACTED]
  index.html → public/1699966173589.jpg
- `Portfolio Landing` --ofrece--> `Canales de contacto`  [EXTRACTED]
  index.html → src/components/Portfolio.vue
- `Portfolio Landing` --usa estilo--> `Diseño glassmorphism midnight/ivory`  [EXTRACTED]
  index.html → src/components/Portfolio.vue
- `Portfolio Landing` --consume--> `GitHub REST API`  [EXTRACTED]
  index.html → src/components/Portfolio.vue

## Import Cycles
- None detected.

## Communities (12 total, 3 thin omitted)

### Community 0 - "Dependencias de Desarrollo"
Cohesion: 0.07
Nodes (27): jsdom, npm-run-all2, devDependencies, jsdom, npm-run-all2, @tsconfig/node24, @types/jsdom, @types/node (+19 more)

### Community 1 - "Manifiesto del Paquete"
Cohesion: 0.14
Nodes (13): engines, node, name, private, scripts, build, build-only, dev (+5 more)

### Community 2 - "TSConfig App"
Cohesion: 0.15
Nodes (13): src/**/*, src/**/*.vue, @vue/tsconfig/tsconfig.dom.json, compilerOptions, noUncheckedIndexedAccess, paths, tsBuildInfoFile, exclude (+5 more)

### Community 3 - "TSConfig Vitest"
Cohesion: 0.15
Nodes (12): jsdom, node, ./tsconfig.app.json, compilerOptions, lib, tsBuildInfoFile, types, exclude (+4 more)

### Community 4 - "Componentes Vue (Portfolio)"
Cohesion: 0.18
Nodes (8): error, fetchRepositories(), GitHubRepo, loading, repos, selectedRepos, app, router

### Community 5 - "Identidad y Contenido"
Cohesion: 0.25
Nodes (9): avatar.jpg / 1699966173589.jpg, Canales de contacto, Daniel Silva, Diseño glassmorphism midnight/ivory, Font Awesome 6.7.2 CDN, GitHub REST API, Portfolio Landing, Proyectos Destacados (+1 more)

### Community 6 - "Dependencias Runtime"
Cohesion: 0.22
Nodes (9): dependencies, pinia, @vercel/analytics, vue, vue-router, pinia, @vercel/analytics, vue (+1 more)

## Knowledge Gaps
- **58 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dependencias de Desarrollo` to `Manifiesto del Paquete`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Dependencias Runtime` to `Manifiesto del Paquete`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dependencias de Desarrollo` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Manifiesto del Paquete` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._