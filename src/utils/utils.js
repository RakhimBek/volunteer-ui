const Utils = {
    path: function (relativePath) {
        // 'https://raimbek-rakhimbekov.ru:8080/zz/test-api/'.concat(relativePath);
        return window.location.origin + ':8080/zz/test-api/'.concat(relativePath);
    }
};

export default Utils;