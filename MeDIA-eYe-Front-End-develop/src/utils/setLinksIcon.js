export function setLinksIcon(link) {
  if (link.includes('discord.com') || link.includes('discord.gg')) {
    return 'discord active';
  } else if (link.includes('twitter.com')) {
    return 'twitter active';
  } else if (link.includes('twitch.tv')) {
    return 'twitch active';
  } else if (link.includes('youtube.com')) {
    return 'youtube active';
  } else if (link.includes('instagram.com')) {
    return 'instagram active';
  } else if (link.includes('medium.com')) {
    return 'medium active';
  } else if (link.includes('facebook.com')) {
    return 'facebook active';
  } else if (link.includes('quora.com')) {
    return 'quora active';
  } else if (link.includes('tiktok.com')) {
    return 'tiktok active';
  } else if (link.includes('eventbrite.com')) {
    return 'event active';
  } else if (link.includes('media-eye.web.app/airdrop')) {
    return 'airdrop active';
  } else if (link.includes('media-eye.web.app/collection')) {
    return 'collection active';
  } else if (link.includes('t.me') || link.includes('telegram.me')) {
    return 'telegram active';
  } else if (link.length > 0) {
    return 'website active';
  } else {
    return 'website';
  }
}

export default setLinksIcon;
