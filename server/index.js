const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3001
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello App")
})
mongoose.connect('mongodb://127.0.0.1:27017/myCat');
const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'My Meow' });
// kitty.save().then(() => console.log('meow'));

async function addRanuOnce() {
    const existingCat = await Cat.findOne({ name: "The Jerry" });
    if (!existingCat) {
        const kitty = new Cat({ name: "The Jerry" });
        await kitty.save();
        console.log("Jerry added!");
    } else {
        console.log("Jerry already exists!");
    }
}
addRanuOnce();

// Add a cat
app.post("/cat", async (req, res) => {
    const existingCat = await Cat.findOne({ name: req.body.name });
    if (existingCat) {
        return res.send("Cat already exists!");
    }

    const kitty = new Cat({ name: req.body.name });
    await kitty.save();
    res.send("Cat added!");
});
// Let's add a cat here
// app.post("/cat", async (req,res)=>{
//     const kitty = new Cat({ name : req.body.name});
//     await kitty.save();
//     res.send("Cat added")
// })
// Let's Get Data
app.get("/cat", async (req,res) =>{
    const cats = await Cat.find();
    res.json(cats)
})


// Get a cat by ID
app.get("/cat/:id", async (req, res) => {
    const cat = await Cat.findById(req.params.id);
    if (!cat) return res.status(404).send("Cat not found");
    res.json(cat);
});

//  - Update a cat's name by ID
app.put("/cat/:id", async (req, res) => {
    const updatedCat = await Cat.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, { new: true });
    if (!updatedCat) return res.status(404).send("Cat not found");
    res.json({ message: "Cat updated!", cat: updatedCat });
});

// - Delete a cat by ID
app.delete("/cat/:id", async (req, res) => {
    const deletedCat = await Cat.findByIdAndDelete(req.params.id);
    if (!deletedCat) return res.status(404).send("Cat not found");
    res.json({ message: "Cat deleted!", cat: deletedCat });
});


app.listen(PORT,()=>{
    console.log("Okay Now")
})