"use strict";
var app = require('../app');

app.controller('PromoPopupController', function ($scope, $rootScope) {
    var cfg =  {
        'none': {
            'title': 'Do you want to make more ?',
            'text': 'With the Kano Kit you\'ll be able to make Minecraft, Pong and Music!',
            'body': 'video',
            'link': {
                'text': 'Learn more',
                'url': 'http://www.kano.me/kit?utm_source=Summer%20Camp%20Promo&utm_medium=banner&utm_campaign=Summer%20Camp'
            }
        },
        'pi-1': {
            'title': 'Make your Kano work faster!',
            'text': 'You can upgrade to the New Kano with a discounted price.',
            'body': 'upgrade-kit',
            'link': {
                'text': 'Learn more',
                'url': 'http://uk.kano.me/collections/frontpage/products/powerup?utm_source=Summer%20Camp%20Promo&utm_medium=banner&utm_campaign=Summer%20Camp'
            }
        },
        'pi-2': {
            'title': 'Play more and faster!',
            'text': 'Explore new games that are hiding in your Kano.',
            'body': 'update',
            'link': {
                'text': 'Here\'s how',
                'url': 'https://s3-eu-west-1.amazonaws.com/kano-email-assets/campaign-assets/updater-printout.pdf'
            }
        }
    },
    keyMapping = {
        'RPI/2/B': 'pi-2',
        'RPI/B'  : 'pi-1',
        'RPI/B+' : 'pi-1',
        'RPI/A'  : 'pi-1',
        'RPI/A+' : 'pi-1'
    },
    init,
    loadedProfile, 
    loadedWorld;

    $scope.isPopupOpen = false; //this drives the opening of the promo popup


    /**
     * Initialises the promo popup
     */
    init = function () {
        var lsItemName = 'promoPopupOpen',
            promoPopupOpen = localStorage.getItem(lsItemName),
            day = new Date(),
            ts = day.getYear() + "-" +  day.getMonth() + "-" + day.getDate(),
            profile = ($rootScope.user) ?  $rootScope.user.profile : undefined,
            pi_v,
            cfgKey = "none",  //the user doesn't have a kit;
            worldId,
            promoIndex,
            challengeIndex;
        
        loadedWorld = !!$rootScope.selectedWorld;

        if (loadedWorld && loadedProfile) {
            worldId = $rootScope.selectedWorld.id,
            promoIndex = $rootScope.selectedWorld.sales_popup_after,
            challengeIndex = $rootScope.progress.groups[worldId] ? $rootScope.progress.groups[worldId].challengeNo : 1;

            if (profile) {
                pi_v = (profile.kano_kit) ? profile.kano_kit.pi_v : undefined;
                cfgKey = (keyMapping[pi_v]) ? keyMapping[pi_v] : cfgKey;
            }
            $scope.cfg = cfg[cfgKey];

            // it opens only once a day
            if (promoPopupOpen !== ts && challengeIndex > promoIndex) {
                $scope.isPopupOpen = true;
                localStorage.setItem(lsItemName, ts);
            }
        }
    };

    $rootScope.$on('user-profile-loaded', function () {
        loadedProfile = true;
        init();
    });
    
    $rootScope.$watch('selectedWorld', function  () {
          if (!loadedWorld && $rootScope.selectedWorld) {
            loadedWorld = true;
            init();
        }
    });


    setTimeout(function () {
        //We've waited long enough!
        if (!$rootScope.user) {
            loadedProfile = true;
            init();
        }
    }, 1000);
});
