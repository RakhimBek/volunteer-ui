const Utils = {
    path: function (relativePath) {
        console.log('window.location.origin:  ' + window.location.origin + ' full path to back:  ' + relativePath);
        return 'https://raimbek-rakhimbekov.ru:8080/ggg/'.concat(relativePath);
    }
};

export default Utils;