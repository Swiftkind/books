# Project Setup

Project setup for the **Books Project**.

## Requirements

- `Python` == `3.5.2`

## Installation

### Step 1

Install pip requirements

`$ pip install -r requirements.txt`

### Step 2

Install node modules

`$ cd assets`

`$ npm install`

### Step 3

Apply `django` migrations

`$ ./manage.py migrate`

### Step 4

Create an admin account

`$ ./manage.py createsuperuser`

### Step 5

Watch for asset changes

`cd assets`

`$ compass watch`


### Step 6


All set. Launch your development server.

*NOTE: You need to run the server alongside compass for the css/js files to compile properly.*

*Open another terminal window/tab and enter this command:*

`$ ./manage.py runserver`
