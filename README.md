# Tetrakaideca - iCreate project

## Goal

The goal of this project is to create a structure that shows the internationalization of the Botanical Garden of Nantes and that uses a Leap Motion controller as an input and mobile devices as outputs.

## The team

#### École Polytechnique de l'Université de Nantes
Simon Bessenay, Guillaume Potier, Tiphaine Besnard

#### École de Design de Nantes
Marion Dallibert, Bastien Dauve, Theo Denechere

## How to use

#### General

First, the repository needs to be cloned with the following command on a bash type interpreter :

```bash
git clone https://github.com/Bouhbouh/tetrakaideca.git
```

Then we will need to install all the node packages required for the project by using the following command :

```bash
npm install
```

#### Leap Motion installation

To install the Leap Motion on your desktop, please refer to the [documentation](https://www.leapmotion.com/setup/desktop/) on the official website of the device.

#### Setup the environment and have fun

Now that everything is installed we need to setup the environment for the use of the web application. To do so, we first need to be working on a private WiFi and check our IP address with the following command :

```bash
ifconfig
```

This adress will be available under *'inet addr'* on the second line of the *wifi0* part of the result given by the command.

Then, on the 4th line of the *phone_client.js* file under the js directory, replace the *localhost* word by the IP address you just found. Do the same thing on the line number 138 of the *index_leap_motion.html* file.

With that done, we can now start the server :

```bash
node app
```

Now on a Firefox web browser we need to open the master client by typing the following address and port :

    your_IP_address:8080

After starting the main client, we need 4 mobile devices with a Firefox web browser available to type the following address :

    your_IP_address:8080/phone

With that open, an alert box will ask an id number on each of the 4 devices. We start from the rightmost with the number 1 and end with the leftmost device with the number 4 and press the *Ok* button. We are now good to go !

#### Important

It's important to note that none of the medias used by the project are available in this Github repository due to their important size. We can provide them if necessary. They are sorted into 3 directories *images, sounds* and *videos*. Those need to be located at the root of the project.
