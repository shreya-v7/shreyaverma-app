// Static require() map for bundled website images. React Native can't resolve
// dynamic require paths, so every image referenced by the data files is mapped
// here by its file name. Look ups are tolerant of leading slashes and folders.

import type { ImageSourcePropType } from 'react-native';

export const profileImage: ImageSourcePropType = require('../../assets/site/profile.png');

const assetMap: Record<string, ImageSourcePropType> = {
  // Experience / company logos
  'proofpoint.png': require('../../assets/site/experience/proofpoint.png'),
  'wolframalpha.png': require('../../assets/site/experience/wolframalpha.png'),
  'Ms.jpg': require('../../assets/site/experience/Ms.jpg'),
  'hpair.png': require('../../assets/site/experience/hpair.png'),
  'toastmasters.png': require('../../assets/site/experience/toastmasters.png'),
  'samsung.jpg': require('../../assets/site/experience/samsung.jpg'),
  'cisco.jpg': require('../../assets/site/experience/cisco.jpg'),
  'tribevibe.png': require('../../assets/site/experience/tribevibe.png'),
  'max.png': require('../../assets/site/experience/max.png'),
  'ieeewie.jpg': require('../../assets/site/experience/ieeewie.jpg'),

  // Education logos
  'cmu.png': require('../../assets/site/education/cmu.png'),
  'vit.png': require('../../assets/site/education/vit.png'),
  'amity.png': require('../../assets/site/education/amity.png'),

  // Certificates
  'googleml.png': require('../../assets/site/certs/googleml.png'),
  'az900.png': require('../../assets/site/certs/az900.png'),
  'andrewngdl.png': require('../../assets/site/certs/andrewngdl.png'),
  'et.png': require('../../assets/site/certs/et.png'),
  'aifsgold.png': require('../../assets/site/certs/aifsgold.png'),
  'guvi.png': require('../../assets/site/certs/guvi.png'),

  // Projects / work
  'webifi.png': require('../../assets/site/work/webifi.png'),
  'timesquare.jpg': require('../../assets/site/work/timesquare.jpg'),
  'ecoship.png': require('../../assets/site/work/ecoship.png'),
  'theriac.png': require('../../assets/site/work/theriac.png'),
  'wizevent.png': require('../../assets/site/work/wizevent.png'),
  'work-hpair.png': require('../../assets/site/work/hpair.png'),
  'diagzone.png': require('../../assets/site/work/diagzone.png'),
  'neura.jpg': require('../../assets/site/work/neura.jpg'),
  'wwt.png': require('../../assets/site/work/wwt.png'),
  'tmi.png': require('../../assets/site/work/tmi.png'),
  'mfa.jpeg': require('../../assets/site/work/mfa.jpeg'),
  'quantastica.png': require('../../assets/site/work/quantastica.png'),

  // Cinema posters
  'tbbt.jpg': require('../../assets/site/cinema/tbbt.jpg'),
  'flash.jpg': require('../../assets/site/cinema/flash.jpg'),
  'loki.jpg': require('../../assets/site/cinema/loki.jpg'),
  'wandavision.jpg': require('../../assets/site/cinema/wandavision.jpg'),
  'thearrow.jpg': require('../../assets/site/cinema/thearrow.jpg'),
  'thelegendsoftomorrow.jpg': require('../../assets/site/cinema/thelegendsoftomorrow.jpg'),
  'supergirl.jpeg': require('../../assets/site/cinema/supergirl.jpeg'),
  'startrek.jpg': require('../../assets/site/cinema/startrek.jpg'),
  'theamazingspiderman.jpg': require('../../assets/site/cinema/theamazingspiderman.jpg'),
  'thedarkknightrises.jpg': require('../../assets/site/cinema/thedarkknightrises.jpg'),
  'starwars.jpg': require('../../assets/site/cinema/starwars.jpg'),

  // Music artists
  'arijitsingh.jpeg': require('../../assets/site/music/arijitsingh.jpeg'),
  'brunomars.jpg': require('../../assets/site/music/brunomars.jpg'),
  'chainsmokers.jpeg': require('../../assets/site/music/chainsmokers.jpeg'),
  'charlieputh.jpg': require('../../assets/site/music/charlieputh.jpg'),
  'coldplay.jpeg': require('../../assets/site/music/coldplay.jpeg'),
  'davidguetta.jpeg': require('../../assets/site/music/davidguetta.jpeg'),
  'hanszimmer.jpg': require('../../assets/site/music/hanszimmer.jpg'),
  'indila.jpg': require('../../assets/site/music/indila.jpg'),
  'pedrocapo.jpg': require('../../assets/site/music/pedrocapo.jpg'),
  'selenagomez.jpg': require('../../assets/site/music/selenagomez.jpg'),
  'tyla.jpg': require('../../assets/site/music/tyla.jpg'),
  'veorra.jpg': require('../../assets/site/music/veorra.jpg'),
};

/**
 * Resolve an image path from the data files (e.g. "work/hpair.png",
 * "/certs/googleml.png", "experience/Ms.jpg") to a bundled asset.
 */
export function resolveAsset(path?: string): ImageSourcePropType | undefined {
  if (!path) return undefined;
  const file = path.replace(/^\/+/, '').split('/').pop();
  if (!file) return undefined;
  // Disambiguate the duplicate hpair.png (work vs experience).
  if (path.includes('work/') && file === 'hpair.png') return assetMap['work-hpair.png'];
  return assetMap[file];
}
