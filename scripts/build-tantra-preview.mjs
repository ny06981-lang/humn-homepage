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
  'content="Тантра-тренинг на Бали в декабре 2026: личностное развитие, медитация, телесная осознанность и навыки общения. Хома и Мукто, Кандидаса."'
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
  'Тантра-тренинг на Бали для тех, кто хочет лучше понимать себя, развивать телесную осознанность и навыки общения — в бережном пространстве с Хомой и Мукто.'
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
  '<li data-list="bullet"><strong>Открыть истинную близость</strong>&nbsp;– встречать партнёра через сердце, доверять и видеть красоту интимности.</li>',
  '<li data-list="bullet"><strong>Развивать осознанное общение</strong>&nbsp;– замечать свои реакции, выражать потребности и уважать границы другого человека.</li>'
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
  'Когда мы принимаем свою уязвимость, нам легче понимать собственные чувства и выстраивать честное общение с другими.'
);
replaceOnce(
  'Потрясающие моменты радости и близости могут сменяться воспоминаниями о боли. Могут случаться глубокие озарения.',
  'В практике могут подниматься разные чувства и воспоминания. Мы учимся замечать их и выбирать комфортный для себя темп.'
);
replaceOnce(
  'ЧАСТЬ 2. БЛИЗОСТЬ И ОСОЗНАННОСТЬ',
  'ЧАСТЬ 2. ПРИСУТСТВИЕ И ОБЩЕНИЕ'
);
replaceOnce(
  'Во второй части мы выходим на новый уровень понимания своей сексуальности.',
  'Во второй части мы исследуем, как сохранять присутствие в общении и лучше понимать свои реакции.'
);
replaceOnce(
  'Этот этап открывает перед нами совершенно иной взгляд на близость и интимную связь.',
  'Этот этап помогает по-новому посмотреть на привычные способы взаимодействия с другими людьми.'
);
replaceOnce(
  'Секс перестает быть стрессовой «гонкой за оргазмом» и превращается в расслабленную, радостную встречу двух любящих людей.',
  'Практики в парах помогают развивать внимание, честность в диалоге и уважение к личным границам.'
);
replaceOnce(
  'Мы перестаем спешить в будущее ради кульминации и позволяем сексуальной энергии течь свободно. Это дарит нам глубокое ощущение полноты и единения прямо здесь и сейчас.',
  'Мы замедляемся, замечаем телесные ощущения и учимся оставаться в контакте с собой. Это помогает яснее понимать свои потребности и говорить о них.'
);
replaceOnce(
  'Наша главная задача — прекратить «делать» и осознать естественный поток энергии, который возникает при встрече мужского и женского начал.',
  'Мы уделяем внимание медитации, движению и упражнениям на присутствие, сохраняя право каждого участника выбирать степень вовлечённости.'
);
replaceOnce(
  'Как только мы научимся пребывать в своем теле и глубоко чувствовать всё, что рождает момент близости, мы не только исцелим старые раны, что вызывают одиночество, но и пережим удивительное слияние секса и медитации.',
  'Практика осознанного присутствия помогает лучше распознавать свои чувства, привычные реакции и способы взаимодействия с людьми.'
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

// Keep participant quotes intact; omit this carousel until the public editorial direction is approved.
const reviewsStart = html.indexOf('<div id="rec2369890571"');
const faqStart = html.indexOf('<div id="rec2369890681"');
if (reviewsStart < 0 || faqStart <= reviewsStart) throw new Error('Review carousel boundaries not found');
html = html.slice(0, reviewsStart) + html.slice(faqStart);

// The preview is a published Tilda snapshot. Keep its layout and public assets,
// but don't let preview traffic register as production analytics.
html = html.replace(/<meta name="(?:google-site-verification|yandex-verification)"[^>]*\/>\s*/g, '');
html = html.replace(/<script[^>]*src="https:\/\/(?:mc\.yandex\.ru|www\.googletagmanager\.com|www\.google-analytics\.com)[^"]*"[^>]*><\/script>/g, '');

writeFileSync(output, html);
console.log(`Built ${output}`);
