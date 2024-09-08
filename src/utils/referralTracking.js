// Latest modification: Added comment line for latest modification

const API_BASE_URL = 'https://oman-car-hub.replit.app';

export const trackReferralWithIP = async (referralCode) => {
  try {
    // Fetch the public IP
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Generate source key and track referral
    const response = await fetch(`${API_BASE_URL}/api/generate-source-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip, referralKey: referralCode }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate source key and track referral');
    }

    console.log('Referral tracked successfully');
  } catch (error) {
    console.error('Error tracking referral:', error);
  }
};