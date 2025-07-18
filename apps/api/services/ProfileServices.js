const profileModel  = require('../models/ProfileModel');

exports.getProfile = async () => {
  try {
    const profile = await profileModel.find()

    if (!profile) {
      throw new Error('Profile not found');
    }

    return profile;
  } catch (error) {
    throw new Error(`Error fetching profile: ${error.message}`);
  }
}