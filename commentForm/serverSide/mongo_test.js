const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
 
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
let dbClient;

mongoClient.connect(function(err, client){
    if (err) console.log(err);
    
    dbClient = client;
    const db = client.db("usersdb");
    const collection = db.collection("users");

    collection.findOne({user_id: "test"}, (err, doc) => {
        if (err) console.log(err);
        console.log(doc);
    });

    collection.insertOne({a:'abc123'}, (err, doc) => {
        if (err) console.log(err);
        console.log(doc);
    });
/*    collection.updateMany(
        {name: "Tom"},              // критерий фильтрации
        { $set: {user_id: "test"}},     // параметр обновления
        function(err, result){
                  
            console.log(result);
            client.close();
        }
    ); */
});

console.log(new objectId(1));
 
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

//node mongo_test.js