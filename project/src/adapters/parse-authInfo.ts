import { userAdapter, userType } from '../types/user';

export const parseAuthInfo = (authInfo: userAdapter): userType  => {
  const {
    avatar_url: avatarUrl,
    email,
    id,
    is_pro: isPro,
    name,
    token,
  } = authInfo;

  return ({
    avatarUrl,
    email,
    id,
    isPro,
    name,
    token,
  });
};
