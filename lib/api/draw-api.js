var Service = require('api-service');

var apiService = new Service('http://localhost:8000');

apiService.add('challenge.local.load', {
    method: 'get',
    route: '/challenge/local/:file',
    params: [ 'file' ]
});

apiService.add('challenge.local.save', {
    method: 'post',
    route: '/challenge/local',
    params: ['filename', 'content']
});

apiService.add('progress.load', {
    method: 'get',
    route: '/progress'
});

apiService.add('progress.save', {
    method: 'post',
    route: '/progress/:progress'
});

module.exports = apiService;
