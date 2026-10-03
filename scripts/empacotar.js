#!/usr/bin/env node
/*
 * Gera os ZIPs de entrega de cada projeto em ./entregas,
 * SEM node_modules, .expo e dist (como exige o enunciado).
 *
 *   node scripts/empacotar.js                 -> empacota todos
 *   node scripts/empacotar.js trabalho-final  -> empacota só um
 *
 * Usa o "git archive", então só entra no ZIP o que está commitado.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const SAIDA = path.join(RAIZ, 'entregas');
const todos = ['atividade-1', 'trabalho-final'];
const projetos = process.argv.slice(2).length ? process.argv.slice(2) : todos;

fs.mkdirSync(SAIDA, { recursive: true });

const pendentes = execSync('git status --porcelain', { cwd: RAIZ }).toString().trim();
if (pendentes) {
  console.log('[!] Há alterações não commitadas. Elas NÃO vão entrar no ZIP.');
  console.log('    Faça o commit antes se quiser incluí-las.\n');
}

for (const projeto of projetos) {
  if (!todos.includes(projeto)) {
    console.log(`[erro] Projeto desconhecido: ${projeto}`);
    continue;
  }
  const arquivo = path.join(SAIDA, `${projeto}.zip`);
  execSync(`git archive --format=zip --prefix=${projeto}/ -o "${arquivo}" HEAD:${projeto}`, { cwd: RAIZ });
  console.log(`[ok] ${path.relative(RAIZ, arquivo)}`);
}
