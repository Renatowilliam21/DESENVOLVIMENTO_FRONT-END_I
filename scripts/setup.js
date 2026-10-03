#!/usr/bin/env node
/*
 * Prepara o ambiente para rodar os projetos do repositório.
 *
 *   node scripts/setup.js             -> verifica o ambiente e instala as dependências
 *   node scripts/setup.js --verificar -> só verifica, sem instalar nada
 *
 * Funciona em Windows, Linux e macOS (usa apenas módulos nativos do Node).
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const PROJETOS = ['atividade-1', 'trabalho-final'];
const NODE_MINIMO = [20, 19, 4]; // exigência do Expo SDK 54
const somenteVerificar = process.argv.includes('--verificar');

const ok = (msg) => console.log(`  [ok]   ${msg}`);
const aviso = (msg) => console.log(`  [!]    ${msg}`);
const erro = (msg) => console.log(`  [erro] ${msg}`);

function versaoDe(comando) {
  try {
    return execSync(comando, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return null;
  }
}

function versaoMaiorOuIgual(atual, minima) {
  for (let i = 0; i < minima.length; i++) {
    if ((atual[i] || 0) > minima[i]) return true;
    if ((atual[i] || 0) < minima[i]) return false;
  }
  return true;
}

console.log('\n== Verificando o ambiente ==\n');
let problemas = 0;

// Node.js
const node = process.versions.node.split('.').map(Number);
if (versaoMaiorOuIgual(node, NODE_MINIMO)) {
  ok(`Node.js ${process.versions.node}`);
} else {
  erro(`Node.js ${process.versions.node} é antigo. Instale a versão 22 LTS: https://nodejs.org`);
  problemas++;
}

// npm
const npm = versaoDe('npm -v');
npm ? ok(`npm ${npm}`) : (erro('npm não encontrado (vem junto com o Node.js).'), problemas++);

// Git
const git = versaoDe('git --version');
if (git) {
  ok(git);
  const nome = versaoDe('git config user.name');
  const email = versaoDe('git config user.email');
  if (!nome || !email) {
    aviso('Git sem identidade configurada. Rode:');
    console.log('           git config --global user.name "Seu Nome"');
    console.log('           git config --global user.email "seu-email@exemplo.com"');
  }
} else {
  erro('Git não encontrado. Instale em https://git-scm.com/downloads');
  problemas++;
}

// GitHub CLI (opcional)
const gh = versaoDe('gh --version');
gh ? ok(`GitHub CLI ${gh.split('\n')[0].split(' ')[2]}`) : aviso('GitHub CLI (gh) não instalado. É opcional: https://cli.github.com');

console.log('\n  Lembrete: para testar no celular, instale o app "Expo Go" (Android/iOS).');

if (problemas > 0) {
  console.log(`\n${problemas} problema(s) encontrado(s). Corrija e rode o setup de novo.\n`);
  process.exit(1);
}

if (somenteVerificar) {
  console.log('\nAmbiente pronto.\n');
  process.exit(0);
}

console.log('\n== Instalando dependências ==');
for (const projeto of PROJETOS) {
  const pasta = path.join(RAIZ, projeto);
  if (!fs.existsSync(path.join(pasta, 'package.json'))) continue;

  const temLock = fs.existsSync(path.join(pasta, 'package-lock.json'));
  const comando = temLock ? 'npm ci' : 'npm install';
  console.log(`\n> ${projeto}: ${comando}`);
  try {
    execSync(comando, { cwd: pasta, stdio: 'inherit' });
    ok(`${projeto} pronto`);
  } catch {
    erro(`Falha ao instalar ${projeto}. Tente apagar a pasta node_modules e rodar de novo.`);
    process.exit(1);
  }
}

console.log('\nTudo pronto! Comandos úteis:');
console.log('  npm run atv1     -> Atividade 1 no navegador');
console.log('  npm run final    -> Trabalho Final no navegador');
console.log('  npm run entrega  -> gera os ZIPs de entrega (sem node_modules)\n');
