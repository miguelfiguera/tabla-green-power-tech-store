# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Aplicacion de precios para green power tech.

¡Claro! Aquí tienes una documentación detallada, orientada a usuarios no programadores, que explica específicamente qué hace esta aplicación:

---

# Guía para Entender la Aplicación de Cálculo de Ganancias Solares

## Introducción

Esta aplicación está diseñada para ayudar a **consultores y profesionales** en el campo de las **energías renovables** a calcular las ganancias y beneficios asociados con la venta e instalación de **sistemas solares** y **baterías**. Es una herramienta que facilita la elaboración de presupuestos, verifica la viabilidad de los proyectos y asegura que las políticas de precio y ganancias se apliquen correctamente.

## Objetivo de la Aplicación

- **Calcular ganancias** para diferentes partes involucradas en el proyecto: la empresa, el consultor y el director de ventas.
- **Validar valores ingresados** para asegurar que cumplen con los estándares y políticas establecidas.
- **Generar informes detallados** que pueden ser compartidos con clientes o usados para fines internos.

## Funcionalidades Principales

### 1. Ingreso de Datos del Cliente y del Proyecto

La aplicación permite ingresar información básica del cliente y del proyecto:

- **Nombre del Cliente**: Para identificar al cliente.
- **Correo Electrónico del Cliente**: Para comunicaciones y seguimiento.
- **Dirección del Cliente**: Ubicación física donde se instalará el sistema.
- **ID del Proyecto**: Identificador único para el proyecto.

### 2. Configuración de Parámetros del Sistema Solar

El usuario puede especificar los detalles técnicos y financieros del sistema:

- **Watts por Panel (watts)**: La potencia que genera cada panel solar individual. Valor predeterminado: 405 watts.
- **Número de Paneles (PV)**: Cantidad de paneles que se instalarán. Debe ser suficiente para alcanzar una potencia mínima establecida.
- **Precio por Watt de la Empresa (GreenTechPpw)**: Margen de ganancia por watt que obtiene la empresa tecnológica. Valor predeterminado: $0.40.
- **Precio por Watt del Vendedor (SellerPpw)**: Margen de ganancia por watt que obtiene el consultor o vendedor. Valor predeterminado: $0.50.
- **Tipo de Batería**: Capacidad de la batería que se incluirá en el sistema:
  - **13,500 kWh**: Tesla Powerwall 13.5 kWh.
  - **27,000 kWh**: Dos unidades de Tesla Powerwall 13.5 kWh.
  - **40,500 kWh**: Tres unidades de Tesla Powerwall 13.5 kWh.
- **Ganancia del Director de Ventas (gananciaDV)**: Opción para incluir una ganancia adicional para el director de ventas.

### 3. Cálculos Automáticos

La aplicación realiza varios cálculos clave:

- **Bonificación por Batería (batteryBonus)**: Se otorga un bono adicional según el tipo de batería seleccionada:
  - $1,000 para 13,500 kWh.
  - $2,000 para 27,000 kWh.
  - $3,000 para 40,500 kWh.
- **Ganancia de la Empresa (gananciaGreenPowerTech)**: Calcula la ganancia que obtiene la empresa según el precio por watt establecido y considerando posibles descuentos.
- **Ganancia del Consultor (gananciaConsultor)**: Calcula la ganancia del vendedor basándose en su precio por watt.
- **Ganancia del Director de Ventas (gananciaDirector)**: Si está habilitado, calcula una ganancia adicional para el director.
- **Ganancia Total (gananciaTotal)**: Suma de todas las ganancias anteriores.

### 4. Validaciones y Verificaciones

Antes de realizar los cálculos, la aplicación verifica:

- **Potencia Mínima Requerida**: El sistema debe tener una potencia total (watts x número de paneles) de al menos 3,240 watts.
- **Rangos de Precios por Watt**:
  - **Precio de la Empresa (GreenTechPpw)**:
    - Valor predeterminado: $0.40.
    - No debe ser inferior a $0.20. Si es menor, se restablece al mínimo y se notifica al usuario.
  - **Precio del Vendedor (SellerPpw)**:
    - Valor mínimo: $0.25. Si es menor, se notifica al usuario y se requiere permiso especial.
