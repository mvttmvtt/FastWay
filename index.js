const express = require('express');
const app = express();
const User = require('./UserSchema');
const MenuItem = require('./MenuItemSchema.js');
const Chain = require('./ChainSchema.js');
const Location = require('./LocationSchema.js');
const FoodType = require('./FoodTypeSchema.js')

app.use(express.json());
const cors = require ('cors');
app.use(cors());
app.listen(9000,()=>{
    console.log("Server started at $(9000)")
})

const mongoose = require('mongoose');

const mongoString = "mongodb+srv://rbgunner86:ualbanyGunner2.5@cluster0.zmaqxnh.mongodb.net/prototype"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error',(error)=>console.log(error))

database.once('connected',()=>console.log('Database Connected'))

//post User
app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.f_name} ${req.body.l_name} ${req.body.password}`)
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//post menuItem
app.post('/createMenuItem',async (req,res)=>{
    try { 
            const menuItem = new MenuItem(req.body);
            menuItem.save()
            console.log(`Menu Item Created created! ${menuItem}`)
            res.send(menuItem)
    }
    catch(error){
        res.status(500).send(error)
    }
})

//post Food type
app.post('/createFoodType', async (req, res) => {
    try {
        const foodType = new FoodType(req.body);
        await foodType.save()
        console.log(`Food Type created! ${foodType}`)
        res.send(foodType)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//get menuItems
app.get('/getMenuItems',async(req,res)=>{
    try {
        const itemList = await MenuItem.find({}, {foodName:1, foodCost:1, calories:1, description:1, chain_id: 1, foodType_id:1});
        res.send(itemList)
    }
    catch (error) {
        res.status(500).send(error)
    }
}) 

//get foodType
app.get('/getFoodType',async(req,res)=>{
    try {
        const typeList = await FoodType.find({}, {foodType:1});
        res.send(typeList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//post chain
app.post('/createChain', async (req, res) => {
    try {
            const chain = new Chain(req.body);
            chain.save()
            console.log(`Chain created! ${chain}`)
            res.send(chain)
    }
    catch (error){
        res.status(500).send(error)
    }
})

//get chains
app.get('/getChains',async (req,res)=>{
    try {
        const chainList = await Chain.find({}, {chain_name:1});
        res.send(chainList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//post location
app.post('/createLocation', async (req, res) => {
    try {
            const location = new Location(req.body);
            location.save()
            console.log(`Location created! ${location}`)
            res.send(location)
    }
    catch (error){
        res.status(500).send(error)
    }
})

//get locations
app.get('/getLocations', async (req, res) => {
    try {
        const locations = await Locations.find({}, {address: 1, street: 1, city: 1, state: 1});
        res.send(locations)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//get User
app.get('/getUser', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    console.log(`SERVER: LOGIN USER REQ BODY: ${req.query.username} ${req.query.password}`)
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//get Users
app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {f_name:1, l_name:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getChainName', async (req, res) => {
    const info = req.query.chain_id
    //console.log(`Info: ${info}`)
    try{
        const chain = await Chain.findOne({_id: info})
        //console.log(`Team: ${chain}`)
        //console.log(chain)
        res.send(chain.chain_name)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getChainMenu', async (req, res) => {
    const info = req.query.chain_id
    try{
        const items = await MenuItem.find({chain_id: info})
        const responseDetails = [];
        for (const item of items) {
            const foodType = await FoodType.findById(item.foodType_id)
            responseDetails.push({
              id: item._id,
              name: item.foodName,
              cost: item.foodCost,
              calories: item.calories,
              description: item.description,
              foodType_details: foodType
            })
         }
         res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getChainLocations', async (req, res) => {
    const info = req.query.chain_id
    try{
        const locations = await Location.find({chain_id: info})
        const responseDetails = [];
        for (const location of locations) {
            responseDetails.push({
              id: location._id,
              address: location.address,
              street: location.street,
              city: location.city,
              state: location.state,
              zipCode: location.zipCode
            })
         }
         res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
})