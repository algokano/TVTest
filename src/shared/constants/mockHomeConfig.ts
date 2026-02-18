import type { HomeScreenConfig } from '@shared/types/config';

export const mockHomeConfig: HomeScreenConfig = {
  sections: [
    {
      id: 'most-trending',
      order: 0,
      type: 'regular',
      title: 'Most Trending',
      items: [
        {
          id: 'series-1',
          title: 'Alpha Mate Who Cried Wolf',
          thumbnailUrl: 'https://picsum.photos/seed/alpha1/300/450',
          posterUrl: 'https://picsum.photos/seed/alpha1h/600/900',
          videoId: 'video-1',
          badge: 'top',
          episodeCount: 63,
          description:
            "When a wolf brutally kills Astrid's mother, her peaceful life falls apart. Her loving father becomes abusive, blaming her for her mother's death and the miserable life they now have. She carries this guilt everywhere until she meets Ryker, who seems to understand her more than she does herself. He claims to be her mate, and Astrid feels a strange connection.",
        },
        {
          id: 'series-2',
          title: 'Love Captive to the Mafia Boss',
          thumbnailUrl: 'https://picsum.photos/seed/mafia2/300/450',
          posterUrl: 'https://picsum.photos/seed/mafia2h/600/900',
          videoId: 'video-2',
          badge: 'top',
          episodeCount: 45,
          description:
            'Kidnapped on the eve of her wedding, Elena finds herself held captive by Dante Moretti — the most feared mafia boss in the city. As she plots her escape, she discovers dark secrets about her fiancé that make her question everything she thought she knew about love and loyalty.',
        },
        {
          id: 'series-3',
          title: "Alpha's Mate Who Cried Wolf",
          thumbnailUrl: 'https://picsum.photos/seed/alpha3/300/450',
          posterUrl: 'https://picsum.photos/seed/alpha3h/600/900',
          videoId: 'video-3',
          episodeCount: 58,
          description:
            'After being falsely accused and cast out of her pack, Lira survives alone in the wilderness. When she crosses into forbidden territory, the ruthless Alpha King captures her. But fate has other plans — she is his destined mate, and he will stop at nothing to claim her.',
        },
        {
          id: 'series-4',
          title: "Alpha King's Hated Princess",
          thumbnailUrl: 'https://picsum.photos/seed/king4/300/450',
          posterUrl: 'https://picsum.photos/seed/king4h/600/900',
          videoId: 'video-4',
          episodeCount: 72,
          description:
            'Princess Seraphina is forced into marriage with Alpha King Caelan, a ruler who despises her kingdom. Trapped in a castle of enemies, she must navigate court politics, hidden alliances, and her growing feelings for the man who swore to destroy everything she loves.',
        },
        {
          id: 'series-5',
          title: 'Spark Me Tenderly',
          thumbnailUrl: 'https://picsum.photos/seed/spark5/300/450',
          posterUrl: 'https://picsum.photos/seed/spark5h/600/900',
          videoId: 'video-5',
          episodeCount: 36,
          description:
            'After a chance encounter at a rain-soaked bus stop, aspiring chef Mina and cold-hearted CEO Jae-won keep crossing paths. He hides behind walls of ice, but her warmth is melting every barrier. When his past catches up, they must decide if love is worth the fight.',
        },
        {
          id: 'series-6',
          title: 'Milan in April',
          thumbnailUrl: 'https://picsum.photos/seed/milan6/300/450',
          posterUrl: 'https://picsum.photos/seed/milan6h/600/900',
          videoId: 'video-1',
          badge: 'new',
          episodeCount: 24,
          description:
            'Fashion designer Clara lands her dream internship in Milan, only to discover her new boss is Marco — the man she had a passionate one-night stand with in Paris. As they work side by side during fashion week, old sparks reignite against the backdrop of Italian spring.',
        },
        {
          id: 'series-7',
          title: 'Night With My Vampire Mate',
          thumbnailUrl: 'https://picsum.photos/seed/vamp7/300/450',
          posterUrl: 'https://picsum.photos/seed/vamp7h/600/900',
          videoId: 'video-2',
          episodeCount: 51,
          description:
            'On her 21st birthday, Ivy discovers she is the last descendant of a bloodline that can end the vampire curse. When the enigmatic vampire lord Lucien appears, claiming she is his eternal mate, Ivy must choose between her human life and an immortal love.',
        },
      ],
    },
    {
      id: 'coming-soon',
      order: 1,
      type: 'coming_soon',
      title: 'Coming Soon',
      items: [
        {
          id: 'coming-1',
          title: 'Thorns of the Forgotten Heir',
          thumbnailUrl: 'https://picsum.photos/seed/thorn1/300/450',
          posterUrl: 'https://picsum.photos/seed/thorn1h/600/900',
          videoId: 'video-3',
          isComingSoon: true,
          episodeCount: 48,
          description:
            'Raised as an orphan, Rowan discovers he is the lost heir to a powerful dynasty. Thrust into a world of wealth, deception, and forbidden romance, he must uncover who destroyed his family before history repeats itself.',
        },
        {
          id: 'coming-2',
          title: 'Bound by the Blood Moon',
          thumbnailUrl: 'https://picsum.photos/seed/blood2/300/450',
          posterUrl: 'https://picsum.photos/seed/blood2h/600/900',
          videoId: 'video-4',
          isComingSoon: true,
          badge: 'new',
          episodeCount: 32,
          description:
            'Every century, the Blood Moon rises and binds two souls together for eternity. This time, it chose a werewolf hunter and the Alpha she was sent to kill. Their forbidden bond will either save both their kinds or destroy them.',
        },
      ],
    },
  ],
};
