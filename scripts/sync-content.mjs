import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(repoRoot, 'content', 'docs');
const contentSrc = path.join(repoRoot, 'content-src');

const sourceRoots = {
  ajar: path.resolve(repoRoot, process.env.AJAR_DIR ?? '../ajar'),
  github: path.resolve(repoRoot, process.env.GITHUB_DIR ?? '../.github'),
  planning: path.resolve(repoRoot, process.env.PLANNING_DIR ?? '../planning'),
};

const pages = [
  ['ajar', 'docs/03-PROTOCOL-SPEC.md', 'protocol/spec.mdx'],
  ['ajar', 'docs/02-ARCHITECTURE.md', 'protocol/architecture.mdx'],
  ['ajar', 'docs/04-SECURITY-MODEL.md', 'protocol/security-model.mdx'],
  ['ajar', 'docs/05-OWNER-CONTROL.md', 'protocol/owner-control.mdx'],
  ['ajar', 'docs/01-RESEARCH.md', 'protocol/research.mdx'],
  ['ajar', 'GLOSSARY.md', 'reference/glossary.mdx'],
  ['ajar', 'DECISIONS.md', 'reference/decisions.mdx'],
  ['ajar', 'registries/scopes.md', 'reference/scopes.mdx'],
  ['ajar', 'registries/error-codes.md', 'reference/error-codes.mdx'],
  ['ajar', 'registries/settlement-adapters.md', 'reference/settlement-adapters.mdx'],
  ['github', 'ONBOARDING.md', 'contributing/onboarding.mdx'],
  ['github', 'CONTRIBUTING.md', 'contributing/guidelines.mdx'],
  ['github', 'TESTING.md', 'contributing/testing.mdx'],
  ['github', 'AGENTS.md', 'contributing/ai-agents.mdx'],
  ['planning', 'ROADMAP.md', 'project/roadmap.mdx'],
  ['planning', 'BUILD-ORDER.md', 'project/build-order.mdx'],
  ['planning', 'POSITIONING.md', 'project/positioning.mdx'],
  ['planning', 'INTEGRATION-STORIES.md', 'project/integration-stories.mdx'],
];

const handPages = [
  ['index.mdx', 'index.mdx'],
  ['concepts/index.mdx', 'concepts/index.mdx'],
  ['concepts/problem-statement.mdx', 'concepts/problem-statement.mdx'],
  ['concepts/owner-contract.mdx', 'concepts/owner-contract.mdx'],
  ['concepts/discovery-and-verification.mdx', 'concepts/discovery-and-verification.mdx'],
  ['concepts/access-and-authentication.mdx', 'concepts/access-and-authentication.mdx'],
  ['concepts/delegated-authority.mdx', 'concepts/delegated-authority.mdx'],
  ['concepts/model-safety.mdx', 'concepts/model-safety.mdx'],
  ['concepts/action-safety.mdx', 'concepts/action-safety.mdx'],
  ['concepts/receipts-and-accountability.mdx', 'concepts/receipts-and-accountability.mdx'],
  ['concepts/metering-and-settlement.mdx', 'concepts/metering-and-settlement.mdx'],
  ['concepts/end-to-end-flow.mdx', 'concepts/end-to-end-flow.mdx'],
  ['schemas.mdx', 'reference/schemas.mdx'],
  ['test-vectors.mdx', 'reference/test-vectors.mdx'],
];

