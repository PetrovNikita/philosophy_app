const schemas = require("./serverScripts/mongoose_Schemas.js");
console.log('Mongo Collections initialization.');

//Добавление текстов.
let texts = [
    {
        textName: 'The most main in person',
        textBody: '<div>What for you is the most important thing in other person?</div>',
    },
    {
        textName: 'Fight or not',
        textBody: '<span>What would you choose?</span>',
    },
    {
        textName: 'The most main thing in live',
        textBody: '<p>Happiness - the most important think in your live. What makes you happy?</p>',
    }
];
schemas.Text.find({}, (err, obj) => {
    if (err) console.log(err);

    if (obj.length > 0) console.log("Text collection don't need to initialize.")
    else {
        schemas.Text.insertMany(texts, (err) => console.log(err)); 
        console.log("Text collection initialized successfully.")
    }
});

let categories = [
    {
        categoryName: "The most main",
        textsNames: [
            'The most main in person',
            'The most main thing in live'
        ]
    },
    {
        categoryName: "Situations",
        textsNames: [
            'Fight or not'
        ]
    },
];

schemas.Category.find({}, (err, obj) => {
    if (err) console.log(err);

    if (obj.length > 0) {
        console.log("Category collection don't need to initialize.");
    }
    else {
        schemas.Category.insertMany(categories, (err) => console.log(err)); 
        console.log("Category collection initialized successfully.")
    }
}); 

console.log('initialization finish');