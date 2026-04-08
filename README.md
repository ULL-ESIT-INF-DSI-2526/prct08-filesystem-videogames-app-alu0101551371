<p align="center">
  <a href="https://classroom.github.com/a/2R7sv_b0">
    <img src="https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg" />
  </a>
  <a href="https://classroom.github.com/open-in-codespaces?assignment_repo_id=23305409">
    <img src="https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg" />
  </a>
  <br />
  <a href="https://github.com/ULL-ESIT-INF-DSI-2526/prct08-filesystem-videogames-app-alu0101551371/actions/workflows/coveralls.yml">
    <img src="https://github.com/ULL-ESIT-INF-DSI-2526/prct08-filesystem-videogames-app-alu0101551371/actions/workflows/coveralls.yml/badge.svg" alt="Coveralls" />
  </a>
  <a href="https://coveralls.io/github/ULL-ESIT-INF-DSI-2526/prct08-filesystem-videogames-app-alu0101551371?branch=main">
    <img src="https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2526/prct08-filesystem-videogames-app-alu0101551371/badge.svg?branch=main" alt="Coverage Status" />
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2526/prct08-filesystem-videogames-app-alu0101551371/actions/workflows/ci.yml">
    <img src="https://github.com/ULL-ESIT-INF-DSI-2526/prct08-filesystem-videogames-app-alu0101551371/actions/workflows/ci.yml/badge.svg" alt="CI Tests" />
  </a>
</p>

---

## Estructura del Proyecto

```
src/
├── command/          # Configuración del CLI con yargs
│   └── command.ts
├── interface/        # Tipos e interfaces de datos
│   └── videogame.ts
├── manager/          # Lógica de negocio de gestión de videojuegos
│   └── videogameManager.ts
└── videogames-app.ts # Punto de entrada

test/
├── command.test.ts        # Tests del CLI
├── videogame.test.ts      # Tests del gestor
└── videogames-app.test.ts # Tests del entrypoint

data/                 # Almacenamiento de colecciones (creado en tiempo de ejecución)
└── {usuario}/
    └── {id}.json
```

## Compilación y Ejecución

### Compilar el proyecto
```bash
npm run dev
```

### Ejecutar tests
```bash
npm test
```

### Cobertura de tests
```bash
npm run coverage
```

### Generar documentación
```bash
npm run doc
```

---

## Guía de Comandos

### Agregar un videojuego

```bash
$ node dist/videogames-app.js add --user "edusegre" --id 1 --name "The Legend of Zelda: Breath of the Wild" --desc "An open-world adventure game" --platform "Nintendo Switch" --genre "Adventure" --developer "Nintendo" --year 2017 --multiplayer false --hours 50 --value 45
New videogame added to edusegre collection!
```

Intentar agregar un duplicado:
```bash
$ node dist/videogames-app.js add --user "edusegre" --id 1 --name "The Legend of Zelda: Breath of the Wild" --desc "An open-world adventure game" --platform "Nintendo Switch" --genre "Adventure" --developer "Nintendo" --year 2017 --multiplayer false --hours 50 --value 45
Videogame already exists at edusegre collection!
```

### Listar videojuegos

```bash
$ node dist/videogames-app.js list --user "edusegre"
edusegre videogame collection
--------------------------------
ID: 1
Name: The Legend of Zelda: Breath of the Wild
Description: An open-world adventure game
Platform: Nintendo Switch
Genre: Adventure
Developer: Nintendo
Year: 2017
Multiplayer: false
Estimated hours: 50
Market value: 45
--------------------------------
ID: 2
...
```

### Actualizar un videojuego

```bash
$ node dist/videogames-app.js update --user "edusegre" --id 1 --name "The Legend of Zelda: Breath of the Wild" --desc "An acclaimed open-world adventure game" --platform "Nintendo Switch" --genre "Adventure" --developer "Nintendo" --year 2017 --multiplayer false --hours 60 --value 50
Videogame updated at edusegre collection!
```

Intentar actualizar un videojuego inexistente:
```bash
$ node dist/videogames-app.js update --user "edusegre" --id 3 --name "The Legend of Zelda: Breath of the Wild" --desc "An acclaimed open-world adventure game" --platform "Nintendo Switch" --genre "Adventure" --developer "Nintendo" --year 2017 --multiplayer false --hours 60 --value 50
Videogame not found at edusegre collection!
```

### Leer un videojuego

```bash
$ node dist/videogames-app.js read --user "edusegre" --id 1
ID: 1
Name: The Legend of Zelda: Breath of the Wild
Description: An acclaimed open-world adventure game
Platform: Nintendo Switch
Genre: Adventure
Developer: Nintendo
Year: 2017
Multiplayer: false
Estimated hours: 60
Market value: 50
```

Intentar leer un videojuego inexistente:
```bash
$ node dist/videogames-app.js read --user "edusegre" --id 3
Videogame not found at edusegre collection!
```

### Eliminar un videojuego

```bash
$ node dist/videogames-app.js remove --user "edusegre" --id 1
Videogame removed from edusegre collection!
```

Intentar eliminar un videojuego inexistente:
```bash
$ node dist/videogames-app.js remove --user "edusegre" --id 3
Videogame not found at edusegre collection!
```

---

## Enlaces útiles

- [Coveralls]()
- [Práctica 8 - Aplicación para gamers](https://ull-esit-inf-dsi-2526.github.io/prct08-filesystem-videogames-app/)
- [Principios SOLID](https://ull-esit-inf-dsi-2526.github.io/typescript-theory/typescript-solid.html)
- [Guía de Vitest](https://vitest.dev/)
- [TypeDoc - Generador de documentación](https://typedoc.org/)
- [ESLint - Linter para JavaScript/TypeScript](https://eslint.org/)
- [Prettier - Code Formatter](https://prettier.io/)
- [Yargs](https://www.npmjs.com/package/yargs)
- [Chalk](https://www.npmjs.com/package/chalk)