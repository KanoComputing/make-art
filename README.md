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

# Automatic Test

Tool used: **Selenium Web driver**

Follow this [Setting up your own test automation environment](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment)

- selenium-webdriver should be installed when you run `npm install ` inside your local repo
- install in the kano-kit `sudo apt-get install chromium-chromedriver` - [reference](https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver)
- Add the chromedriver driver's location to your system PATH variable. 
    - Open your .bash_profile (or .bashrc) file

    ```
    #Add WebDriver browser drivers to PATH

    export PATH=$PATH:/Users/bob

    ```