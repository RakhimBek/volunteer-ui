const Utils = {
    path: function (relativePath) {
        console.log('window.location.origin:  ' + window.location.origin + ' full path to back:  ' + 'https://raimbek-rakhimbekov.ru:8080/test-api/'.concat(relativePath));
        return 'https://raimbek-rakhimbekov.ru:8080/test-api/'.concat(relativePath);
    }
};

export default Utils;