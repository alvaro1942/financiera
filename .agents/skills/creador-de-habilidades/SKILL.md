---
name: creador-de-habilidades
description: Crea nuevas habilidades (skills) para el agente Antigravity en idioma español, siguiendo las mejores prácticas y estructura requerida.
---

# Creador de Habilidades

## Cuándo usar esta habilidad (When to use this skill)
Usa esta habilidad cuando el usuario te pida explícitamente crear una nueva "habilidad" (skill) para el agente, o cuando notes que una serie de instrucciones complejas o flujos de trabajo se repiten y sugieras empaquetarlos en una habilidad. Todas las habilidades generadas con esta herramienta deben ser redactadas en idioma español.

## Cómo usarla (How to use it)

Cuando vayas a crear una nueva habilidad, DEBES seguir estrictamente esta estructura y conjunto de reglas:

### 1. Ubicación y Nomenclatura
*   **Directorio principal:** Crea la carpeta de la habilidad dentro del directorio `.agents/skills/` en la raíz del proyecto.
*   **Nombre de la carpeta:** Usa solo letras minúsculas, números y guiones (`-`). Ejemplo: `.agents/skills/generador-de-pruebas/`.
*   **Archivo obligatorio:** El archivo principal de la habilidad SIEMPRE debe llamarse interactuando `SKILL.md` y estar dentro de la carpeta creada. Ejemplo: `.agents/skills/generador-de-pruebas/SKILL.md`.

### 2. Estructura Obligatoria del Archivo `SKILL.md`
El archivo debe empezar imperativamente con un **YAML Frontmatter** que contenga los metadatos de la habilidad, seguido por el contenido formatiado en **Markdown**.

#### Plantilla YAML Frontmatter:
```yaml
---
name: <nombre-de-la-habilidad-con-guiones>
description: <Descripción clara, concisa y en tercera persona de qué hace la habilidad y exactamente CUÁNDO debe ser utilizada por el agente. El agente lee esto para decidir si activa la habilidad o no.>
---
```

#### Estructura Markdown:
Después de los guiones de cierre del frontmatter (`---`), redacta el cuerpo siguiendo esta estructura mínima:

```markdown
# <Nombre Legible de la Habilidad>

## Cuándo usar esta habilidad (When to use this skill)
[Describe detalladamente los triggers o situaciones específicas en las que el agente debe leer y aplicar las reglas de este archivo.]

## Cómo usarla (How to use it)
[Aquí va el "core" de la habilidad. Escribe instrucciones imperativas, claras y paso a paso para el propio agente. Explícale cómo pensar, qué herramientas utilizar, qué archivos consultar y en qué orden.]
[Puedes incluir ejemplos, reglas de validación y patrones obligatorios (ej. "Siempre usa Tailwind para los estilos").]

## Reglas y Convenciones Relacionadas (Opcional)
[Cualquier regla adicional, manejo de errores a considerar o directrices de codificación (Linting, tipado estricto, etc.) aplicables al contexto de esta habilidad.]
```

### 3. Mejores Prácticas al Escribir la Nueva Habilidad
*   **Idioma Español:** Asegúrate de que TODA la instrucción dirigida al agente (en el markdown) esté en español, tal como se solicitó.
*   **Enfoque Único (Single Responsibility):** Cada habilidad debe enfocarse en resolver un problema específico (ej. "Refactorización de Componentes React" en lugar de "Desarrollo Frontend General").
*   **Claridad del Frontmatter:** El campo `description` del YAML es crítico. Debe ser muy descriptivo e incluir palabras clave relacionadas con la tarea.
*   **Árboles de Decisión:** Si la habilidad cubre varios casos de uso, estructura el markdown con listas o diagramas condicionales (ej. "Si el usuario pide X, haz A. Si pide Y, haz B.").
*   **Directorios Adicionales (Avanzado):** Si la habilidad es compleja, puedes indicarle en el `SKILL.md` que consulte scripts o ejemplos dentro de la misma carpeta de la habilidad (ej. `.agents/skills/mi-habilidad/scripts/` o `.agents/skills/mi-habilidad/examples/`).

### 4. Proceso de Creación
Utiliza la herramienta `write_to_file` para generar el directorio y el archivo de forma automática (indicando la ruta absoluta del archivo objetivo). Asegúrate de validar que el frontmatter esté bien formateado antes de guardar.
