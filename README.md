# sally-bakeshop

Sally Bakeshop - Interview

## Database Setup

Currently assume you have postgres user and a database named sally.

Then apply the migration `1_schema.sql` to the database to create the tables.
After that you could use `2_mock.sql` to load some bakers whens starting the server.

## Starting Server

Server can be started using:

```bash
npm start
```

The server upon opening will load in all the bakers and schedule any orders for today.
The store will not be able to open correctly if the orders overload the bakers.

## Short Answer

1. Each order I would sort by most duration and then assign that to the baker with the most capacity. There would be alot of other scheduling approaches to consider. My approach is definitely a bit naive. I did want to spread the orders around the bakers but I think this will result in sometimes orders not being fulfilled. One other approach would be to schedule maximise baker load. So assigning the most constrained baker that can handle the order. I would need to experiment a bit more with this. I do not like this approach in the real-world since stressing out one baker not a good idea.
2. I didnt make a queue. I guess under my assumptions I was just handling each order as it came in. If my program did have a queue I guess it would help solve the problem of adding orders that cannot be scheduled but indicated by the total store capacity that is could be handled.
3. My current approach can handle bakers with different capacities. Although I think my current approach for determining if the store can handle a given order will result in adding orders to the database that cannot be scheduled. One example that comes to mind if two workers combined capacity can handle the order then it will be added but when schedule it will break. If given more time I would refine this part to consider the invidual worker's capacity as well.
