// Favorite artists snapshot for the Diary > Music section (offline, no embeds).

export type Artist = {
  name: string;
  image: string; // resolved via resolveAsset
};

export const favoriteArtists: Artist[] = [
  { name: 'Coldplay', image: 'music/coldplay.jpeg' },
  { name: 'Arijit Singh', image: 'music/arijitsingh.jpeg' },
  { name: 'Hans Zimmer', image: 'music/hanszimmer.jpg' },
  { name: 'Bruno Mars', image: 'music/brunomars.jpg' },
  { name: 'The Chainsmokers', image: 'music/chainsmokers.jpeg' },
  { name: 'Charlie Puth', image: 'music/charlieputh.jpg' },
  { name: 'David Guetta', image: 'music/davidguetta.jpeg' },
  { name: 'Selena Gomez', image: 'music/selenagomez.jpg' },
  { name: 'Indila', image: 'music/indila.jpg' },
  { name: 'Pedro Capo', image: 'music/pedrocapo.jpg' },
  { name: 'Tyla', image: 'music/tyla.jpg' },
  { name: 'Veorra', image: 'music/veorra.jpg' },
];
