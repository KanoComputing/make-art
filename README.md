# Make Art

> An app for learning programming using a basic CoffeeScript drawing API

![Screenshot of the App](make-art-screenshot.png)

You can try the app [here »](http://art.kano.me/)

## Setup

    git clone git@github.com:KanoComputing/make-art.git
    cd make-art
    yarn

## Build

Build the app before running it

- `yarn build`

## Run

- `yarn serve`

Open your browser at [http://localhost:4000](http://localhost:4000)

## Develop

Run the watch script when developing

- `yarn watch`

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

Extra info:

There are two Make Art's version in the Kano Kit.

1. `ls usr/bin/kano-draw` : this version is preinstalled and anything in this directory will be automatically found.
    
     to run the default version use `/home/<nameUser>/make-art` 
    
    eg =>`/home/laura/make-art`

2. `./make-art/bin/kano-draw` : this version is use to modify make art locally which can then be sync `rsync -av --exclude='*/.git' --exclude='*/www/js/vendor' --exclude='*/node_modules' make-art "laura@172.16.254.180:~/"` and tested in the kano-kit
    * to run the locally version of the kano-kit use `./bin/kano-draw`
