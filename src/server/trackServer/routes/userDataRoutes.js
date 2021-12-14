const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const UserData = mongoose.model('UserData');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    const tracks = await UserData.find({userId: req.user._id});
    res.send(tracks);
});

router.post('/updateData', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        status, 
        phone,
        locationStartTime, 
        locationStartLat, 
        locationStartLong, 
        locationEndTime, 
        locationEndLat, 
        locationEndLong,
        balance
    } = req.body;
    try{
        UserData.updateOne(
            {
                "userId": req.body.id
            },
            {
                $set:{
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "status": status,
                    "phone": phone,
                    "locationStartTime": locationStartTime, 
                    "locationStartLat": locationStartLat, 
                    "locationStartLong": locationStartLong, 
                    "locationEndTime": locationEndTime, 
                    "locationEndLat": locationEndLat, 
                    "locationEndLong": locationEndLong,
                    "balance": balance
                }
            }, function(err) {
                if(err) return console.log("Error updating: " + err);
            }
        );
        return res.send('Done!!');
    }catch(err){
        res.status(422).send({error:err.message});
    }
    res.send('Not found');
})

router.post('/tracks', async(req, res) => {
    const {
        firstName,
        lastName,
        email,
        status,
        phone,
        cycleNum,
        locationStartTime, 
        locationStartLat, 
        locationStartLong,
        locationEndTime,
        locationEndLat,
        locationEndLong,
        balance} = req.body;
        console.log(`${status}`);
    if(!email || !cycleNum || !locationStartTime || !locationStartLat || !locationStartLong || !locationEndTime || !locationEndLat || !locationEndLong){
        return res
        .status(422)
        .send({error: 'Something went wrong!'});
    }

    try{
        const track = new UserData({userId: req.user._id, firstName,
            lastName, status, phone, email, cycleNum, locationStartTime, locationStartLat, locationStartLong, locationEndTime, locationEndLat, locationEndLong, balance});
        await track.save();
        res.send(track);
    }catch(err){
        res.status(422).send({error: err.message});
    }
})

module.exports = router;