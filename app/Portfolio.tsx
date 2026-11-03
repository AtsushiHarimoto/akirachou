'use client';

import { useEffect, useRef, useState } from 'react';
import { COPY, LANGS, LANG_LABEL, LINKS, type Lang } from '@/lib/content';

const BASE = process.env.NODE_ENV === 'production' ? '/akirachou' : '';
const STORE_KEY = 'akc.lang';

/** The boot script in layout.tsx already chose the language (URL > saved > OS list); read it back. */
function bootLang(): Lang {
  const v = document.documentElement.getAttribute('data-lang');
  return v && (LANGS as readonly string[]).includes(v) ? (v as Lang) : 'ja';
}

/** Elements with .rise fade in once they enter the viewport. Visible by default; hidden only after JS confirms IO works. */
function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rise'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    document.body.classList.add('rise-on');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((e) => io.observe(e));
    const safety = window.setTimeout(() => els.forEach((e) => e.classList.add('in')), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [dep]);
}

/** Hero screenshot scales from 0.86 to 1 as the user scrolls through the hero. */
function useHeroScale(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
        el.style.setProperty('--hs', String(0.86 + 0.14 * t));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

function Shot({ src, alt, pending }: { src: string; alt: string; pending: string }) {
  const [ok, setOk] = useState(true);
  const img = useRef<HTMLImageElement>(null);
  // The image can fail before hydration attaches onError, so also check once after mount.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, [src]);
  return (
    <div className="shot">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={img} src={BASE + src} alt={alt} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <div className="shot-pending">{pending}</div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>('ja');
  const [tab, setTab] = useState(0);
  const heroShot = useRef<HTMLDivElement>(null);
  const c = COPY[lang];

  const [picked, setPicked] = useState(false);
  useEffect(() => {
    setLang(bootLang());
    setPicked(true);
  }, []);
  useEffect(() => {
    if (!picked) return;
    const d = document.documentElement;
    d.lang = c.htmlLang;
    d.setAttribute('data-lang', lang);
    d.classList.remove('lang-pending');
  }, [lang, c.htmlLang, picked]);
  useReveal(lang);
  useHeroScale(heroShot);

  const group = c.studio.groups[tab];

  return (
    <>
      <header className="bar">
        <a className="mark" href="#top">AKIRA CHŌ</a>
        <nav className="anchors" aria-label="sections">
          <a href="#studio">{c.nav.studio}</a>
          <a href="#career">{c.nav.career}</a>
          <a href="#work">{c.nav.work}</a>
          <a href="#stack">{c.nav.stack}</a>
          <a href="#contact">{c.nav.contact}</a>
        </nav>
        <div className="langs" role="group" aria-label="language">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              lang={l}
              aria-pressed={l === lang}
              onClick={() => {
                setLang(l);
                window.localStorage.setItem(STORE_KEY, l);
              }}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <p className="kicker">{c.hero.kicker}</p>
          <h1>{c.hero.title}</h1>
          <p className="lead">{c.hero.lead}</p>
          <div className="hero-shot" ref={heroShot}>
            <Shot src="/shots/hero.webp" alt={c.studio.title} pending={c.studio.shotPending} />
          </div>
          <dl className="stats">
            {c.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="studio" className="sec">
          <p className="label rise">{c.studio.label}</p>
          <h2 className="rise">{c.studio.title}</h2>
          <p className="sec-lead rise">{c.studio.lead}</p>

          <div className="flow rise" aria-label={c.studio.flowTitle}>
            {c.studio.flow.map((f, i) => (
              <span key={f}>
                <i>{String(i + 1).padStart(2, '0')}</i>
                {f}
              </span>
            ))}
          </div>

          <div className="tabs rise" role="tablist">
            {c.studio.groups.map((g, i) => (
              <button key={g.id} role="tab" type="button" aria-selected={i === tab} onClick={() => setTab(i)}>
                {g.title}
              </button>
            ))}
          </div>
          <div className="group" role="tabpanel">
            <Shot key={group.id} src={group.shot} alt={group.title} pending={c.studio.shotPending} />
            <div className="group-txt">
              <h3>{group.title}</h3>
              <p>{group.lead}</p>
              <ul>
                {group.items.map((it) => (
                  <li key={it.name}>
                    <b>{it.name}</b>
                    <span>{it.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="career" className="sec">
          <p className="label rise">{c.career.label}</p>
          <h2 className="rise">{c.career.title}</h2>
          <p className="sec-lead rise">{c.career.lead}</p>
          <ol className="timeline">
            {c.career.eras.map((e) => (
              <li key={e.period + e.field} className={'rise' + (e.current ? ' now' : '')}>
                <span className="period">{e.period}</span>
                <div>
                  <h3>{e.role}</h3>
                  <p className="field">{e.field}</p>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="sec">
          <p className="label rise">{c.work.label}</p>
          <h2 className="rise">{c.work.title}</h2>
          <p className="sec-lead rise">{c.work.lead}</p>
          <a className="cta rise" href={LINKS.portal} target="_blank" rel="noopener">
            {c.work.cta} ↗
          </a>
        </section>

        <section id="stack" className="sec">
          <p className="label rise">{c.stack.label}</p>
          <h2 className="rise">{c.stack.title}</h2>
          <div className="stack">
            {c.stack.groups.map((g) => (
              <div key={g.name} className="rise">
                <h3>{g.name}</h3>
                <p>{g.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="sec">
          <p className="label rise">{c.contact.label}</p>
          <h2 className="rise">{c.contact.title}</h2>
          <p className="sec-lead rise">{c.contact.lead}</p>
          <a className="cta rise" href={LINKS.github} target="_blank" rel="noopener">
            {c.contact.cta} ↗
          </a>
        </section>
      </main>

      <footer className="foot">{c.footer}</footer>
    </>
  );
}