const metaFiles = [
  [
    'meta.json',
    {
      title: 'Ajar Protocol',
      pages: ['index', 'concepts', 'protocol', 'reference', 'contributing', 'project'],
    },
  ],
  [
    'concepts/meta.json',
    {
      title: 'Concepts',
      pages: [
        'index',
        'problem-statement',
        'owner-contract',
        'discovery-and-verification',
        'access-and-authentication',
        'delegated-authority',
        'model-safety',
        'action-safety',
        'receipts-and-accountability',
        'metering-and-settlement',
        'end-to-end-flow',
      ],
    },
  ],
  [
    'protocol/meta.json',
    {
      title: 'Protocol',
      pages: ['spec', 'architecture', 'security-model', 'owner-control', 'research'],
    },
  ],
  [
    'reference/meta.json',
    {
      title: 'Reference',
      pages: ['glossary', 'decisions', 'scopes', 'error-codes', 'settlement-adapters', 'schemas', 'test-vectors'],
    },
  ],
  [
    'contributing/meta.json',
    {
      title: 'Contributing',
      pages: ['onboarding', 'guidelines', 'testing', 'ai-agents'],
    },
  ],
  [
    'project/meta.json',
    {
      title: 'Project',
      pages: ['roadmap', 'build-order', 'positioning', 'integration-stories'],
    },
  ],
];

const routeMap = new Map(
  pages.map(([root, rel, out]) => [`${root}:${normalizeRel(rel)}`, `/docs/${stripExt(out)}`]),
);
routeMap.set('ajar:README.md', 'https://github.com/ajar-protocol/ajar');
routeMap.set('github:README.md', 'https://github.com/ajar-protocol/.github');
routeMap.set('github:profile/README.md', 'https://github.com/ajar-protocol');
routeMap.set('planning:README.md', 'https://github.com/ajar-protocol/planning');

const warnings = [];

for (const [name, sourceRoot] of Object.entries(sourceRoots)) {
  if (!existsSync(sourceRoot)) {
    throw new Error(`Missing source root ${name}: ${sourceRoot}`);
  }
}

rmSync(docsRoot, { recursive: true, force: true });
mkdirSync(docsRoot, { recursive: true });

for (const [src, out] of handPages) {
  const srcPath = path.join(contentSrc, src);
  assertFile(srcPath);
  writeFile(out, readFileSync(srcPath, 'utf8'));
}

for (const [rootName, rel, out] of pages) {
  const srcPath = path.join(sourceRoots[rootName], rel);
  assertFile(srcPath);
  const raw = readFileSync(srcPath, 'utf8');
  const { title, description, body } = derivePage(raw, srcPath);
  const linked = rewriteLinks(body, srcPath);
  const escaped = escapeMdx(linked);
  writeFile(
    out,
    `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n${escaped.trim()}\n`,
  );
}

for (const [out, data] of metaFiles) {
  writeFile(out, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(`Synced ${pages.length + handPages.length} docs pages into content/docs.`);
if (warnings.length > 0) {
  console.warn('Content transform warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
} else {
  console.log('Content transform warnings: none');
}

function assertFile(file) {
  if (!existsSync(file)) {
    throw new Error(`Missing required source file: ${file}`);
  }
}

function writeFile(rel, content) {
  const outPath = path.join(docsRoot, rel);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, content);
}

function normalizeRel(value) {
  return value.split(path.sep).join('/');
}

function stripExt(value) {
  return value.replace(/\.(md|mdx)$/i, '');
}

function derivePage(raw, sourcePath) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const h1Index = lines.findIndex((line) => /^#\s+/.test(line));
  if (h1Index === -1) {
    throw new Error(`Missing first-level heading in ${sourcePath}`);
  }

  const rawTitle = lines[h1Index].replace(/^#\s+/, '').trim();
  const title = cleanTitle(rawTitle);
  const bodyLines = [...lines.slice(0, h1Index), ...lines.slice(h1Index + 1)];
  while (bodyLines[0] === '') bodyLines.shift();

  const body = bodyLines.join('\n');
  return {
    title,
    description: deriveDescription(body),
    body,
  };
}

function cleanTitle(title) {
  return title.replace(/^\d+\s*[-–—]\s*/, '').trim();
}

function deriveDescription(body) {
  let inFence = false;
  let paragraph = [];

  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraph.length > 0) break;
      continue;
    }
    if (/^(#{1,6}\s|---+$|\|)/.test(trimmed)) {
      if (paragraph.length > 0) break;
      continue;
    }
    paragraph.push(trimmed);
  }

  const text = stripMarkdown(paragraph.join(' '));
  if (text.length <= 150) return text;
  return `${text.slice(0, 147).replace(/\s+\S*$/, '')}...`;
}

function stripMarkdown(value) {
  return value
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function rewriteLinks(markdown, sourcePath) {
  return markdown.replace(/(?<!!)\[([^\]]+)]\(([^)]+)\)/g, (match, label, target) => {
    const rewritten = rewriteTarget(target.trim(), sourcePath);
    return rewritten ? `[${label}](${rewritten})` : match;
  });
}

