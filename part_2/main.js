const http = require("node:http");
const fs = require("node:fs");

// Post user
const server = http.createServer((req, res) => {

    if (req.url === "/user" && req.method === "POST")
    {
        let body = "";

        req.on("data", (chunk) => {body += chunk;});

        req.on("end", () => {

            const newUser = JSON.parse(body);

            const data = fs.readFileSync("users.json", "utf8");
            const users = JSON.parse(data);

            const existUser = users.find((user) => user.email === newUser.email);

            if (existUser)
            {
                res.writeHead(400);
                return res.end(JSON.stringify({message: "Email already exists"}));
            }

            users.push(newUser);

            fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

            res.writeHead(201, {"Content-Type": "application/json"});

            return res.end(JSON.stringify({message: "User Added Successfully"}));

        });

        return;
    }

    // Get users
    if (req.url === "/user" && req.method === "GET")
    {
        const data = fs.readFileSync("users.json", "utf8");

        res.writeHead(200, {"Content-Type": "application/json"});

        return res.end(data);
    }

    // Get user by id
    if (req.url.startsWith("/user/") && req.method === "GET")
    {
        const id = Number(req.url.split("/")[2]);

        const data = fs.readFileSync("users.json", "utf8");
        const users = JSON.parse(data);

        const user = users.find((user) => user.id === id);

        if (!user)
        {
            res.writeHead(404);
            return res.end(JSON.stringify({message: "User not found"}));
        }

        res.writeHead(200, {"Content-Type": "application/json"});

        return res.end(JSON.stringify(user));
    }

    // Delete user
    if (req.url.startsWith("/user/") && req.method === "DELETE")
    {
        const id = Number(req.url.split("/")[2]);

        const data = fs.readFileSync("users.json", "utf8");
        const users = JSON.parse(data);

        const user = users.find((user) => user.id === id);

        if (!user)
        {
            res.writeHead(404);
            return res.end(JSON.stringify({message: "User ID not found"}));
        }

        const newUsers = users.filter((user) => user.id !== id);

        fs.writeFileSync("users.json", JSON.stringify(newUsers, null, 4));

        res.writeHead(200, {"Content-Type": "application/json"});

        return res.end(JSON.stringify({message: "User deleted successfully"}));
    }

    // Patch user
    if (req.url.startsWith("/user/") && req.method === "PATCH")
    {
        const id = Number(req.url.split("/")[2]);

        let body = "";

        req.on("data", (chunk) => {body += chunk;});

        req.on("end", () => {

            const updatedData = JSON.parse(body);

            const data = fs.readFileSync("users.json", "utf8");
            const users = JSON.parse(data);

            const user = users.find((user) => user.id === id);

            if (!user)
            {
                res.writeHead(404);
                return res.end(JSON.stringify({message: "User ID not found"}));
            }

            if (updatedData.name) user.name = updatedData.name;
            if (updatedData.age) user.age = updatedData.age;
            if (updatedData.email) user.email = updatedData.email;

            fs.writeFileSync("users.json", JSON.stringify(users, null, 4));

            res.writeHead(200, {"Content-Type": "application/json"});

            return res.end(JSON.stringify({message: "User updated successfully"}));

        });

        return;
    }

    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "Route not found"}));

});

server.listen(3000, () => {console.log("Server Running On Port 3000");});