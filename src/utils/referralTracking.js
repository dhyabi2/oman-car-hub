const API_BASE_URL = 'https://oman-car-hub.replit.app';

export const trackReferralWithIP = async (referralKey) => {
  try {
    // Fetch the public IP
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Generate source key
    const sourceKeyResponse = await fetch(`${API_BASE_URL}/api/generate-source-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    });
    const sourceKeyData = await sourceKeyResponse.json();
    const sourceKey = sourceKeyData.sourceKey;

    // Check source key
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

    // Track referral
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

    console.log('Referral tracked successfully');
  } catch (error) {
    console.error('Error tracking referral:', error);
  }
};