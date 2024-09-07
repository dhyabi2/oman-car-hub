const API_BASE_URL = 'https://oman-car-hub.replit.app';

export const trackReferralWithIP = async (referralCode) => {
  try {
    // Fetch the public IP
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Generate source key
    const response = await fetch(`${API_BASE_URL}/api/generate-source-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate source key');
    }

    const data = await response.json();
    const sourceKey = data.sourceKey;

    // Track referral
    const trackResponse = await fetch(`${API_BASE_URL}/api/track-referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referralKey: referralCode, sourceKey }),
    });

    if (!trackResponse.ok) {
      throw new Error('Failed to track referral');
    }

    console.log('Referral tracked successfully');
  } catch (error) {
    console.error('Error tracking referral:', error);
  }
};