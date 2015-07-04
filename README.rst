django-ddp-meteor-todo
======================

Meteor todo example with django-ddp backend

Installation
------------
Install django-dpp
.. code:: sh
  pip install django-ddp

Install meteor (https://www.meteor.com/install)

Make sure you have PostgreSQL with psycopg2 setup

Clone the repo: 
.. code:: sh
  git clone https://github.com/cxhandley/django-ddp-meteor-todo

Run the python service:
.. code:: sh
  DJANGO_SETTINGS_MODULE=django-ddp-meteor-todo.settings dddp

Make sure you have the root folder in PYTHONPATH if the above does not work.

Go into the meteor_todo folder - open terminal and run
.. code:: sh
  meteor

Then go to localhost:3000 and add some todos. 
