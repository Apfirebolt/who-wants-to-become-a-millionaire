![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![Django Rest Framework](https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white)
[![React](https://img.shields.io/badge/-React-%2361DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

# Quiz App - WWTBAM (Who wants to become a Millionaire?)

This is a quiz app which is based on the popular game quiz show called who wants to become a Millionaire (WWTBAM). The back-end of the application is created using Python and Django. The front-end of the application is built using React, Javascript and Tailwind CSS framework.

http://localhost:8000/api-docs/

The API docs can be viewed using the above link. Swagger is used to generate API docs under the hood using a package called 'drf_spectacular'.

## Getting Started - Backend (Python and Django)

* Create a new virtual environment and install packages specified in the requirements.txt file.

* Hook in your database of choice, make necessary database changes in the settings.py file inside the project folder. Obviously, some familiarity with Django folder structures is required for this. By default this project uses MySQL as database.

* Make migrations when you're done with the database settings and migrate.
* Run python manage.py runserver, and the application should be running on port 8000 by default.

## Getting Started - Frontend (React, Tailwind and Javascript)

* Make sure Node and npm is installed on your system.

* Install the packages using 

```
npm i
```

* Run in the development mode 

```
npm run dev
```

* The project uses Vite as the bundler instead of web-pack. Configure Tailwind CSS and Headless UI which are used to power UI components used in this application like sidebar for mobile view, modals and more.

## Built With

* [Python Django](https://www.djangoproject.com/)
* [Django Rest Framework](https://www.django-rest-framework.org/)
* [Swagger Docs](https://swagger.io/)
* [Tailwind CSS](https://tailwindcss.com/)


## Features 

- User Registration

- Users can view quizes and attend those quizes and view scores.

- Admin Panel is available from where admin users can add questions and quizes which can be attended by normal users of the portal.

- Security: The application implements authentication and authorization mechanisms to ensure secure access to user data and prevent unauthorized actions.

- Responsive Design: The application is designed to be responsive and accessible on different devices, including desktops, tablets, and mobile phones.