import fs from "fs";
import path from "path";

// Tipos para los resultados
export interface SearchMatch {
  file: string;
  lines: number[];
}

export interface SearchReport {
  totalFiles: number;
  filesWithMatches: number;
  totalOccurrences: number;
}

export function searchInDirectory(
  dir: string,
  searchStr: string,
): SearchMatch[] {
  const results: SearchMatch[] = [];

  // Comprobamos que el directorio existe
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return results;
  }

  // Leemos el contenido del directorio
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Llamada recursiva para subdirectorios
      const subResults = searchInDirectory(fullPath, searchStr);
      results.push(...subResults);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      const textExtensions = [".txt", ".ts", ".js", ".json", ".md"];

      if (!textExtensions.includes(ext)) continue;

      // Comprobamos permisos de lectura
      try {
        fs.accessSync(fullPath, fs.constants.R_OK);
      } catch {
        console.error(`No read permission: ${fullPath}`);
        continue;
      }

      const content = fs.readFileSync(fullPath, "utf-8");
      const lines = content.split("\n");
      const matchingLines: number[] = [];

      lines.forEach((line, index) => {
        if (line.includes(searchStr)) {
          matchingLines.push(index + 1);
        }
      });

      if (matchingLines.length > 0) {
        results.push({
          file: path.basename(fullPath),
          lines: matchingLines,
        });
      }

      if (!content.includes(searchStr)) {
        console.log(`String "${searchStr}" not found in ${fullPath}`);
      }
    }
  }
  return results;
}

export function replaceInFile(
  filePath: string,
  searchStr: string,
  replaceStr: string,
): void {
  // Comprobamos que el fichero existe
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  // Comprobamos permisos de lectura y escritura
  try {
    fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
  } catch {
    console.error(`No read/write permission: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");

  // Comprobamos que la cadena existe en el fichero
  if (!content.includes(searchStr)) {
    console.log(`String "${searchStr}" not found in ${filePath}`);
    return;
  }

  // Creamos copia .bak antes de modificar
  const backupPath = "./backup/" + path.basename(filePath) + ".bak";
  fs.writeFileSync(backupPath, content);
  console.log(`Backup created: ${backupPath}`);

  // Reemplazamos todas las ocurrencias
  const newContent = content.split(searchStr).join(replaceStr);
  fs.writeFileSync(filePath, newContent);
  console.log(`Replaced all occurrences in: ${filePath}`);
}

export function generateReport(
  dir: string,
  searchStr: string,
  outputPath: string,
): void {
  const matches = searchInDirectory(dir, searchStr);

  let totalFiles = 0;
  const filesWithMatches = matches.length;
  let totalOccurrences = 0;

  // Contamos el total de ficheros analizados
  function countFiles(d: string): void {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        countFiles(path.join(d, entry.name));
      } else if (entry.isFile()) {
        totalFiles++;
      }
    }
  }
  countFiles(dir);

  // Contamos ocurrencias totales
  matches.forEach((match) => {
    totalOccurrences += match.lines.length;
  });

  const report: SearchReport = {
    totalFiles,
    filesWithMatches,
    totalOccurrences,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`Report saved to: ${outputPath}`);
  console.log(JSON.stringify(report, null, 2));
}
