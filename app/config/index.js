const config = {
    app: {
        port: process.env.PORT ||8085,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://Ngoctruong29:712001@cluster0.bragn.mongodb.net/Truong?retryWrites=true&w=majority"
        }
};
module.exports= config;