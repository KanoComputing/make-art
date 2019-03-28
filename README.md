# Make Art

> An app for learning programming using a basic CoffeeScript drawing API

![Screenshot of the App](make-art-screenshot.png)

You can try the app [here »](http://art.kano.me/)

## Setup

    git clone git@github.com:KanoComputing/make-art.git
    cd make-art
    npm install
    bower install
        - if you are linux you may use `sudo npm install bower`

## Build

Build the app before running it

- `npm run build`
    - run again the command everytime you update the html structure

## Run

- `npm start`

Open your browser at [http://localhost:3000](http://localhost:3000)

## Develop

Run the watch script when developing

- `npm run watch`

## Offline

To build in the offline mode for Kano OS add these ENV vars:

    OFFLINE=true NODE_ENV=production gulp

Since Node JS isn't included by default on the kit and the offline backend is
[implemented in Python](/kano_draw/server.py), the easiest way to
debug on the kit is to build the static assets on your machine and rsync them
over to the kit as follows:

    rsync -av make-art "user@ip:~/make-art"

On Kano OS, go to the `bin/` directory and launch the `kano-draw` script
which will start the server and open a
[python-webkit](https://wiki.python.org/moin/PythonWebKit) browser with Make
Art.

    user@kano-os ~ $ cd ~/make-art/bin
    user@kano-os ~ $ ./kano-draw
