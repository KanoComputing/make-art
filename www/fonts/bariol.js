import { html } from '../template.js';

export const bariol = html`
    <style>
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_bold-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_bold-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_bold-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_bold-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_bold-webfont.svg#bariol_boldbold") format("svg"),
                url("/fonts/bariol_bold-webfont.eot") format("eot"),
                url("/fonts/bariol_bold-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_bold-webfont.woff") format("woff"),
                url("/fonts/bariol_bold-webfont.ttf") format("truetype"),
                url("/fonts/bariol_bold-webfont.svg#bariol_boldbold") format("svg"),
                url("./bariol_bold-webfont.eot") format("eot"),
                url("./bariol_bold-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_bold-webfont.woff") format("woff"),
                url("./bariol_bold-webfont.ttf") format("truetype"),
                url("./bariol_bold-webfont.svg#bariol_boldbold") format("svg");
            font-weight: bold;
            font-style: normal;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_regular-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_regular-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_regular-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_regular-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_regular-webfont.svg#bariol_regularregular") format("svg"),
                url("/fonts/bariol_regular-webfont.eot") format("eot"),
                url("/fonts/bariol_regular-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_regular-webfont.woff") format("woff"),
                url("/fonts/bariol_regular-webfont.ttf") format("truetype"),
                url("/fonts/bariol_regular-webfont.svg#bariol_regularregular") format("svg"),
                url("/fonts/bariol_regular-webfont.eot") format("eot"),
                url("./bariol_regular-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_regular-webfont.woff") format("woff"),
                url("./bariol_regular-webfont.ttf") format("truetype"),
                url("./bariol_regular-webfont.svg#bariol_regularregular") format("svg");
            font-weight: normal;
            font-style: normal;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_bold_italic-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_bold_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_bold_italic-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_bold_italic-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_bold_italic-webfont.svg#bariol_boldbold_italic") format("svg"),
                url("/fonts/bariol_bold_italic-webfont.eot") format("eot"),
                url("/fonts/bariol_bold_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_bold_italic-webfont.woff") format("woff"),
                url("/fonts/bariol_bold_italic-webfont.ttf") format("truetype"),
                url("/fonts/bariol_bold_italic-webfont.svg#bariol_boldbold_italic") format("svg"),
                url("./bariol_bold_italic-webfont.eot") format("eot"),
                url("./bariol_bold_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_bold_italic-webfont.woff") format("woff"),
                url("./bariol_bold_italic-webfont.ttf") format("truetype"),
                url("./bariol_bold_italic-webfont.svg#bariol_boldbold_italic") format("svg");
            font-weight: bold;
            font-style: italic;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_regular_italic-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_regular_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_regular_italic-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_regular_italic-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_regular_italic-webfont.svg#bariolregular_italic") format("svg"),
                url("/fonts/bariol_regular_italic-webfont.eot") format("eot"),
                url("/fonts/bariol_regular_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_regular_italic-webfont.woff") format("woff"),
                url("/fonts/bariol_regular_italic-webfont.ttf") format("truetype"),
                url("/fonts/bariol_regular_italic-webfont.svg#bariolregular_italic") format("svg"),
                url("./bariol_regular_italic-webfont.eot") format("eot"),
                url("./bariol_regular_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_regular_italic-webfont.woff") format("woff"),
                url("./bariol_regular_italic-webfont.ttf") format("truetype"),
                url("./bariol_regular_italic-webfont.svg#bariolregular_italic") format("svg");
            font-weight: normal;
            font-style: italic;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_light-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_light-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_light-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_light-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_light-webfont.svg#bariol_lightlight") format("svg"),
                url("/fonts/bariol_light-webfont.eot") format("eot"),
                url("/fonts/bariol_light-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_light-webfont.woff") format("woff"),
                url("/fonts/bariol_light-webfont.ttf") format("truetype"),
                url("/fonts/bariol_light-webfont.svg#bariol_lightlight") format("svg"),
                url("./bariol_light-webfont.eot") format("eot"),
                url("./bariol_light-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_light-webfont.woff") format("woff"),
                url("./bariol_light-webfont.ttf") format("truetype"),
                url("./bariol_light-webfont.svg#bariol_lightlight") format("svg");
            font-weight: 200;
            font-style: normal;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_light_italic-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_light_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_light_italic-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_light_italic-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_light_italic-webfont.svg#bariollight_italic") format("svg"),
                url("/fonts/bariol_light_italic-webfont.eot") format("eot"),
                url("/fonts/bariol_light_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_light_italic-webfont.woff") format("woff"),
                url("/fonts/bariol_light_italic-webfont.ttf") format("truetype"),
                url("/fonts/bariol_light_italic-webfont.svg#bariollight_italic") format("svg"),
                url("./bariol_light_italic-webfont.eot") format("eot"),
                url("./bariol_light_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_light_italic-webfont.woff") format("woff"),
                url("./bariol_light_italic-webfont.ttf") format("truetype"),
                url("./bariol_light_italic-webfont.svg#bariollight_italic") format("svg");
            font-weight: 200;
            font-style: italic;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_thin-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_thin-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_thin-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_thin-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_thin-webfont.svg#bariolthin") format("svg"),
                url("/fonts/bariol_thin-webfont.eot") format("eot"),
                url("/fonts/bariol_thin-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_thin-webfont.woff") format("woff"),
                url("/fonts/bariol_thin-webfont.ttf") format("truetype"),
                url("/fonts/bariol_thin-webfont.svg#bariolthin") format("svg"),
                url("./bariol_thin-webfont.eot") format("eot"),
                url("./bariol_thin-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_thin-webfont.woff") format("woff"),
                url("./bariol_thin-webfont.ttf") format("truetype"),
                url("./bariol_thin-webfont.svg#bariolthin") format("svg");
            font-weight: 100;
            font-style: normal;
        }
        @font-face {
            font-family: 'bariol';
            src: url("https://cdn.kano.me/fonts/bariol_thin_italic-webfont.eot");
            src: url("https://cdn.kano.me/fonts/bariol_thin_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("https://cdn.kano.me/fonts/bariol_thin_italic-webfont.woff") format("woff"),
                url("https://cdn.kano.me/fonts/bariol_thin_italic-webfont.ttf") format("truetype"),
                url("https://cdn.kano.me/fonts/bariol_thin_italic-webfont.svg#bariolthin_italic") format("svg"),
                url("/fonts/bariol_thin_italic-webfont.eot") format("eot"),
                url("/fonts/bariol_thin_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("/fonts/bariol_thin_italic-webfont.woff") format("woff"),
                url("/fonts/bariol_thin_italic-webfont.ttf") format("truetype"),
                url("/fonts/bariol_thin_italic-webfont.svg#bariolthin_italic") format("svg"),
                url("./bariol_thin_italic-webfont.eot") format("eot"),
                url("./bariol_thin_italic-webfont.eot?#iefix") format("embedded-opentype"),
                url("./bariol_thin_italic-webfont.woff") format("woff"),
                url("./bariol_thin_italic-webfont.ttf") format("truetype"),
                url("./bariol_thin_italic-webfont.svg#bariolthin_italic") format("svg");
            font-weight: 100;
            font-style: italic;
        }
    </style>
`;
