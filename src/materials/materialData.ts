export interface MaterialItem {
  id: number;
  template: 'manifest' | 'stat' | 'quote' | 'warning';
  platform: 'ig' | 'fb' | 'both';
  size: '1x1' | '4x5' | '9x16';
  content: {
    overline?: string;
    headline: string;
    subline?: string;
    accent?: string;
    footer?: string;
  };
  bg: string;
}

export const MATERIALS: MaterialItem[] = [
  { id: 1, template: 'manifest', platform: 'both', size: '1x1',
    content: { headline: 'Mēs netaisām\nego mājaslapas.', subline: 'Katrs lēmums balstās datos.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 2, template: 'manifest', platform: 'both', size: '1x1',
    content: { headline: 'Sistēma.\nSvira.\nIzpilde.', subline: 'Viss pārējais ir troksnis.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 3, template: 'manifest', platform: 'ig', size: '9x16',
    content: { overline: 'nelasīt', headline: 'Mājaslapa bez\nsistēmas ir tikai\nskaista telpa,\nkurā neviens\nnenāk.', accent: 'Rankly pievieno sistēmu.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 4, template: 'stat', platform: 'both', size: '1x1',
    content: { overline: 'uzņēmumi Latvijā', headline: '15+', subline: 'izmanto Rankly sistēmu', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 5, template: 'stat', platform: 'both', size: '1x1',
    content: { overline: 'mājaslapa', headline: '24h', subline: 'no pieteikuma līdz live', accent: 'no €50/mēn', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 6, template: 'stat', platform: 'both', size: '1x1',
    content: { overline: 'lead response time', headline: '<2 min', subline: 'industrijā vidēji: 47 stundas', accent: 'Rankly AI sistēma', footer: 'rankly.lv/#leadgen' }, bg: '#0A0A0A' },
  { id: 7, template: 'quote', platform: 'both', size: '1x1',
    content: { overline: 'Miyamoto Musashi', headline: 'Strādā tikai\ntas, kas strādā.', subline: 'Ne tas, kas izskatās pareizi.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 8, template: 'quote', platform: 'both', size: '1x1',
    content: { overline: 'Naval Ravikant', headline: 'Pārdodot savu\nlaiku, brīvību\nnenopirksi.', subline: 'Tāpēc mēs būvējam sistēmas.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 9, template: 'quote', platform: 'ig', size: '9x16',
    content: { overline: 'Le Cercle Rouge, 1970', headline: 'Katra kustība\nkalpo\nfunkcionālam\nmērķim.', subline: 'Tukša runāšana ir izslēgta.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
  { id: 10, template: 'warning', platform: 'both', size: '1x1',
    content: { overline: 'BRĪDINĀJUMS', headline: 'AI risinājumu\nizmantošana var dot\nnegodīgu\npriekšrocību.', footer: 'rankly.lv/#ai' }, bg: '#0A0A0A' },
  { id: 11, template: 'warning', platform: 'fb', size: '4x5',
    content: { overline: 'BRĪDINĀJUMS', headline: 'Tavi konkurenti\nvēl to nedara.', accent: 'Tu vari būt pirmais.', subline: 'AI risinājumi — individuāli.', footer: 'rankly.lv/#ai' }, bg: '#0A0A0A' },
  { id: 12, template: 'manifest', platform: 'both', size: '1x1',
    content: { headline: 'Tu vari\npelnīt vairāk.\nŠodien.', accent: 'Ar vienu lēmumu.', footer: 'rankly.lv' }, bg: '#0A0A0A' },
];

export const SIZES = {
  '1x1':  { w: 1080, h: 1080 },
  '4x5':  { w: 1080, h: 1350 },
  '9x16': { w: 1080, h: 1920 },
} as const;