function rewriteTarget(target, sourcePath) {
  if (/^(https?:|mailto:|#)/.test(target)) return target;

  const [pathPart, anchor = ''] = splitAnchor(target);
  if (!pathPart || pathPart.startsWith('javascript:')) return target;

  const normalizedTarget = normalizeRel(pathPart.replace(/^\/+/, ''));
  if (isAjarArtifactPath(normalizedTarget)) {
    return ajarArtifactUrl(normalizedTarget, anchor);
  }

  const absolute = path.resolve(path.dirname(sourcePath), pathPart);
  const sourceInfo = identifySource(absolute);
  if (!sourceInfo) return target;

  const artifactRel = sourceInfo.rel;
  if (sourceInfo.root === 'ajar' && isAjarArtifactPath(artifactRel)) {
    return ajarArtifactUrl(artifactRel, anchor);
  }

  const mapped = routeMap.get(`${sourceInfo.root}:${artifactRel}`);
  if (mapped) return `${mapped}${anchor}`;

  if (/\.md$/i.test(pathPart)) {
    warnings.push(`Unmapped markdown link in ${relativeFromRepo(sourcePath)}: ${target}`);
  }

  return target;
}

function splitAnchor(target) {
  const hash = target.indexOf('#');
  if (hash === -1) return [target, ''];
  return [target.slice(0, hash), target.slice(hash)];
}

function identifySource(absolute) {
  for (const [root, sourceRoot] of Object.entries(sourceRoots)) {
    const rel = path.relative(sourceRoot, absolute);
    if (!rel.startsWith('..') && !path.isAbsolute(rel)) {
      return { root, rel: normalizeRel(rel) };
    }
  }
  return null;
}

function isAjarArtifactPath(rel) {
  return /^(examples|schemas|test-vectors)(\/|$)/.test(rel);
}

function ajarArtifactUrl(rel, anchor) {
  return `https://github.com/ajar-protocol/ajar/tree/main/${rel}${anchor}`;
}

function relativeFromRepo(file) {
  return normalizeRel(path.relative(repoRoot, file));
}

function escapeMdx(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let fence = null;

  return lines
    .map((line) => {
      const marker = line.match(/^\s*(`{3,}|~{3,})/);
      if (marker) {
        const run = marker[1];
        if (fence && run.startsWith(fence[0])) fence = null;
        else if (!fence) fence = run;
        return line;
      }

      if (fence) return line;
      return escapeInlineMdx(line);
    })
    .join('\n');
}

function escapeInlineMdx(line) {
  let out = '';
  let index = 0;

  while (index < line.length) {
    if (line[index] === '`') {
      const runLength = countRun(line, index, '`');
      const fence = '`'.repeat(runLength);
      const end = line.indexOf(fence, index + runLength);
      if (end !== -1) {
        out += line.slice(index, end + runLength);
        index = end + runLength;
        continue;
      }
    }

    const char = line[index];
    if (char === '<') out += '\\<';
    else if (char === '{') out += '\\{';
    else out += char;
    index += 1;
  }

  return out;
}

function countRun(value, index, char) {
  let end = index;
  while (value[end] === char) end += 1;
  return end - index;
}
