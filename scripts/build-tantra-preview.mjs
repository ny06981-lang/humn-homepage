import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'sources/tantra1-rus-live-2026-10-20.html');
const output = resolve(root, 'previews/tantra1-rus-v2.html');
let html = readFileSync(source, 'utf8');

function replaceOnce(from, to) {
  const count = html.split(from).length - 1;
  if (count !== 1) throw new Error(`Expected one match, found ${count}: ${from.slice(0, 90)}`);
  html = html.replace(from, to);
}

replaceOnce(
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0" /> <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" /> <meta name="googlebot" content="noindex,nofollow,noarchive,nosnippet" />'
);
replaceOnce(
  '<title>Тантра на Бали с Хомой и Мукто — декабрь 2026 | HUMN</title>',
  '<title>Тантра на Бали с Хомой и Мукто — декабрь 2026 | Human</title>'
);
replaceOnce(
  'content="Две части тантра-тренинга в декабре 2026: освобождение сексуальной энергии и близость с осознанностью. Хома и Мукто, Кандидаса, Бали."',
  'content="Две части тантра-тренинга в декабре 2026: жизненная энергия, медитация и осознанная близость. Хома и Мукто, Кандидаса, Бали."'
);
replaceOnce(
  '<meta property="og:url" content="https://humns.ru/tantra1_rus" />',
  '<meta property="og:url" content="https://ny06981-lang.github.io/humn-homepage/previews/tantra1-rus-v2.html" />'
);
replaceOnce(
  '<link rel="canonical" href="https://humns.ru/tantra1_rus">',
  '<link rel="canonical" href="https://humns.ru/tantra1_rus">'
);
replaceOnce(
  'Тантра-ретрит на Бали для тех, кто хочет восстановить контакт с телом, сексуальностью и близостью — в безопасном пространстве с Хомой и Мукто.',
  'Тантра-ретрит на Бали для тех, кто хочет глубже почувствовать тело, исследовать жизненную энергию и близость — в бережном пространстве с Хомой и Мукто.'
);
replaceOnce(
  '<li data-list="bullet"><strong>Прожить секс как медитацию</strong>&nbsp;– быть в моменте, осознанно, без погони за оргазмом.</li>',
  '<li data-list="bullet"><strong>Исследовать медитацию</strong> как практику осознанного присутствия, глубокого расслабления и более тонкого восприятия себя.</li>'
);
replaceOnce(
  '<li data-list="bullet"><strong>Исцелить старые раны</strong>&nbsp;– встретить свои страхи, прожить боль и отпустить её.</li>',
  '<li data-list="bullet"><strong>Исследовать привычные реакции</strong>&nbsp;– лучше понимать свои чувства, потребности и границы.</li>'
);
replaceOnce(
  'ЧАСТЬ 1. ОСВОБОЖДЕНИЕ СЕКСУАЛЬНОЙ ЭНЕРГИИ',
  'ЧАСТЬ 1. ПРОБУЖДЕНИЕ ЖИЗНЕННОЙ ЭНЕРГИИ'
);
replaceOnce(
  'Первый шаг к целостной сексуальности — отпустить подавленную энергию.',
  'Первый шаг — восстановить связь с телом и исследовать свою жизненную энергию.'
);
replaceOnce(
  'Как только мы понимаем, что жить в уязвимости — наша главная сила, близость и сексуальность становятся прекрасным способом узнавать себя и своих любимых.',
  'Когда мы принимаем свою уязвимость, близость становится способом лучше узнавать себя и дорогих нам людей.'
);
replaceOnce(
  'Во второй части мы выходим на новый уровень понимания своей сексуальности.',
  'Во второй части мы глубже исследуем присутствие в близости.'
);
replaceOnce(
  'Секс перестает быть стрессовой «гонкой за оргазмом» и превращается в расслабленную, радостную встречу двух любящих людей.',
  'Близость становится более осознанной, расслабленной и радостной встречей двух любящих людей.'
);
replaceOnce(
  'Мы перестаем спешить в будущее ради кульминации и позволяем сексуальной энергии течь свободно. Это дарит нам глубокое ощущение полноты и единения прямо здесь и сейчас.',
  'Мы замедляемся, замечаем телесные ощущения и учимся оставаться в контакте с собой и партнёром. Так легче почувствовать полноту момента и связь друг с другом.'
);
replaceOnce(
  'Как только мы научимся пребывать в своем теле и глубоко чувствовать всё, что рождает момент близости, мы не только исцелим старые раны, что вызывают одиночество, но и пережим удивительное слияние секса и медитации.',
  'Когда мы учимся присутствовать в своём теле и осознанно проживать моменты близости, мы можем глубже понимать свои чувства, освобождаться от старых эмоциональных ограничений и открывать новые возможности для доверия и связи.'
);
replaceOnce(
  'Хома и Мукто — международно известные тантра-терапевты с более чем 30-летним опытом, которые проводят тренинги и ретриты по всему миру, изменив жизни тысяч людей.',
  'Хома и Мукто — преподаватели тантры с более чем 30-летним опытом проведения тренингов и ретритов в разных странах.'
);
replaceOnce(
  'За годы работы Хома и Мукто учились у мировых терапевтов, освоив множество методик. Исследуя такие направления, как работа с чакрами, считывание энергии, прошлые жизни и важность медитации, они создали свои собственные методы, привнося осознанность, честность и любовь через тантру.',
  'За годы работы Хома и Мукто учились у мастеров разных направлений. Они исследовали работу с чакрами, телом и медитацией и создали собственный подход, в котором важны осознанность, честность и уважение к каждому участнику.'
);
replaceOnce(
  '<li data-list="bullet">нет обязательной наготы или сексуального контакта </li>',
  '<li data-list="bullet">границы участия и формат телесных упражнений можно обсудить с организатором заранее.</li>'
);

const homeLinks = html.split('href="/"').length - 1;
if (homeLinks !== 2) throw new Error(`Expected two homepage links, found ${homeLinks}`);
html = html.replaceAll('href="/"', 'href="https://humns.ru/"');
replaceOnce("I'm available for business trips to other cities for projects lasting a month or longer.", '');

// The preview is a published Tilda snapshot. Keep its layout and public assets,
// but don't let preview traffic register as production analytics.
html = html.replace(/<meta name="(?:google-site-verification|yandex-verification)"[^>]*\/>\s*/g, '');
html = html.replace(/<script[^>]*src="https:\/\/(?:mc\.yandex\.ru|www\.googletagmanager\.com|www\.google-analytics\.com)[^"]*"[^>]*><\/script>/g, '');

writeFileSync(output, html);
console.log(`Built ${output}`);
