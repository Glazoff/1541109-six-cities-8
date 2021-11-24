import {commentForAdapterType, commentType} from '../types/comment';

export const parseComment = (commentParse: commentForAdapterType): commentType => {
  const {
    comment,
    date,
    id,
    rating,
    user: {
      avatar_url: avatarUrl ,
      id: idUser,
      is_pro: isPro,
      name,
    }} = commentParse;

  return ({
    comment,
    date,
    id,
    rating,
    user: {
      avatarUrl,
      idUser,
      isPro,
      name,
    }});
};
