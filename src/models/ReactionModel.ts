export interface Reaction {
  userId: string;
  reaction: Emoji['id'];
}

export interface Emoji {
  id: string;
  symbol: string;
}
