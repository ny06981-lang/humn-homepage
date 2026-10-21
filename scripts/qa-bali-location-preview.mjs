import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'previews/bali-training-location-preview.html'), 'utf8');
const css = readFileSync(resolve(root, 'assets/bali-training-location-preview/preview.css'), 'utf8');

for (const phrase of [
  'Место проведения: уютный отель на побережье Бали',
  'Подробности о месте проведения и размещении отправим вам лично после заявки.',
  'Подробности размещения отправим лично.',
  'li_title&quot;:&quot;Ваш email&quot;',
  'name="robots" content="noindex, nofollow"',
  'intro.jpg',
  'leaders.jpg',
  'circle.jpg',
]) assert.ok(html.includes(phrase), `Missing: ${phrase}`);

assert.ok(!/Ramayana|Candidasa|Кандидас/i.test(html), 'Private location remains');
assert.ok(!html.includes("I'm available for business trips"), 'Unrelated menu text remains');
assert.ok(css.includes('.t450__menu__content'), 'Mobile menu background fix missing');
assert.ok(css.includes('#rec4997496501 .tn-elem__49974965011470210224069'), 'Floating widget fix missing');
console.log('Bali location preview: OK');
