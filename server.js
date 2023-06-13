var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
    import("node-fetch").then(({default: fetch}) => fetch(...args));
var bodyParser = require("body-parser");

const CLIENT_ID = "2ee1d51c0df64995be14";
const CLIENT_SECRET = "889e3dfc5142cf8cc381e6e6d4916f2e584e2110";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {

    
    req.query.code;
    
    
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
});

app.get("/editTask", async function (req, res) {

    
    req.query.owner;
    req.query.repo;
    req.query.issue_number;

    req.query.title;
    req.query.body;
    req.query.state;
    
    
    const request = "https://api.github.com/repos/" + req.query.owner + "/" + req.query.repo + "/issues/" + req.query.issue_number;

    await fetch(request, {
        method: "PATCH",
        headers: {
            "Authorization": req.get("Authorization"),
            'X-GitHub-Api-Version': '2022-11-28',
            "Accept": "application/json" 
        },
        body: JSON.stringify({
            title: req.query.title,
            body: req.query.body,
            state: req.query.state,
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((e) => {
        console.log("error: " + e);
    })
});

app.get("/getAllTasks", async function(req, res) {

    await fetch("https://api.github.com/issues?state=all", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
});

app.get("/getUserData", async function(req, res) {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
});

app.listen(4000, function () {
    console.log("COR server running on port 4000");
});