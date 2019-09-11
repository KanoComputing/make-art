window.GA_MEASUREMENT_ID = 'UA-45135100-24';

const script = document.createElement('script');
script.async = 1;
script.src = `https://www.googletagmanager.com/gtag/js?id=${window.GA_MEASUREMENT_ID}`;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
    window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', window.GA_MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });
