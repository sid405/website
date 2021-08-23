---
title: "Getting NAS-ty"
excerpt: "My last attempt to build myself a LAN video streaming service didn't go too well"
date: "August 23, 2021"
tags: [networking]
draft: false
---

My last attempt to build myself a LAN [video streaming service](https://github.com/madebysid/nas) didn't go too well. Sure, it kinda worked, but it was _far_ from perfect. I don't really know why, but I've always wanted a NAS. TBH I don't know what I'd do with it.

So as is customary, I got distracted yesterday and dusted off the ol' Raspberry Pi that was bought but never used (to be fair I did install Arch on it, but that was literally it, I just installed Arch on it, unplugged it and packed it back up). What I wanted was apparently called a Media Server, so I went out looking for it. I found a couple of things, but none of them really told me what they did. They just had instructions on how to install, and that was it??

Let's start at the beginning. I had to install an OS on the Pi, and then get SSH access to it. I discovered a couple of really neat tricks to do this without ever attaching it to a monitor, a keyboard, or even an ethernet port.

I wasn't really into installing Arch today, so first thing I did was clear out an empty SD Card, attached it to my Macbook and flashed Raspberry Pi OS on there. It's _really_ simple, thanks to [Raspberry Pi Imager](https://www.raspberrypi.org/software/). I just selected the Lite version (without a desktop environment) and that was it! Took about a couple of minutes to ready the SD Card.

But here's where the tricks were:

1. In order to let the Raspberry Pi connect to my Wifi on boot, I created a `wpa_supplicant.conf` file on the boot partition with these contents:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
country=US
update_config=1

network={
  ssid="<My SSID>"
  psk="<My Password>"
  key_mgmt=WPA-PSK
}
```

Unfortunately, I can't remember where I found this, but [this SO answer](https://raspberrypi.stackexchange.com/questions/67649/raspberry-pi-zero-w-headless-using-wpa-supplicant-conf-not-working) mentions it as well.

2. In order to enable SSH on boot, you just have to create an empty file with the name `ssh` on the boot partition. Apparently the OS will see this file, enable SSH, and then delete it.

Anyway, once I did that, the Pi booted up, and I connected to it via SSH from my Macbook. So delightful! (I had reserved an IP from my router way back, so I knew what it was). Set up an SSH alias for it and you can get to your pi in seconds by just typing `ssh pi` in a terminal.

---

Next step was the media server. [Kodi](https://kodi.tv) seemed to be the top choice, so I started looking into it, but got very confused. So you install this server on your Pi, and then what? Where's the UI? How do I add stuff to it? Eventually I found out that apparently the server is on the Pi, so you have to physically connect a monitor to the Pi to be able to access it. I think it's built for TVs and stuff, but this is absolutely not what I wanted.

Looked around some more, and I came across [openmediavault](https://openmediavault.org), which sounded extremely promising. I installed it on my Pi, and it exposed a web server with a UI I could acess from anywhere on my home network. Perfect!

Next up was file sharing. I learned about [SMB](https://en.wikipedia.org/wiki/Server_Message_Block), which is a protocol that lets devices on a network talk to each other. Some quick openmediavault configuration later, I had the perfect UI: macOS's Finder!

![NAS on macOS Finder](/openmediavault/finder.png)

openmediavault even supported video streaming right out-of-the-box, so I literally did not have to do a single thing extra. Sure, it's a little slow when configuring, but finding software that "just works" is so rare these days, I'm very impressed!
