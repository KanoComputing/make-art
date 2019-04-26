export function throttle(callback, wait, immediate = false) {
    let timeout = null;
    let initialCall = true;
    return function () {
        // immeditae is only valid for first ever call
        const callNow = immediate && initialCall;
        // Always update the value for the next in line call
        let next = () => {
            callback.apply(this, arguments);
            timeout = null;
        };
        if (callNow) {
            // If the call is immediate, update next to only unset the timeout.
            // This prevents a unique call to trigger again after the delay
            next = () => {
                timeout = null;
            };
            initialCall = false;
            // Call the function immediateley
            callback.apply(this, arguments);
        }
        // Set the timer if not already set
        if (!timeout) {
            timeout = window.setTimeout(next, wait);
        }
    };
}
