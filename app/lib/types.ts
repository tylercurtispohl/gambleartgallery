export type SanityPainting = {
  name: string;
  _updateAt: Date;
  height: number;
  image: SanityImage;
  price: number;
  sortOrder: number;
  width: number;
  _id: string;
  category: {
    _ref: string;
  };
  _createdAt: Date;
  isSold: boolean;
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
