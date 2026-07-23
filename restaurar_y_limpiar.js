import fs from 'fs';
import path from 'path';

function analizarLog() {
  const logPath = 'C:\\Users\\Jose\\.gemini\\antigravity-cli\\brain\\e84590ec-5360-44cf-9120-f3a2ce06b636\\.system_generated\\logs\\transcript_full.jsonl';
  
  if (!fs.existsSync(logPath)) {
    console.error('No se encuentra el historial de logs en la ruta:', logPath);
    return;
  }

  const fileContent = fs.readFileSync(logPath, 'utf-8');
  const lines = fileContent.split('\n');
  
  console.log(`Analizando ${lines.length} líneas de log...`);

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      const obj = JSON.parse(line);
      
      // Buscar cualquier objeto del log que tenga en su content o en sus tool_responses el contenido de productos.csv
      if (obj.content && obj.content.includes('productos.csv')) {
        console.log(`\n--- ENCONTRADO STEP ${obj.step_index} (${obj.source || 'Desconocido'}) ---`);
        console.log(`Longitud del contenido: ${obj.content.length} caracteres`);
        console.log(`Primeros 200 caracteres:`, obj.content.substring(0, 200));
        
        // Imprimir cuántas líneas numeradas hay en el content
        const matches = obj.content.split('\n').filter(l => l.match(/^\d+:/));
        console.log(`Líneas numeradas encontradas: ${matches.length}`);
        
        if (matches.length > 5) {
          console.log("Muestra de líneas numeradas (primeras 3):");
          console.log(matches.slice(0, 3).join('\n'));
        }
      }
    } catch (e) {
      // Ignorar errores de parseo
    }
  }
}

analizarLog();
