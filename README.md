# Applesex E-Commerce - MVP y Roadmap de Stock

Este repositorio contiene el código de la tienda online **Applesex**, un e-commerce moderno y premium enfocado en el bienestar íntimo y lencería. El proyecto está construido sobre el framework **Astro** y utiliza una base de datos local **SQLite** con **Drizzle ORM** para el prototipado inicial y la gestión de datos locales, con conectividad híbrida preparada para **Sanity CMS** en la nube.

---

## 🚀 Estado Actual: Lanzamiento del MVP

El objetivo actual es el lanzamiento de un **Producto Mínimo Viable (MVP)** centrado en:
- **Diseño Premium y Estética Visual**: Una interfaz fluida, rápida y atractiva que potencie la imagen de marca y la conversión.
- **Flujo de Compra Completo**: Carrito de compras funcional y checkout integrado con **Stripe** para la pasarela de pagos.
- **Operatividad Simplificada**: Carga inteligente e híbrida de catálogo de productos (localmente a través del archivo CSV importado o conectándose a la nube de **Sanity CMS**).

### ⚠️ Exclusión Temporal del Control de Stock
Durante esta fase inicial de MVP, **el control y conteo de stock está desactivado**:
- No se llevará un registro ni control de las existencias físicas para las compras web.
- Todos los productos se considerarán disponibles y se mostrará el mensaje indicativo *"En Stock • Listo para Recogida o Envío"* en la página de producto para facilitar un flujo de compra continuo y sin fricciones.
- Esta decisión estratégica permite salir al mercado de manera ágil sin las complicaciones técnicas y operativas inmediatas de la gestión de inventario en tiempo real.

---

## 🔮 Roadmap: Integración Futura del Stock Automático

Una vez consolidado el MVP, se implementará un sistema de gestión y sincronización de stock completamente automatizado e invisible en el día a día.

### 📐 Arquitectura del Sistema de Stock Propuesto

El flujo de sincronización de stock unificará la tienda física (gestionada con **TPVSol**) y la tienda online utilizando **Sanity CMS** como la fuente única de verdad en la nube.

```mermaid
flowchart TD
    subgraph Tienda Física
        A[Venta en TPVSol] -->|Modifica DB local| B[Base de Datos Local .mdb]
        C[Script Puente en PC Windows] -->|Detecta cambios periódicamente| B
        C -->|API Mutation con Write Token| D((Sanity CMS Cloud))
    end

    subgraph Tienda Online (Web)
        E[Venta Web / Stripe] -->|Webhook / API de Pago Exitoso| D
    end
```

### 🛠️ Detalles de Implementación de la Sincronización

#### 1. Ventas Online (Desde la Web)
Cuando se confirme un pago online exitoso a través de Stripe, un webhook en el servidor de la web (Astro) ejecutará automáticamente una mutación en la API de Sanity utilizando un **Write Token** seguro, restando las unidades compradas:
```javascript
sanityClient
  .patch(productId)
  .dec({ stock: cantidadVendida })
  .commit()
```

#### 2. Ventas Físicas (Desde la Tienda con TPVSol)
Para evitar tareas manuales en la tienda física, se programará un **Script Puente Local (Windows)** que:
- Leerá el archivo de base de datos local de TPVSol (`.mdb` / MS Access) de forma periódica (ej. cada 5 minutos).
- Identificará los nuevos tickets generados para saber qué artículos se han vendido en el mostrador.
- Enviará una petición de mutación a Sanity para descontar las unidades correspondientes del catálogo online.

#### 3. 🛡️ Robustez frente a Cambios Administrativos (Sincronización por Deltas)
Para evitar descuadres cuando se realicen anulaciones de tickets o correcciones de caja en la tienda:
- El script puente **no realizará una sincronización absoluta** (no sobrescribirá el stock de la web con el stock final de TPVSol).
- El script funcionará mediante **Deltas por Eventos de Venta**, rastreando únicamente los nuevos IDs de tickets.
- Si se elimina un ticket antiguo en TPVSol/FactuSOL por motivos de contabilidad o corrección, el script ignorará esta acción y el stock en la web no se verá alterado ni descuadrado.

#### 4. 🔗 Conexión de Catálogos
Para que el script pueda emparejar automáticamente los productos físicos con la base de datos de la web, se utilizará el campo del **Código de Barras (EAN)** o el **SKU** como identificador común en ambos sistemas.

#### 5. 📥 Entradas de Mercancía
La reposición de existencias se podrá hacer mediante:
- **Panel de Sanity**: Edición manual de cantidades cuando llegue nueva mercancía.
- **Sincronización de Albaranes**: Extensión del script puente para capturar las entradas de compra registradas en FactuSOL e incrementar el stock en Sanity.
