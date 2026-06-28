// Diary / blog content mirrored from the website's src/data/diary/*.ts files.
// Used to seed the Journal on first launch. After seeding, the copies in the
// app's local database are fully editable and never synced back to the site.

import type { PersonalPost } from '@/types';

export const blogsPosts: PersonalPost[] = [
  {
    id: 'blogs-2',
    title: "Extended Reality: Convincing Tomorrow's Imagination",
    caption:
      'A history of tomorrow. Exploring how Extended Reality (XR) technologies are reshaping our perception of reality itself.',
    date: '2020-12-09',
    type: 'blogs',
    tags: ['AR', 'VR', 'MR', 'Extended Reality', 'Technology'],
    link: 'https://medium.com/ieee-women-in-engineering-vit/extended-reality-319554e95071',
  },
];

export const booksPosts: PersonalPost[] = [
  {
    id: 'book-11',
    caption:
      'italy summer brain rot but she\'s also on a whole scavenger hunt and the dad plot said "we do NOT do wholesome reunions here" (3/5 gelato girl summer)',
    type: 'books',
    tags: ['fiction', 'romance', 'ya'],
    date: '2026-06-12',
    metadata: {
      author: 'Jenna Evans Welch',
      book: 'Love & Gelato',
      rating: 3,
      detailedReview: [
        'overall? okay read. not life-changing but i didn\'t rage-quit so that\'s a win in this economy',
        'the happy loose vibe slaps: florence summer energy, wandering around, gelato as a personality trait. very main character on a gap year (minus the toxic productivity)',
        'loved that she was actually on a hunt, piecing clues together, snooping, connecting dots. gave the book a plot beyond "cute boy in a piazza" (there is still a cute boy. there is always a cute boy)',
        'big W: no clichéd long-lost father runs to embrace his long-lost daughter moment. he\'s giving antagonist / complicated / "sir why are you like this" and that kept things interesting instead of Hallmark-core',
        'some of the drama felt a little YA predictable if i\'m being honest but it didn\'t ruin the chill hunt energy',
        'perfect for when you want something light, a little messy, and set somewhere pretty, not for when you want to sob into your pillow (see: Tomorrow x3)',
        'verdict: soft recommend. borrow it, read in the sun, eat something cold, move on with your life no notes',
      ],
    },
  },
  {
    id: 'book-10',
    caption:
      'hooked me on game dev friendship chaos then yeeted the plot into a wormhole of sadness (10/10 would cry again)',
    type: 'books',
    tags: ['fiction', 'games', 'friendship'],
    date: '2026-05-09',
    metadata: {
      author: 'Gabrielle Zevin',
      book: 'Tomorrow, and Tomorrow, and Tomorrow',
      rating: 5,
      detailedReview: [
        'stayed up way too late because the craft and pacing are that good',
        'the early energy (building things together, the shorthand of creative partners) felt so real',
        'then the book does what it does and the emotional turn hits like a patch that breaks prod',
        'not a cozy read by the end but it earns the sadness; still thinking about it weeks later',
        'if you like sharp prose and games as metaphor for love, time, and failure, this one delivers',
      ],
    },
  },
  {
    id: 'book-1',
    caption: 'okay so this book made me quit my job and book a one-way ticket to spain (jk but the urge was REAL)',
    type: 'books',
    tags: ['philosophy', 'inspiration'],
    date: '2024-12-15',
    metadata: {
      author: 'Paulo Coelho',
      book: 'The Alchemist',
      rating: 5,
      detailedReview: [
        'the whole journey metaphor hits different when you\'re trying to figure out your own path',
        'made me realize that the obstacles we face are actually part of the journey, not detours',
        'the way it talks about following your "personal legend" is actually so motivating',
        'read this during a time when i was questioning all my life choices and it helped me see things differently',
        'the simplicity of the story but the depth of the message is what makes it special',
      ],
    },
  },
  {
    id: 'book-2',
    caption: 'this man just casually explained why humans are basically just advanced apes with anxiety and i\'m not okay',
    type: 'books',
    tags: ['history', 'philosophy'],
    date: '2024-12-10',
    metadata: {
      author: 'Yuval Noah Harari',
      book: 'Nexus',
      rating: 5,
      detailedReview: [
        'made me question everything i thought i knew about humans and society',
        'the way he connects past, present, and future is mind-blowing',
        'really made me think about how we\'re all connected in ways we don\'t even realize',
        'read this while studying AI and it gave me a whole new perspective on technology and humanity',
        'the historical context mixed with future predictions is actually wild',
      ],
    },
  },
  {
    id: 'book-3',
    caption: 'read this and immediately started analyzing everyone\'s power moves like i\'m in a game of thrones episode',
    type: 'books',
    tags: ['psychology', 'strategy'],
    date: '2024-12-05',
    metadata: {
      author: 'Robert Greene',
      book: '48 Laws of Power',
      rating: 5,
      detailedReview: [
        'some of these laws are actually wild but they make sense',
        'taught me to be more observant about power dynamics in everyday situations',
        'the historical examples are so interesting and make the concepts stick',
        'read this before starting my internship and it helped me navigate office politics better',
        'definitely made me more strategic in how i approach relationships and opportunities',
      ],
    },
  },
  {
    id: 'book-4',
    caption: 'manifesting my way to a six-figure salary and honestly? it\'s working (this book is dangerous)',
    type: 'books',
    tags: ['self-help', 'success'],
    date: '2024-11-28',
    metadata: {
      author: 'Napoleon Hill',
      book: 'Think and Grow Rich',
      rating: 5,
      detailedReview: [
        'the mindset shift this book gives you is unreal',
        'the concept of "definite purpose" changed how i set my goals',
        'made me realize that success is more about mindset than circumstances',
        'read this during a tough semester and it helped me reframe my challenges',
        'the principles are timeless and actually work if you apply them consistently',
      ],
    },
  },
  {
    id: 'book-5',
    caption: 'surgeons use checklists to not kill people, i use them to not forget my keys. we are not the same.',
    type: 'books',
    tags: ['productivity', 'healthcare'],
    date: '2024-11-20',
    metadata: {
      author: 'Atul Gawande',
      book: 'The Checklist Manifesto',
      rating: 4,
      detailedReview: [
        'the checklist thing is actually genius and so simple',
        'applied this to my coding projects and it reduced bugs significantly',
        'the medical examples show how checklists save lives, which is powerful',
        'made me realize that even experts need systems to avoid mistakes',
        'started using checklists for everything from morning routines to project planning',
      ],
    },
  },
  {
    id: 'book-6',
    caption: 'lily said "be a bawse" and i said "bet" - now i\'m out here living my main character energy',
    type: 'books',
    tags: ['motivation', 'self-help'],
    date: '2024-11-15',
    metadata: {
      author: 'Lily Singh',
      book: 'How to Be a Bawse',
      rating: 4,
      detailedReview: [
        'bawse energy is what we all need tbh, especially when things get tough',
        'the practical advice mixed with her personal stories is so relatable',
        'made me feel more confident about pursuing my goals despite obstacles',
        'read this when i was feeling imposter syndrome and it helped a lot',
        'the humor and realness make self-help actually enjoyable to read',
      ],
    },
  },
  {
    id: 'book-7',
    caption: 'manifested good vibes and my wifi started working better. coincidence? i think NOT',
    type: 'books',
    tags: ['wellness', 'self-help'],
    date: '2024-11-10',
    metadata: {
      author: 'Vex King',
      book: 'Good Vibes, Good Life',
      rating: 4,
      detailedReview: [
        'the whole good vibes only mentality but make it practical? yes please',
        'the law of attraction concepts are explained in a way that actually makes sense',
        'helped me develop better daily habits and mindset practices',
        'read this during a stressful period and it helped me manage my energy better',
        'the combination of spirituality and practicality is what makes it work',
      ],
    },
  },
  {
    id: 'book-8',
    caption: 'read this at 2am and now i\'m checking my locks three times. thanks for the trust issues tm logan',
    type: 'books',
    tags: ['thriller', 'mystery'],
    date: '2024-11-05',
    metadata: {
      author: 'T.M. Logan',
      book: 'Curfew',
      rating: 4,
      detailedReview: [
        'this one had me on edge the whole time, couldn\'t put it down',
        'the plot twists were actually unexpected which is rare these days',
        'read this in one sitting because i had to know what happened',
        'the way it builds tension is masterful and keeps you guessing',
        'perfect escape read when you need something that completely takes over your brain',
      ],
    },
  },
  {
    id: 'book-9',
    caption: 'plot twist: the wrong daughter was me all along questioning my entire existence after this book',
    type: 'books',
    tags: ['thriller', 'mystery'],
    date: '2024-10-28',
    metadata: {
      author: 'Dandy Smith',
      book: 'The Wrong Daughter',
      rating: 4,
      detailedReview: [
        'the plot twists were actually unexpected which is rare these days',
        'the psychological depth made it more than just a thriller',
        'read this during a weekend and couldn\'t stop thinking about it',
        'the character development is really well done',
        'kept me guessing until the very end which is exactly what i want from a mystery',
      ],
    },
  },
];

