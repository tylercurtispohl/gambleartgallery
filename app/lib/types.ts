export type SanityPainting = {
  _id: string;
  category: SanityRef;
  image: SanityImage;
  isSold: boolean;
  name: string;
  price: number;
  size?: string;
  sortOrder: number;
};

export type SanityCategory = {
  _id: string;
  name: string;
};

export type SanityRef = {
  _ref: string;
};

export type SanityImage = {
  asset: SanityRef;
};

export type SanityAboutContent = {
  bio: string;
  image: SanityImage;
};

export type SanityEvent = {
  _id: string;
  date: string;
  description: string;
  link: string;
  location: string;
  name: string;
};
