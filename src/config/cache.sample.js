let config;

if (process.env.NODE_ENV === 'development') {
    config = {
        host: '',
        port: 6379
    };
} else {
    config = {
        host: '',
        port: 6379
    };
}

export default config;
