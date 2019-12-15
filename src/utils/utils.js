const Utils = {
    path: function (relativePath) {
        console.log('window.location.origin:  ' + window.location.origin + ' full path to back:  ' + relativePath);
        return 'https://api-chatty.herokuapp.com/ggg/'.concat(relativePath);
    }
};

export default Utils;