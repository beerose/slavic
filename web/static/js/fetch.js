import { channel } from './socket';


export function playerChooseHero(hero) {
  channel.push('player:hero_init', { hero: hero });
}

