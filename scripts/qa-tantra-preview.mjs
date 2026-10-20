import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const live = readFileSync(resolve(root, 'sources/tantra1-rus-live-2026-10-20.html'), 'utf8');
const preview = readFileSync(resolve(root, 'previews/tantra1-rus-v2.html'), 'utf8');
const visibleText = preview.replace(/<[^>]+>/g, '').replaceAll('&nbsp;', ' ');

for (const phrase of [
  'Исследовать медитацию как практику осознанного присутствия, глубокого расслабления и более тонкого восприятия себя.',
  'Практики в парах помогают развивать внимание, честность в диалоге и уважение к личным границам.',
  'Практика осознанного присутствия помогает лучше распознавать свои чувства, привычные реакции и способы взаимодействия с людьми.',
  'ЧАСТЬ 1. ПРОБУЖДЕНИЕ ЖИЗНЕННОЙ ЭНЕРГИИ',
  'ЧАСТЬ 2. ПРИСУТСТВИЕ И ОБЩЕНИЕ',
  'Хома и Мукто более 30 лет ведут тренинги и ретриты по личностному развитию',
  'name="robots" content="noindex,nofollow,noarchive,nosnippet"',
]) assert.ok((phrase.startsWith('name=') ? preview : visibleText).includes(phrase), `Missing approved copy: ${phrase.slice(0, 80)}`);

for (const phrase of [
  'Прожить секс как медитацию',
  'гонкой за оргазмом',
  'пережим удивительное слияние',
  'Исцелить старые раны',
  'тантра-терапевты',
  'нет обязательной наготы',
  'ОСВОБОЖДЕНИЕ СЕКСУАЛЬНОЙ ЭНЕРГИИ',
]) assert.ok(!preview.includes(phrase), `Old copy remains: ${phrase}`);

assert.ok(!/близост|интимн|сексуал|секс|оргазм|intimacy/i.test(preview), 'Sensitive framing remains in preview');
assert.ok(!/тантр/i.test(preview.replace(/<script[\s\S]*?<\/script>/g, '')), 'Old terminology remains outside scripts');
assert.ok(!preview.includes('id="rec2369890571"'), 'Unapproved review carousel remains');

for (const phrase of [
  '3-12 декабря, 2026',
  '15-20 декабря, 2026',
  'от 1200 EUR',
  'от 720 EUR',
  'Ramayana Candidasa Beach Resort',
  'id="rec2369890671"',
]) {
  assert.ok(live.includes(phrase) && preview.includes(phrase), `Core program detail lost: ${phrase}`);
}

assert.ok(!preview.includes('PT Transformasi Retreat Soluti'), 'Unverified legal name published');
assert.ok(!preview.includes('href="/"'), 'Preview navigation points to GitHub root');
assert.ok(!preview.includes("I'm available for business trips"), 'Unrelated mobile menu copy remains');
const liveImages = [...live.matchAll(/data-original=['"](https:\/\/[^'"]+)['"]/g)].map(m => m[1]);
const previewImages = [...preview.matchAll(/data-original=['"](https:\/\/[^'"]+)['"]/g)].map(m => m[1]);
assert.deepEqual(previewImages, liveImages, 'Published imagery changed unexpectedly');
console.log(`Preview copy and metadata: OK (${previewImages.length} original media references preserved)`);
