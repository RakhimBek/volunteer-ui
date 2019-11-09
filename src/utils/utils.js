const Utils = {
    path: function (relativePath) {
        console.log('full path to back:  ' + window.location.origin + ':8080/test-api/'.concat(relativePath));
//        return 'https://raimbek-rakhimbekov.ru:8080/zz/test-api/'.concat(relativePath);
        return window.location.origin + ':8080/test-api/'.concat(relativePath);
    }
};

export default Utils;