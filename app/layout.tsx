import type { Metadata } from 'next';
import './globals.css';

/** Runs before first paint: picks the language (URL > saved choice > OS/browser list) so the page never flashes Japanese first. */
const LANG_BOOT = `(function(){try{
var L=['ja','en','zh-Hant','zh-Hans'],d=document.documentElement,pick=null;
var q=new URLSearchParams(location.search).get('lang');if(L.indexOf(q)>=0)pick=q;
if(!pick){var s=localStorage.getItem('akc.lang');if(L.indexOf(s)>=0)pick=s;}
if(!pick){var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];
for(var i=0;i<ls.length&&!pick;i++){var n=String(ls[i]).toLowerCase();
if(n.indexOf('ja')===0)pick='ja';else if(/^zh-(tw|hk|mo)|hant/.test(n))pick='zh-Hant';else if(n.indexOf('zh')===0)pick='zh-Hans';else if(n.indexOf('en')===0)pick='en';}}
pick=pick||'en';d.setAttribute('data-lang',pick);
if(pick!=='ja'){d.lang=pick;d.classList.add('lang-pending');setTimeout(function(){d.classList.remove('lang-pending');},2000);}
}catch(e){}})();`;

export const metadata: Metadata = {
  title: 'AKIRA CHŌ — Product Engineer',
  description: '15 years of product development, and an AI content studio built and run solo.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
