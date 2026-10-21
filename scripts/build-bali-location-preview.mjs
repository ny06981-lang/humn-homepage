import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let html = readFileSync(resolve(root, 'previews/bali-training-photo-preview.html'), 'utf8');

function replaceOnce(from, to) {
  const count = html.split(from).length - 1;
  if (count !== 1) throw new Error(`Expected one match, found ${count}: ${from.slice(0, 80)}`);
  html = html.replace(from, to);
}

replaceOnce('bali-training-photo-preview.html', 'bali-training-location-preview.html');
replaceOnce('../assets/bali-training-photo-preview/preview.css', '../assets/bali-training-location-preview/preview.css');
replaceOnce('3–12 и 15–20 декабря 2026, Кандидаса.', '3–12 и 15–20 декабря 2026, Бали.');
replaceOnce('Хома и Мукто, Кандидаса.', 'Хома и Мукто, Бали.');
replaceOnce('Место проведения: Ramayana Candidasa Beach Resort', 'Место проведения: уютный отель на побережье Бали');
replaceOnce(
  'Ramayana Candidasa Beach Resort&nbsp;—&nbsp;четырёхзвёздочный отель в городе Кандидаса (Бали). Расположен в центре города, прямо на берегу океана. Всего 1,5 часа от международного аэропорта Нгурах-Рай.',
  'Тренинг пройдёт в уютном отеле на побережье Бали, рядом с океаном. Подробности о месте проведения и размещении отправим вам лично после заявки.'
);
replaceOnce(
  'Да, мы просим всех участников останавливаться именно в отеле Ramayana Candidasa. Это помогает сохранить общую энергию и глубину работы, а также даёт возможность общаться с другими участниками в перерывах и после вечерних сессий – что является важной частью опыта.',
  'Да, мы просим участников остановиться в отеле, где проходит тренинг. Так проще оставаться в общем ритме программы и общаться с группой между практиками. Подробности размещения отправим лично.'
);
replaceOnce('I\'m available for business trips to other cities for projects lasting a month or longer.', '');
replaceOnce(
  'li_ph&quot;:&quot;Your e-mail&quot;,&quot;li_name&quot;:&quot;Email&quot;',
  'li_ph&quot;:&quot;Ваш email&quot;,&quot;li_title&quot;:&quot;Ваш email&quot;,&quot;li_name&quot;:&quot;Email&quot;'
);

if (/Ramayana|Candidasa|Кандидас/i.test(html)) throw new Error('Private location still appears in preview');
writeFileSync(resolve(root, 'previews/bali-training-location-preview.html'), html);
