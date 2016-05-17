# Translation

Translation files are found in the following directories:
- `lib/challenges/locales`: translation of the challenges
- `locales`: translation of the views
- `content/docs.json`: translation of the documentation

## i18n not released yet

Kano OS is not fully i18n-aware and locales are not installed for end users, yet. You can translate this application, but as of now, users will still see the default English message strings.

## Build

Translations are part of the normal build process: when you type `npm run build`, the translated challenges and docs will be copied in the `www` directory; and the view templates will be localized by mapping the resources _for each language_.  So it means that all resources (views, challenges and docs translations) are prepared in advance.

## Runtime

At runtime, the proper translation will be picked based on the browser language. 

## How to add a new translation

You need to add the new language in 3 places:

1. Create `lib/challenges/locales/<lang>` and copy the whole `worlds` directory and `index.json` 
   These are the translations of the challenges, the main content of Make-Art.

2. Create `locales/<lang>` and copy the content of `locales/en`
   These are the translations of the views

3. Directly edit `content/docs.json` and add your language to the map (at the top level)

Note that languages are identified by their 2 letter abbreviation (ignoring the country), so for example fr-FR and fr-CA will share the same translation `fr`.

## How to make sure your code is i18n-aware

For the challenges, if you create a new challenge in English, there is nothing special to do, it can be translated to other languages by copying the .json file to the other locales directories.

For the views (jade templates), you need to enclose all your strings in `${{` and `}}$` as this is the convention used by gulp-html-i18n plugin to find and replace the messages in the view templates.  Then, you need to add the new string to the corresponding .json file in the (top-level) `locales` directory.  Let's say you want to add a string "Happy Birthday" to the challenge.jade template; you would write it as follows in the challenge.jade: `${{ challenge.hapy_birthday }}$`.  Then, you would add an entry to the challenge.json map, like:
```
{
    ...
    "happy_birthday": "Happy Birthday"
}
```

Finally, for the documentation, if you add / modify text in `content/docs.json` the translations will need to be added for other languages, in the same file.

## To-Do

Tool to make it easier to add new languages.
