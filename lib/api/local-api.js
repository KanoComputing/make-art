var Service = require('api-service');

var apiService = new Service('http://localhost:8000');

apiService.add('challenge.local.save', {
    method : 'post',
    route  : '/challenge/local/:filename',
    params : [ 'filename', 'description', 'code', 'image' ]
});

apiService.add('challenge.local.saveWallpaper', {
    method : 'post',
    route  : '/challenge/local/wallpaper/:filename',
    params : [ 'filename', 'image_medium', 'image_4_3', 'image_16_9' ]
});

apiService.add('challenge.web.load', {
    method : 'get',
    route  : '/challenge/web'
});

apiService.add('challenge.web.share', {
    method : 'post',
    route  : '/challenge/web/:filename',
    params : [ 'filename', 'description', 'code', 'image' ]
});

apiService.add('progress.load', {
    method : 'get',
    route  : '/progress'
});

apiService.add('progress.save', {
    method : 'post',
    route  : '/progress/:progress'
});

module.exports = apiService;
