import {Knex} from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('trivia').del();

  // Inserts seed entries
  await knex('trivia').insert([
    {
      id: '6LnDGkTr4gVh',
      author: 'toffitee',
      category: 'Heikki',
      content: 'Heikki on likanen rotta',
    },
    {
      id: 'XTcnCieRWAaX',
      author: 'aitogee',
      category: 'Heikki',
      content: 'Se haisee..',
    },
    {
      id: '4pPyRYAeGtG3',
      author: 'archive',
      category: 'Heikki',
      content: '0,5 piuhalle bless !',
    },
    {
      id: 'GGCGP9WMVRUX',
      author: 'archive',
      category: 'Heikki',
      content: 'Pieni pippeli',
    },
    {
      id: 'dDPQpTeLPQDU',
      author: 'archive',
      category: 'Heikki',
      content: 'Vuoden vegaani',
    },
    {
      id: 'EkYwP3NMhGCh',
      author: 'archive',
      category: 'Heikki',
      content: 'Kissamies 2.0',
    },
    {
      id: 'BC9i9FdBhdNh',
      author: 'archive',
      category: 'Heikki',
      content: 'Joulupukkiki on kateellinen sen parralle',
    },
    {
      id: 'bLDQyGnyJEJH',
      author: 'archive',
      category: 'Heikki',
      content: 'Vittuku ei oo massii..',
    },
    {
      id: 'fCbetXkTjmaA',
      author: 'tapppi',
      category: 'Heikki',
      content: 'MENNÄÄ ANTAA JES JES JES',
    },
    {
      id: 'RiHLhpM6p4Bn',
      author: 'tapppi',
      category: 'Heikki',
      content: 'Ei ei älä selkää, sattuu!!',
    },
    {
      id: 'hXtiffGKkK4g',
      author: 'snakkeboi',
      category: 'Heikki',
      content: 'Poketkaa sit ku on tilaa...',
    },
  ]);
}
