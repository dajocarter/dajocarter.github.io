---
title: Send Monit Alerts to Slack
date: 2017-03-07 01:46:00 -05:00
tags:
- Monit
- Slack
- VPS
- DigitalOcean
- Digital Ocean
- Server
---

This post will show you how to install Monit on a Ubuntu server and configure it to send alerts to a Slack channel.

## Install Monit

First, let's start by using SSH to login to the server. That should look something like `ssh username@server.com`. Once you're in, installing Monit is as easy as `apt-get install monit`. Now let's checkout what that installed. Go ahead and `cd /etc/monit/` and `ls` to see what's inside. For the readers, you'll find the directory looks like this

    /etc/monit
    |- conf.d
    |- monitrc
    |- monitrc.d
      |- many files to ignore
    |- templates
      |- rootbin
      |- rootrc
      |- rootstrict