const Utils = {
    path: function (relativePath) {
        console.log('window.location.origin:  ' + window.location.origin + ' full path to back:  ' + relativePath);
        return 'https://volunteerapi.herokuapp.com/api/'.concat(relativePath);
    }
};

export default Utils;