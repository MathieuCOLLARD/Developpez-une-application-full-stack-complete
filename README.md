# Project Presentation
MDD (Monde de Dév) is a social network created by ORION, designed to help developers find jobs and foster collaboration among peers with similar interests. The platform allows users to subscribe to programming topics like JavaScript, Java, Python, and Web3, displaying relevant articles in a chronological feed. Users can write articles and post comments, encouraging knowledge sharing and community engagement. 

### Spring Boot configuration : 
- Project Type: Maven
- Java Language Version: 11
- Spring Boot Version: 2.7.3
  
### Dependencies:
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Validation
- Spring Boot Starter Web
- MySQL Connector Java (runtime scope)
- JSON Web Token (JJWT)
- Spring Boot Starter Test
- Spring Security Test
- Lombok
- Modelmapper

### Build Plugins:
- Spring Boot Maven Plugin

## Requirement

Before running the application, ensure the following prerequisites:

- Java Installation: Ensure that Java is installed on your system.
If it's not the case, follow indications on this link :
> https://www.java.com/fr/download/manual.jsp

- Node.js and npm: Make sure Node.js and npm (Node Package Manager) are installed. You can download and install Node.js here :
> https://nodejs.org/en


- Angular CLI: If you plan to work on the frontend part of the application, make sure you have Angular CLI installed. You can install it using npm with the following command:
> npm install -g @angular/cli.

- Git: Ensure Git is installed on your system for cloning the project repository. You can download Git from here :
> https://git-scm.com/

## Clone the project

Git clone:

> git clone https://github.com/MathieuCOLLARD/Developpez-une-application-full-stack-complete

## Launch Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Launch Back
If u have Intellij IDE, you can follow the steps bellow.

If u want to download it, click on the link :
> https://www.jetbrains.com/fr-fr/idea/download/?section=windows

To start the back-end with Intellij, you need a configuration. First, click on Edit Configurations :

![image](https://github.com/user-attachments/assets/1d8c99a4-5ee5-4ad0-b58d-275de96cca76)

Add a new configuration :

![image](https://github.com/user-attachments/assets/73ef6f55-8b5b-4b97-98bb-5f2672a6d765)

Add 'spring-boot:run' in Run field :

![image](https://github.com/user-attachments/assets/fb9fc3da-43d0-48fa-85ff-482ed1c144b9)

Then in Java Options, click on 'Modify' and on 'Environment Varibles'. Add this line in the 'Environment Varibles' field for the database configuration:
> 'database.password=Openclassrooms05;database.url=jdbc:mysql://localhost:3306/mddapi;database.secret=openclassrooms'

![image](https://github.com/user-attachments/assets/8f13a7fd-29f1-46b6-964b-88fc1c118d8d)


## Configure the database 

Download mysql with the installer :

> https://dev.mysql.com/downloads/installer/

cd in the mysql folder or use mysql as global variable and run this command :

> 'mysql -u root -p'

Create the mddapi database

> 'CREATE DATABASE MDDAPI;'

Choose the right database using the command

> 'USE MDDAPI;'

