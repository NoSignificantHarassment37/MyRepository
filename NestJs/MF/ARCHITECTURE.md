# Arquitectura Hexagonal (Ports & Adapters)

Este proyecto sigue una arquitectura hexagonal (también conocida como Ports & Adapters) para mantener una separación clara de responsabilidades y facilitar el mantenimiento y testing.

## Estructura de Carpetas

```
src/
├── common/                          # Código compartido entre módulos
│   ├── exceptions/                  # Excepciones personalizadas
│   ├── interfaces/                  # Interfaces comunes
│   └── utils/                       # Utilidades compartidas
│
├── modules/                         # Módulos del dominio
│   └── [module-name]/              # Ejemplo: users, products, orders
│       ├── domain/                 # 🟢 CAPA DE DOMINIO (Core)
│       │   ├── entities/           # Entidades de negocio
│       │   ├── value-objects/      # Objetos de valor
│       │   ├── ports/              # Interfaces (Puertos)
│       │   └── services/           # Servicios de dominio
│       │
│       ├── application/            # 🟡 CAPA DE APLICACIÓN (Use Cases)
│       │   ├── services/           # Casos de uso / Servicios de aplicación
│       │   └── dto/                # DTOs de aplicación
│       │
│       ├── infrastructure/         # 🔴 CAPA DE INFRAESTRUCTURA (Adapters)
│       │   ├── adapters/
│       │   │   ├── repositories/  # Implementación de repositorios
│       │   │   └── external/      # Adaptadores de servicios externos
│       │   └── database/          # Configuración de base de datos (Prisma)
│       │
│       └── presentation/           # 🔵 CAPA DE PRESENTACIÓN (Adapters)
│           ├── controllers/        # Controladores HTTP
│           └── dto/                # DTOs de presentación
│
└── main.ts                          # Bootstrap de NestJS
```

## Capas de la Arquitectura

### 🟢 Domain (Dominio)
- **Responsabilidad**: Contiene la lógica de negocio pura
- **Independencia**: No depende de ninguna otra capa
- **Contiene**:
  - **Entities**: Entidades de negocio con su lógica
  - **Value Objects**: Objetos inmutables que representan conceptos del dominio
  - **Ports**: Interfaces que definen contratos (qué necesita el dominio)
  - **Services**: Servicios de dominio con lógica de negocio compleja

### 🟡 Application (Aplicación)
- **Responsabilidad**: Orquesta los casos de uso
- **Dependencias**: Solo depende del dominio
- **Contiene**:
  - **Services**: Casos de uso que coordinan entre dominio e infraestructura
  - **DTOs**: Objetos de transferencia de datos para la aplicación

### 🔴 Infrastructure (Infraestructura)
- **Responsabilidad**: Implementa los detalles técnicos
- **Dependencias**: Depende del dominio (implementa los puertos)
- **Contiene**:
  - **Adapters/Repositories**: Implementación de los repositorios usando Prisma
  - **Adapters/External**: Integraciones con servicios externos
  - **Database**: Configuración de Prisma

### 🔵 Presentation (Presentación)
- **Responsabilidad**: Adapta las peticiones HTTP a la capa de aplicación
- **Dependencias**: Depende de la aplicación
- **Contiene**:
  - **Controllers**: Controladores HTTP de NestJS
  - **DTOs**: DTOs para request/response HTTP

## Flujo de Datos

```
HTTP Request
    ↓
[Presentation] Controller
    ↓
[Application] Service (Use Case)
    ↓
[Domain] Entity / Service
    ↓
[Infrastructure] Repository Adapter
    ↓
Prisma → Database
```

## Principios

1. **Dependency Inversion**: Las capas externas dependen de las internas, no al revés
2. **Separation of Concerns**: Cada capa tiene una responsabilidad clara
3. **Testability**: Fácil de testear mockeando los adaptadores
4. **Maintainability**: Cambios en una capa no afectan a las otras

## Ejemplo: Módulo Users

- **Domain**: `UserEntity`, `Email` (value object), `IUserRepositoryPort`
- **Application**: `UserApplicationService` (casos de uso)
- **Infrastructure**: `UserRepositoryAdapter` (implementa `IUserRepositoryPort` con Prisma)
- **Presentation**: `UserController` (endpoints HTTP)

## Ventajas

✅ **Testabilidad**: Fácil de testear cada capa de forma independiente
✅ **Mantenibilidad**: Cambios en infraestructura no afectan el dominio
✅ **Escalabilidad**: Fácil agregar nuevos adaptadores (GraphQL, gRPC, etc.)
✅ **Claridad**: Estructura clara y predecible

