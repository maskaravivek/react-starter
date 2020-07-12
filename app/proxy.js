exports.devProxy = {
    "/api": {
        target: "http://localhost:5000",
    }
};

exports.dockerProxy = {
    "/api": {
        target: "http://api:5000",
    },
    "/socket.io": {
        target: "http://api:5000",
        ws: true
    }
};