const path = require("node:path");
const fs = require("node:fs");
const EventEmitter = require("node:events");
const os = require("node:os");
const zlib = require("node:zlib");

// Q1
console.log(__filename);
console.log(__dirname);
console.log("----------");



// Q2
console.log(path.basename(__filename));
console.log("----------");



// Q3
console.log(
    path.format({
        dir: "D:\\Route\\Week4",
        name: "index",
        ext: ".js",
    })
);
console.log("----------");



// Q4
console.log(path.extname(__filename));

console.log("----------");



// Q5
console.log(path.parse(__filename));
console.log("----------");



// Q6
console.log(path.isAbsolute(__filename));

console.log("----------");



// Q7
console.log(path.join(__dirname, "src", "components", "App.js"));
console.log("----------");



// Q8
console.log(path.resolve("./index.js"));
console.log("----------");



// Q9
console.log(path.join("/folder1", "folder2/file.txt"));
console.log("----------");



// Q10
fs.unlink("test.txt", (err) => 
    {
        if (err) 
        {
            console.log(err);
        }
        else
        {
            console.log("The file.txt is deleted.");
        }
    });

console.log("----------");



// Q11
fs.mkdirSync("folder");
console.log("Success");
console.log("----------");




// Q12
const event = new EventEmitter();
event.on("start", () => {
    console.log("Welcome event triggered!");
});
event.emit("start");

console.log("----------");




// Q13
const event2 = new EventEmitter();
event2.on("login", name => {
    console.log("User logged in : " + name);
});
event2.emit("login", "Ahmed");
console.log("----------");


// Q14
const x = fs.readFileSync("test.txt", "utf8");
console.log(x);
console.log("----------");



// Q15
fs.writeFile("async.txt", "Async save", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File saved successfully.");
    }
});

console.log("----------");



// Q16
console.log(fs.existsSync("Assignments/"));
console.log("----------");



// Q17
console.log("Platform: " + os.platform());
console.log("Arch: " + os.arch());
console.log("----------");



// Q18
const stream = fs.createReadStream("big.txt");
stream.on("data", (chunk) => {console.log(chunk);});

console.log("----------");



// Q19
const readStream = fs.createReadStream("source.txt");
const writeStream = fs.createWriteStream("dest.txt");
readStream.pipe(writeStream);
console.log("----------");


// Q20
const gzip = zlib.createGzip();
const readStream2 = fs.createReadStream("source.txt");
const writeStream2 = fs.createWriteStream("dest.txt.gz");
readStream2.pipe(gzip).pipe(writeStream2);
console.log("----------");

