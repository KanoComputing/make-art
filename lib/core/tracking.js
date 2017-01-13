/*
 * Tracking module
 * Currently we are using Google Analytics with Google Tag Manager
*/

var state = {
  account      : false,
  userProgress : {},
  userType     : null,
  visitType    : null
}

/**
 * Check whether the user has ever had an account
 */
function checkAccount () {
  var account = state.account || checkVisitType() === 'Logged in' || isPi();
  if (!account) {
    var storedAccount = localStorage.getItem('KW_ACCOUNT');
    account = storedAccount ? JSON.parse(storedAccount) : false;
  };
  state.account = account;
  return account;
}

/**
 * Function for checking number of challenges completed this session
 */
function checkUserProgress () {
  var userProgress = state.userProgress
  if (!userProgress.completedStories) {
    var storedProgress = sessionStorage.getItem('KW_PROGRESS');
    if (storedProgress) {
      userProgress = JSON.parse(storedProgress);
    } else {
      userProgress = {
        completedStories: []
      }
      sessionStorage.setItem('KW_PROGRESS', JSON.stringify(userProgress));
    }
  }
  return userProgress;
}

/**
 * Check whether the user is using a Kano Kit
 */
function checkUserType () {
  var userType = state.userType;
  if (!userType) {
    userType = isPi() ? 'paid' : 'free';
  }
  state.userType = userType;
  return userType;
}

/**
 * Check whether the user is currently logged in
 */
function checkVisitType () {
  var visitType = state.visitType;
  if (!visitType) {
    var storedToken = localStorage.getItem('KW_TOKEN') || null;
    visitType = storedToken ? 'Logged in' : 'Logged out';
    state.visitType = visitType;
  }
  return visitType;
}

/**
 * Wrapper for dispatching events to GTM datalayer
 *
 * @param {Object || String} trackingEvent
 */
function dispatchTrackingEvent(trackingEvent) {
  var payload = trackingEvent;
  if (trackingEvent !== Object(trackingEvent)) {
    payload = {
      event: trackingEvent
    };
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * Function to dispatch virtualPageViews with all
 * the required information
 */
function dispatchVirtualPageView() {
  var payload = {
    account             : checkAccount(),
    challengesCompleted : checkUserProgress().completedStories.length,
    event               : 'virtualPageView',
    userType            : checkUserType(),
    virtualPageTitle    : document.title,
    virtualPageURL      : window.location.pathname,
    visitType           : checkVisitType()
  };
  this.dispatchTrackingEvent(payload);
}

/*
 * Initialise tracking
 *
 * @return void
 */
function init () {
  checkUserType();
  checkVisitType();
  checkAccount();

  return;
};

/**
 * Generic function to check whether the user is using a Kano Kit
 *
 * note: not currently fullproof
 */

function isPi () {
  var userAgent = window.navigator.userAgent;
  return userAgent.indexOf('armv6l') !== -1 || userAgent.indexOf('armv7l') !== -1;
}

/**
 * Update the account based on the user logging in, if there
 * wasn't a previous account
 */
function trackAccount () {
  if (!state.account) {
    state.account = true;
    dispatchTrackingEvent({
      account: true
    });
    localStorage.setItem('KW_ACCOUNT', true);
  }
}

/**
 * Function for update number of challenges completed this session
 *
 * @param {String} challenge
 */
function trackUserProgress (challenge) {
  var userProgress = checkUserProgress();
  if (challenge && userProgress.completedStories.indexOf(challenge) === -1) {
    userProgress.completedStories.push(challenge);
  }
  dispatchTrackingEvent({
    challengesCompleted: userProgress.completedStories.length
  });
  sessionStorage.setItem('KW_PROGRESS', JSON.stringify(userProgress));
}

/**
 * Update the visitType based in user logging in or out and dispatch
 * the updated tracking event
 *
 * @param {String} type
 */
function trackVisitType (type) {
  if (state.visitType !== type) {
    dispatchTrackingEvent({
      visitType: type
    });
    state.visitType = type;
  }
  if (type === 'Logged in') {
    trackAccount();
  }
}

module.exports = {
  dispatchTrackingEvent   : dispatchTrackingEvent,
  dispatchVirtualPageView : dispatchVirtualPageView,
  init                    : init,
  trackUserProgress       : trackUserProgress,
  trackVisitType          : trackVisitType
};
