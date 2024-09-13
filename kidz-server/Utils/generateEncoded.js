
exports.encodeKey = (key) => {
    return Buffer.from(key).toString('base64');
}

exports.decodeKey = (key) => {
    return Buffer.from(key, 'base64').toString('ascii');
}