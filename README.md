# Games Dashboard
Games Dashboard is a simple project built with ReactJS for the frontend and NodeJS for the backend. The project is designed to display game data in an easy-to-understand dashboard.

## Prerequisites
To start the project, you need to have Docker installed on your system. Docker is an open-source platform that automates the deployment of applications inside containers.               

## Installation
    To run the project, follow these steps:
        1- Clone the repository to your local machine.
        2- Open a terminal window and navigate to the project directory.
        3- Run the following command to start the application:
            ```docker-compose up```
    
    This will start the application and download any necessary packages.

## Data
    The data used in this project is saved and manipulated in a JSON file. No database is used since it is not required for this simple project. Please note that passwords are stored as plain text for this test project, and no heavy security measures are implemented. Some endpoints use a sleep function to delay the response so that the loading state can be displayed on the frontend.

## Authentication
    Multiple usernames and passwords can be used for login, which are located in the `backend/controllers/users/users.json` file. Here are a few examples:

        - Username: channanrr, Password: UTnl3p
        - Username: rabramirp, Password: HVRipS4v
        - Username: sworttrq, Password: clcSvMAWHkf

## Feedback
All feedback is welcome! Please feel free to submit issues or pull requests on the GitHub repository. We appreciate your contribution to the project!