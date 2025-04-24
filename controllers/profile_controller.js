const Profile = require('../models/profile');

const profile_controller = {

    async get_profiles(req, res) {

        const username = req.params.username;

        try {
            const profiles = await Profile.find({ username });
            res.status(200).json(profiles);

        } catch (error) {
            console.error('Error fetching profiles:', error);
            res.status(500).json({ error: 'Failed to fetch profiles' });
        }
    },

    async get_profile_by_id(req, res) {

        const profile_id = req.params.profile_id;

        try {
            const profile = await Profile.findOne({ profile_id: profile_id });
            res.status(200).json(profile);

        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ error: 'Failed to fetch profile' });
        }
    },

    async create_new_profile(req, res) {

        const username = req.params.username;

        try {

            const profiles = await Profile.find({ username });
            if (profiles.length >= 5) {
                return res.status(400).json({ error: 'Maximal number of profiles reached' });
            }

            const random_number = Math.floor(Math.random() * 10) + 1;
            const avatar = String(random_number).padStart(2, '0');

            const new_profile = new Profile({
                username: username,
                name: `Profile ${profiles.length + 1}`,
                avatar: avatar
            });

            await new_profile.save();

            const profiles_list = await Profile.find({ username });
            res.status(201).json(profiles_list);

        } catch (error) {
            console.error('Error creating profiles:', error);
            res.status(500).json({ error: 'Failed to create profile' });
        }

    },

    async change_profile_name(req, res) {

        const { profile_id, new_name } = req.body;

        try {

            const updatedProfile = await Profile.findOneAndUpdate({ profile_id: profile_id }, { name: new_name });
            res.status(200).json({ "message": "Profile sucessfuly updated" });

        } catch (error) {

            console.error('Error updating profile name:', error);
            res.status(500).json({ error: 'Failed to update profile name' });
        }
    }
};

module.exports = { profile_controller };