## Make Art

[![Deployment Status](https://vsrm.dev.azure.com/KanoComputing/_apis/public/Release/badge/7918f3eb-d68a-49f3-bccd-9ffe2f542c55/5/5)](https://vsrm.dev.azure.com/KanoComputing/_apis/public/Release/badge/7918f3eb-d68a-49f3-bccd-9ffe2f542c55/5/5)

App for learning programming using a basic CoffeeScript drawing API

![Screenshot of the App](make-art-screenshot.png)

You can try the app [here »](http://art.kano.me/)

## Setup

    git clone git@github.com:KanoComputing/make-art.git
    cd make-art
    yarn

## Build

Build the app before running it

- `yarn build`
- `yarn build:web --env=production`

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

## [Installing VS Code on Raspbian Kano OS](https://www.raspberrypi.org/forums/viewtopic.php?p=1440336)


1) **Install GPG key**

`sudo wget -qO - https://packagecloud.io/headmelted/codebuilds/gpgkey | sudo apt-key add -;`

2) **Add source repository**

`sudo nano /etc/apt/sources.list`
and add ...

`deb https://packagecloud.io/headmelted/codebuilds/raspbian/ jessie main`
Ctrl-X, Y, enter to exit 'nano' and save the updated file.

Note it should be "jessie" even when using "stretch".

3) **Install VS Code (code-oss)**

`sudo apt-get update
sudo apt-get install code-oss`

Note the "sudo apt-get update" is essential. Failing to do that will result in an "E: Unable to locate package code-oss" error.

Note that "sudo apt-get update" from now on will will show entries for
"packagecloud.io/headmelted/codebuilds/raspbian", and
"packages.microsoft.com/repos/vscode".

4) **Launching VS Code (code-oss)**

Under the Pi desktop start menu, under Programming, there should now be a "Code - OSS" link.

VS Code can also be launched from the command line with -

`code-oss`
