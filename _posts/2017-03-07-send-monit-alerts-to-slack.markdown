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

First, let's start by using SSH to login to the server. That should look something like `ssh username@server.com`. Once you're in, installing Monit is as easy as `apt-get install monit`. Now let's checkout what that installed. Go ahead and `cd /etc/monit/` and `ls` to see what's inside. For the readers, you'll find the directory looks like this:

    /etc/monit
    |- conf.d
    |- monitrc
    |- monitrc.d
      |- many files to ignore
    |- templates
      |- rootbin
      |- rootrc
      |- rootstrict

## Configure Monit

We'll have to edit the `monitrc` file in order to update the Monit installation. Go ahead and `nano monitrc` to begin editing the file. Scroll down and uncomment the following lines:

    set httpd port 2812 and
    use address localhost
    allow localhost

Then scroll down a bit to just under the Services section and uncomment the part about checking general system resources. Be sure to change `myhost.mydomain.tld` to match your server. In the end, you should have the following lines uncommented:

    check system myhost.mydomain.tld
      if loadavg (1min) > 4 then alert
      if loadavg (5min) > 2 then alert
      if memory usage > 75% then alert
      if swap usage > 20% then alert
      if cpu usage (user) > 70% then alert
      if cpu usage (system) > 30% then alert
      if cpu usage (wait) > 20% then alert

Now that Monit is set up, we need to configure it to monitor our chosen services. If you read the `monitrc` file, you would have found that the last line is to include any files in the `conf.d` directory. This is where we'll put our custom services file so `nano conf.d/services.conf`. You can check out Monit's [configuration examples](https://mmonit.com/wiki/Monit/ConfigurationExamples), but here's my file:
```
check process nginx with pidfile /var/run/nginx.pid
  group www-data
  start program = "/etc/init.d/nginx start"
  stop program = "/etc/init.d/nginx stop"
  if changed pid then exec "/etc/monit/slack.sh"

check process mysql with pidfile /var/run/mysqld/mysqld.pid
  start program = "/etc/init.d/mysql start"
  stop program = "/etc/init.d/mysql stop"
  if failed unixsocket /var/run/mysqld/mysqld.sock then restart
  if 5 restarts within 5 cycles then timeout
  if changed pid then exec "/etc/monit/slack.sh"

check process php5.5-fpm with pidfile /var/run/php5.5-fpm.pid
  start program = "/etc/init.d/php5.5-fpm start"
  stop program = "/etc/init.d/php5.5-fpm stop"
  if changed pid then exec "/etc/monit/slack.sh"

check process php5.6-fpm with pidfile /var/run/php5.6-fpm.pid
  start program = "/etc/init.d/php5.6-fpm start"
  stop program = "/etc/init.d/php5.6-fpm stop"
  if changed pid then exec "/etc/monit/slack.sh"

check process php7.0-fpm with pidfile /var/run/php7.0-fpm.pid
  start program = "/etc/init.d/php7.0-fpm start"
  stop program = "/etc/init.d/php7.0-fpm stop"
  if changed pid then exec "/etc/monit/slack.sh"

check process php7.1-fpm with pidfile /var/run/php7.1-fpm.pid
  start program = "/etc/init.d/php7.1-fpm start"
  stop program = "/etc/init.d/php7.1-fpm stop"
  if changed pid then exec "/etc/monit/slack.sh"
```
