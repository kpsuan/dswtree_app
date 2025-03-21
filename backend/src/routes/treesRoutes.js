import express from 'express';
import Tree from '../models/Tree.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, async (req, res) => {
    try {
        const {
            name,
            commonNames,
            type,
            description,
            image,
            toxicity,
            humidity,
            sunlight,
            location,
            water,
            fertilizerType,
            fertilizeEvery,
            temperature,
            resistanceZone,
          } = req.body;
        
        if (!name || !description || !image || !type ) {
            return res.status(400).json({ message: "Name, description, type, and image are required" });
        }

        //upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;

        //save to db 

        const newTree = await Tree.create({ 
            name,
            commonNames,
            type,
            description,
            image: imageUrl,
            toxicity,
            humidity,
            sunlight,
            location,
            water,
            fertilizerType,
            fertilizeEvery,
            temperature,
            resistanceZone,
            user: req.user._id,
        });

        await newTree.save();
        res.status(201).json(newTree);
        
    } catch (error) {
        console.error('Error creating new tree', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/', protectRoute, async (req, res) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;
        
        const trees = await Tree.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        //.populate('user', 'username profileImage')

        const totalTrees = await Tree.countDocuments();

        res.send({
            trees,
            currentPage: page,
            totalTrees,
            totalPages: Math.ceil(totalTrees / limit),
        });

    } catch (error) {
        console.error('Error fetching trees', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/:id', protectRoute, async (req, res) => {
    try {
        const tree = await Tree.findById(req.params.id);
        if (!tree) {
            return res.status(404).json({ message: 'Tree not found' });
        }

        if (tree.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        //delete image from cloudinary
        if(tree.image && tree.image.includes('cloudinary')){
            try {
                const publicId = tree.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.error('Error deleting image from cloudinary', error);
                
            }
        }

        await tree.deleteOne();
        res.json({ message: 'Tree deleted successfully!' });

    } catch (error) {
        console.error('Error deleting tree', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('user-trees', protectRoute, async (req, res) => {
    try {
        const trees = await Tree.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(trees);
    } catch (error) {
        console.error('Error fetching user trees', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router; 