/* eslint-disable camelcase */

export type commentForAdapterType = {
  comment: string,
  date: number,
  id: number,
  rating: number,
  user: {
    avatar_url: string,
    id: number,
    is_pro: boolean,
    name: string,
  }
}

export type commentsForAdapterType = commentForAdapterType[];


export type commentType = {
  comment: string,
  date: number,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    idUser: number,
    isPro: boolean,
    name: string,
  }
}

export type commentsType = commentType[];
