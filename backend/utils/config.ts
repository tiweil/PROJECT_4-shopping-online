
class Config { 
    public port = 3006; 
    public mongodbConnectionString = "mongodb://127.0.0.1:27017/project4";
}

const config = new Config();

export default config;