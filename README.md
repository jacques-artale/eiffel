# eiffel-store
A persistence solution for Eiffel events. This repository is different than Eiffel Vici. This repository accepts live view of Eiffel
events. The MongoDB, at backend, has trigger events. Whenever any event is added into the collection named "eiffel-events", the 
visualization is updated. 

### All the events must be inserted in the collection named "eiffel-events" only. 

### Installing

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1) Clone the repository and open the shell and go to 'Visualization' folder. 
2) Run the following command in the 'Visualization' folder:        

```
meteor
```
It can ask to install some nmp plugins, it is fine. Read through the error messages and install the missing plugins. If everything
went fine, you will be able to see the app running on the following link:

```
localhost:3000
```

3) Access the local instance of "mongo db" mostly running on 3001 port. The name of DB is "meteor". 
You can select some GUI tool to access database. If database is empty, follow step number 4. 
4) Create the following four collections (case-sensitive):

```
eiffel-events
events
eventsequences
tablerows
```

The system is ready to use.

## Getting Started

The Eiffel-store visualization is live. Insert Eiffel event into the collection named "eiffel-events" and refresh the webpage 
(localhost:3000) and you will see visualization. Keep inserting the events and visualization will keep linking events.

### Connection to RabbitMQ Server

Your CI (e.g., Jenkins or Gerrit) can publish Eiffel events on your RabbitMQ Bus and you can connect RabbitMQ Bus with Eiffel-store by using the a small java code, written by me, on https://github.com/azeem59/rabbitmq-eiffel-store. This is a bridge between RabbitMQ Bus and Eiffel-store. By running this code, you can just publish events on RabbitMQ Bus and it will automatically appear in the Eiffel-store app.
This code may have some errors. Please feel free to update the code or write your own bridge between RabbitMQ Bus and Eiffel-store


