import { v4 as uuidv4 } from 'uuid';

export const getReferralKey = () => {
  let referralKey = localStorage.getItem('referralKey');
  if (!referralKey) {
    referralKey = uuidv4();
    localStorage.setItem('referralKey', referralKey);
  }
  return referralKey;
};

export const addReferralToUrl = (url) => {
  const referralKey = getReferralKey();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ref=${referralKey}`;
};