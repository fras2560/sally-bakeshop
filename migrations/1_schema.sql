DROP TABLE IF EXISTS baker_order CASCADE;
DROP TABLE IF EXISTS product_order CASCADE;
DROP TABLE IF EXISTS baker CASCADE;

CREATE TABLE product_order (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    duration_seconds INTEGER NOT NULL,
	order_date DATE  NOT NULL
);

CREATE TABLE baker (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    capacity_seconds INTEGER NOT NULL
);

CREATE TABLE baker_order (
    baker_id INTEGER REFERENCES baker(id),
    order_id INTEGER REFERENCES product_order(id)
);