- **Compatibilidad de Batería y Paneles**:
  - Si se selecciona la batería de 13,500 kWh, no se pueden instalar más de 19 paneles. Si se excede, se ajusta el número de paneles y se notifica al usuario.

### 5. Generación de Informe Resumido

La aplicación puede generar un texto detallado que incluye:

- **Información del Cliente y Proyecto**: Nombre, correo electrónico, dirección y ID del proyecto.
- **Detalles del Sistema**: Watts por panel, número de paneles, tamaño total del sistema, tipo y precio de la batería.
- **Desglose de Precios y Ganancias**: Precio objetivo por watt, redline (costo base), márgenes de la empresa y vendedor, bonificaciones y ganancias de cada parte.
- **Notas Adicionales**: Espacio para incluir observaciones o información extra.

Este informe puede ser copiado al portapapeles para ser compartido fácilmente.

### 6. Notificaciones al Usuario

La aplicación utiliza mensajes emergentes para:

- **Informar Éxitos**: Por ejemplo, cuando los resultados se copian al portapapeles.
- **Alertar Errores o Advertencias**: Por ejemplo, si los valores ingresados están fuera de rango o no cumplen con las políticas.

## Cómo Utilizar la Aplicación

1. **Ingresar Datos del Cliente y Proyecto**:

   - Complete los campos de nombre, correo electrónico, dirección e ID del proyecto.

2. **Configurar el Sistema**:

   - Especifique los watts por panel (si es diferente al predeterminado).
   - Ingrese el número de paneles que se van a instalar.
   - Seleccione el tipo de batería adecuada.
   - Ajuste los precios por watt de la empresa y del vendedor si es necesario, respetando los rangos permitidos.
   - Indique si el director de ventas recibirá una ganancia adicional.

3. **Verificar Valores**:

   - Antes de calcular, asegúrese de que todos los valores ingresados son correctos y están dentro de los rangos permitidos.

4. **Realizar el Cálculo**:

   - Ejecute el cálculo. La aplicación realizará las validaciones y cálculos necesarios.
   - Si hay algún problema, se le notificará con mensajes específicos.

5. **Generar y Copiar el Informe**:
   - Use la opción para copiar el resumen al portapapeles.
   - Puede pegar este texto en un documento, correo electrónico u otra plataforma para compartirlo con quien corresponda.

## Consideraciones Importantes

- **Políticas de Precios y Ganancias**:

  - Los precios por watt están sujetos a políticas internas y deben respetarse.
  - Si necesita ajustar los valores fuera de los rangos estándar, puede requerir permisos especiales.

- **Compatibilidad de Equipos**:

  - Asegúrese de que la combinación de baterías y número de paneles sea compatible.
  - La aplicación le ayudará a ajustar estos valores si detecta inconsistencias.

- **Actualización de Datos**:
  - Si modifica algún valor después de calcular, es recomendable volver a ejecutar el cálculo para actualizar los resultados.

## Beneficios de la Aplicación

- **Precisión**: Reduce errores humanos al automatizar cálculos complejos.
- **Eficiencia**: Ahorra tiempo al generar informes detallados rápidamente.
- **Cumplimiento**: Ayuda a asegurar que todas las cotizaciones cumplen con las políticas de la empresa.
- **Profesionalismo**: Permite ofrecer a los clientes información clara y detallada sobre su propuesta.

## Mensajes de Notificación

La aplicación puede mostrar los siguientes mensajes:

- **Éxito**:

  - "Ok, puedes proceder."
  - "Resultados copiados al portapapeles."

- **Errores y Advertencias**:
  - "Placas Insuficientes": La potencia total es menor a la mínima requerida.
  - "PPW GreenTech fuera de rango, tienes permiso de OXOR?": El precio por watt de la empresa está fuera del rango permitido.
  - "PPW Seller fuera de rango, tienes permiso del vendedor?": El precio por watt del vendedor está fuera del rango permitido.
  - "No puedes vender más de 19 PV con batería de 13k": Se excede el máximo de paneles permitido para la batería seleccionada.
  - "Error al copiar al portapapeles.": Hubo un problema al generar el informe.