export const cinemaPosts: PersonalPost[] = [
  {
    id: 'cinema-1',
    caption: 'my absolute favorite and the best show ever, no cap',
    type: 'cinema',
    tags: ['tv-show', 'comedy'],
    metadata: {
      show: 'The Big Bang Theory',
      detailedReview: [
        'the chemistry between the cast is actually insane, especially sheldon and penny',
        'watched this during college and it made me feel less alone as a nerd',
        'the way they make science and pop culture jokes is genius',
        'binge-watched the entire series multiple times and it never gets old',
        'this show literally shaped my sense of humor and how i approach friendships',
      ],
    },
  },
  {
    id: 'cinema-2',
    caption: 'obsessed with grant gustin fr, he\'s the best flash',
    type: 'cinema',
    tags: ['tv-show', 'superhero'],
    metadata: {
      show: 'The Flash',
      detailedReview: [
        'grant gustin as barry allen is actually perfect casting',
        'the way they handle time travel and multiverse stuff is so cool',
        'watched this religiously every week when it was airing',
        'the emotional moments hit different, especially with iris',
        'the cgi and action sequences are actually really good for a tv show',
      ],
    },
  },
  {
    id: 'cinema-3',
    caption: 'loki is my most favorite marvel show, tom hiddleston is everything',
    type: 'cinema',
    tags: ['tv-show', 'marvel'],
    metadata: {
      show: 'Loki',
      detailedReview: [
        'tom hiddleston as loki is actually perfect, no one else could do it',
        'the time variance authority concept is so interesting and well-executed',
        'sylvie and loki\'s dynamic is chef\'s kiss',
        'the multiverse stuff in this show is way better than the movies',
        'watched both seasons multiple times and still find new details',
      ],
    },
  },
  {
    id: 'cinema-5',
    caption: 'andrew garfield\'s spiderman is the best, no debate',
    type: 'cinema',
    tags: ['movie', 'superhero'],
    metadata: {
      movie: 'The Amazing Spider-Man',
      detailedReview: [
        'andrew garfield is actually the perfect peter parker, the awkwardness is so real',
        'the chemistry with emma stone as gwen is unmatched',
        'the swinging scenes are the best out of all the spiderman movies',
        'rewatched this so many times and it never gets old',
        'the emotional depth and character development is way better than the others',
      ],
    },
  },
  {
    id: 'cinema-9',
    caption: 'batman rises is actually the best batman movie, christian bale is unmatched',
    type: 'cinema',
    tags: ['movie', 'dc'],
    metadata: {
      movie: 'The Dark Knight Rises',
      detailedReview: [
        'christian bale is the best batman, way better than ben affleck or robert pattinson',
        'the way nolan handles the conclusion of the trilogy is perfect',
        'bane is actually a terrifying villain, tom hardy killed it',
        'rewatched this so many times and the ending still hits',
        'the way they show bruce\'s journey from broken to hero again is so well done',
      ],
    },
  },
  {
    id: 'cinema-10',
    caption: 'star wars is actually iconic, the original trilogy hits different',
    type: 'cinema',
    tags: ['movie', 'sci-fi'],
    metadata: {
      movie: 'Star Wars',
      detailedReview: [
        'the original trilogy is actually perfect, nothing compares',
        'the way george lucas created this universe is actually genius',
        'rewatched the original trilogy so many times and it never gets old',
        'the prequels are actually better than people say, especially revenge of the sith',
        'the mandalorian is actually the best star wars content since the originals',
      ],
    },
  },
];
