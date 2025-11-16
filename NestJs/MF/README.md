# Monolito Modular con Arquitectura Hexagonal

Proyecto NestJS con arquitectura hexagonal (Ports & Adapters) usando Prisma como ORM.

## 🏗️ Estructura del Proyecto

```
src/
├── common/                    # Código compartido
│   ├── exceptions/           # Excepciones personalizadas
│   ├── interfaces/           # Interfaces comunes
│   └── utils/                # Utilidades compartidas
│
├── modules/                  # Módulos del dominio
│   └── [module-name]/
│       ├── domain/           # 🟢 Capa de Dominio (Core)
│       │   ├── entities/     # Entidades de negocio
│       │   ├── value-objects/ # Objetos de valor
│       │   ├── ports/        # Interfaces (Puertos)
│       │   └── services/     # Servicios de dominio
│       │
│       ├── application/      # 🟡 Capa de Aplicación (Use Cases)
│       │   ├── services/     # Casos de uso
│       │   └── dto/          # DTOs de aplicación
│       │
│       ├── infrastructure/   # 🔴 Capa de Infraestructura (Adapters)
│       │   ├── adapters/
│       │   │   ├── repositories/ # Implementación de repositorios
│       │   │   └── external/     # Servicios externos
│       │   └── database/         # Configuración de Prisma
│       │
│       └── presentation/     # 🔵 Capa de Presentación (Adapters)
│           ├── controllers/  # Controladores HTTP
│           └── dto/          # DTOs de presentación
│
├── app.module.ts             # Módulo raíz
└── main.ts                   # Bootstrap de NestJS
```

## 📚 Documentación

Para más detalles sobre la arquitectura, consulta [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Configuración de Prisma

```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev
```

### Ejecutar la aplicación

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000/api`

## 📦 Módulos

### Users Module

Ejemplo completo de implementación de arquitectura hexagonal:

- **Domain**: `UserEntity`, `Email` (value object), `IUserRepositoryPort`
- **Application**: `UserApplicationService` (casos de uso)
- **Infrastructure**: `UserRepositoryAdapter` (implementa el puerto con Prisma)
- **Presentation**: `UserController` (endpoints HTTP)

#### Endpoints

- `POST /api/users` - Crear usuario
- `GET /api/users` - Listar todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 🎯 Principios de la Arquitectura

1. **Dependency Inversion**: Las capas externas dependen de las internas
2. **Separation of Concerns**: Cada capa tiene una responsabilidad clara
3. **Testability**: Fácil de testear mockeando los adaptadores
4. **Maintainability**: Cambios en una capa no afectan a las otras

## 📝 Crear un Nuevo Módulo

Para crear un nuevo módulo siguiendo la arquitectura hexagonal:

1. Crear la estructura de carpetas en `src/modules/[nombre-modulo]/`
2. Definir las entidades y puertos en `domain/`
3. Implementar los casos de uso en `application/`
4. Crear los adaptadores en `infrastructure/`
5. Implementar los controladores en `presentation/`
6. Configurar el módulo en NestJS

## 🛠️ Tecnologías

- **NestJS**: Framework Node.js
- **Prisma**: ORM para TypeScript
- **TypeScript**: Lenguaje de programación
- **Arquitectura Hexagonal**: Patrón de diseño

