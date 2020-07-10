# NuEnery Technical Test

## Development Environement
  - macOS Catalina (10.15.5) 
  - NodeJS (14.3.0)
  - Yarn 1.22.4
  - Python (3.8.3)
  - MySQL (8.0.19)

  Brew Packages: 
  - openssl@1.1
  - mysql
  - mysql-client
  - node
  - yarn
  - watchman


## Intalling & Setup

Install api: 
  1. cd api && python3 -m venv env
  2. source env/bin/activate
  3. python3 -m pip install -r requirements.txt

Install node_modules: 

(make sure you are in calculator directory)

1. yarn


Setting Up MySQL:
  1. navigate to api.py (calculator/api/api.py) and update the MY_SQL dictionary (lines 12 to 17).
    Set the following:
     a. user
     b. pass (password)
     c. host
     d. db (database)
  2. if necessary create the database that was entered into the MY_SQL dictionary in api.py.

## Run

1. yarn start-api
2. yarn start


## Description

  The app is just a simple calculator that uses all the requested technologies (Python Flask, MySQL, SQLAlchemy). I have included a simple method of registration as well as the login.

