import { v4 as uuidv4 } from 'uuid';

export const getReferralKey = () => {
  let referralKey = localStorage.getItem('referralKey');
  if (!referralKey) {
    referralKey = uuidv4();
    localStorage.setItem('referralKey', referralKey);
  }
  return referralKey;
};

export const getSourceKey = () => {
  let sourceKey = localStorage.getItem('sourceKey');
  if (!sourceKey) {
    sourceKey = uuidv4();
    localStorage.setItem('sourceKey', sourceKey);
  }
  return sourceKey;
};

export const addReferralToUrl = (url) => {
  const referralKey = getReferralKey();
  const sourceKey = getSourceKey();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ref=${referralKey}&src=${sourceKey}`;
};

export const trackReferral = async (referralKey, sourceKey) => {
  const API_BASE_URL = 'https://oman-car-hub.replit.app';
  try {
    const response = await fetch(`${API_BASE_URL}/api/track-referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referralKey, sourceKey }),
    });
    if (!response.ok) {
      throw new Error('Failed to track referral');
    }
  } catch (error) {
    console.error('Error tracking referral:', error);
  }
};