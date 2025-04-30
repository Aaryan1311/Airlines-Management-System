This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principesand project management recommendations.

`src` --> Inside the src foler all the actual source code regarding the project will reside, this will not include any kind of tests.

Lets take a look inside the src folder

- `config` -> In this folder anbything and exerything regarding any configuration or setup of a library or a module will be done. For example: setting up `dotenv` so that we can use the enviroment variable anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be setup you logging library should also be done  here.

- `routes` -> In thi route folder, we register a route and the corresponsing middleware and controllers to it. 

- `middlewares` -> they are just going to intercept the incoming requests where we can write out validator, authenticators etc.

- `controllers` -> they are kind of the last middlewares as post them you call you business layers to execute the bussiness logic. In controller we just receive the incoming request and data and then pass it to the bussiness layer and once the bussiness layer reutrn the output, we structure the API response in controller and send the output. 


-  `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries  or ORM queries will go here.

- ` services` -> contains the business logic and interacts  with repositories for data from the database

- `utils` -> contains helper methods, error classess etc.

### Setup the project

- Download this template from github and openit in you favourite text editor. 
- go inside the folder path and execute the following command:
```
    npm i
```
- In the root directory create a `.env` file and add the following env variables
```
    PORT=< number of your choice>
```
ex:
```
    PORT=3000
```
- fo inside the `src` folder and run following command:

```
    npx sequelize init
```
- by executing the above command, we get the migrations and seeder folder along with a config.json inside the config folder.
- If you're setting up your development environment then write the username of your db and password of your db and in dialect mention whatever db you are using for ex:
mysql, mariadb etc

- If you're setting up test or production environment, make sure you also replace the host with a hosted db url.
- To run the server execute 
```
    npm run dev
```
