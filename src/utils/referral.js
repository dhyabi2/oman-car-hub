// Latest modification: Added comment line for latest modification

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
    // First, check if the source key is valid
    const checkResponse = await fetch(`${API_BASE_URL}/api/check-source-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sourceKey }),
    });

    if (!checkResponse.ok) {
      throw new Error('Invalid source key');
    }

    // If the source key is valid, proceed with tracking the referral
    const trackResponse = await fetch(`${API_BASE_URL}/api/track-referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referralKey, sourceKey }),
    });

    if (!trackResponse.ok) {
      throw new Error('Failed to track referral');
    }
  } catch (error) {
    console.error('Error tracking referral:', error);
  }
};