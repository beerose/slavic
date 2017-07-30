import { channel } from './socket';

export function onHeroChosen(heroKind) {
  channel.push('player:hero_init', { kind: heroKind });
}

