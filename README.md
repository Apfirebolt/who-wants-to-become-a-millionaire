![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![Django Rest Framework](https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

# Ecommerce API created using Myntra dataset

This is an Ecommerce API which I created using a dataset with data taken from https://myntra.com which is one of the most popular online clothing stores in India.

http://localhost:8000/api-docs/

The API docs can be viewed using the above link. Swagger is used to generate API docs under the hood using a package called 'drf_spectacular'.

## Getting Started

* Create a new virtual environment and install packages specified in the requirements.txt file.

* Hook in your database of choice, make necessary database changes in the settings.py file inside the project folder. Obviously, some familiarity with Django folder structures is required for this. By default this project uses MySQL as database.

* Make migrations when you're done with the database settings and migrate.
* Run python manage.py runserver, and the application should be running on port 8000 by default.

## Built With

* [Python Django](https://www.djangoproject.com/)
* [Django Rest Framework](https://www.django-rest-framework.org/)
* [Swagger Docs](https://swagger.io/)

## Features 

Application has around 10K entries for clothing related products coming from a dataset I retrieved from Kaggle.com
For feeding the data into the database, Management commands are used.