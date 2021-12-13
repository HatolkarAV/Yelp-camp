const mongoose = require("mongoose");
const cities = require("./cities")
const { descriptors, places } = require("./seedHelpers")
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
})

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 30)
        const camp = new Campground({
            author: "618cbaae69b9493f14326fe8",
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorem sequi recusandae suscipit labore beatae rem distinctio alias laudantium, necessitatibus, excepturi nulla aut corporis harum assumenda est explicabo atque odit!",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmuopd8ki/image/upload/v1637499131/YelpCamp/gtb1j9gjelwbqxwdzbyd.jpg',
                    filename: 'YelpCamp/gtb1j9gjelwbqxwdzbyd'
                },
                {
                    url: 'https://res.cloudinary.com/dmuopd8ki/image/upload/v1637499131/YelpCamp/ovvulpheq1rybrsa66ot.jpg',
                    filename: 'YelpCamp/ovvulpheq1rybrsa66ot'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

