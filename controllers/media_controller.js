const Media = require('../models/media');

const media_controller = {

    async create_media(req, res) {
        try {
            const { tmdb_id, type, name, poster_path, description } = req.body;

            const existing = await Media.findOne({ tmdb_id });
            if (existing) {
                return res.status(400).json({ error: 'Media already exists' });
            }

            const new_media = new Media({
                tmdb_id,
                type,
                name,
                poster_path,
                description
            });

            await new_media.save();
            res.status(201).json(new_media);

        } catch (error) {
            console.error('Error creating media:', error);
            res.status(500).json({ error: 'Failed to create media' });
        }
    },

    async delete_media(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Media.findByIdAndDelete(id);

            if (!deleted) return res.status(404).json({ error: 'Media not found' });
            res.status(200).json({ message: 'Media deleted' });

        } catch (error) {
            console.error('Error deleting media:', error);
            res.status(500).json({ error: 'Failed to delete media' });
        }
    },

    async update_media(req, res) {

        try {

            const { id } = req.params;
            const { type, name, poster_path, description } = req.body;

            const updated = await Media.findByIdAndUpdate(
                id,
                { type, name, poster_path, description },
                { new: true }
            );

            if (!updated) return res.status(404).json({ error: 'Media not found' });
            res.status(200).json(updated);

        } catch (error) {

            console.error('Error updating media:', error);
            res.status(500).json({ error: 'Failed to update media' });
        }
    },

    async get_all_media(req, res) {

        try {

            const media = await Media.find();
            res.status(200).json(media);

        } catch (error) {

            console.error('Error fetching media:', error);
            res.status(500).json({ error: 'Failed to fetch media' });
        }
    },

    async get_media_by_id(req, res) {

        try {
            const { id } = req.params;
            const media = await Media.findById(id);

            if (!media) return res.status(404).json({ error: 'Media not found' });
            res.status(200).json(media);

        } catch (error) {
            console.error('Error fetching media by ID:', error);
            res.status(500).json({ error: 'Failed to fetch media' });
        }
    }
};

module.exports = { media_controller };