import Service from 'api-service';

"use strict";
var apiService = new Service('http://localhost:8000');

apiService.add('challenge.save', {
    method : 'post',
    route  : '/challenge/local/:filename',
    params : ['filename', 'description', 'code', 'image']
});

apiService.add('challenge.saveWallpaper', {
    method : 'post',
    route  : '/challenge/local/wallpaper/:filename',
    params : ['filename', 'image_1024', 'image_4_3', 'image_16_9']
});

apiService.add('challenge.load', {
    method : 'get',
    route  : '/challenge/web'
});

apiService.add('challenge.share', {
    method : 'post',
    route  : '/challenge/web/:filename',
    params : ['filename', 'description', 'code', 'image']
});

apiService.add('challenge.localLoad', {
    method : 'get',
    route  : '/challenge/local/:path',
    params : ['filename']
});

apiService.add('progress.load', {
    method : 'get',
    route  : '/progress'
});

apiService.add('progress.save', {
    method : 'post',
    route  : '/progress/:world/:challenge'
});

apiService.add('linesOfCode.increment', {
    method : 'post',
    route  : '/lines-of-code',
    params : ['newLines']
});

apiService.add('server.shutdown', {
    method : 'post',
    route  : '/shutdown'
});

apiService.add('sound.play', {
    method : 'post',
    route  : '/play_sound/:filename',
    params : ['filename']
});

apiService.add('challenge.browseMore', {
    method : 'post',
    route  : '/browsemore'
});

export default apiService;
