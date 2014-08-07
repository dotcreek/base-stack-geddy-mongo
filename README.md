## Basic GeddyJS Base-Stack with Mongo DB

#### Setup development environment with Vagrant(you should use vagrant!)

~~~
~$ vagrant up
~~~

~~~
~$ vagrant ssh
~~~

~~~
~$ cd /vagrant
~~~

~~~
~$ [sudo] npm install geddy -g && npm install
~~~

~~~
~$ geddy
~~~

open http://localhost:4001

### Setup environment without Vagrant(again, you MUST use it!)

* Install Mongo DB
* Install Nodejs
* Install geddy ´~$ [sudo ] npm install geddy -g´
* Run geddy ´~$ geddy´

### geddy jake [command]

* jshint all folders

~~~
~$ geddy jake jshint
~~~

* jshint custom folder app folder(or lib or anyone)

~~~
~$ geddy jake jshint[app]
~~~

* Run unit tests for models or controllers or both

~~~
~$ geddy jake unit
~$ geddy jake unit:models
~$ geddy jake unit:models[user]
~$ geddy jake unit:controllers
~$ geddy jake unit:controllers[users]
~~~

* Run integration tests for models or controllers or both

~~~
~$ geddy jake integration
~$ geddy jake integration:models
~$ geddy jake integration:models[user]
~$ geddy jake integration:controllers
~$ geddy jake integration:controllers[users]
~~~


### Contributors

* @lesterzone
