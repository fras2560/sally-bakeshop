INSERT INTO baker (name, capacity_seconds)
VALUES 
    ('Bob', 28800),
    ('Jess', 28800),
    ('Kristen', 28800),
    ('Romeo', 28800);



INSERT INTO product_order (order_date, name, duration_seconds)
VALUES 
    (CURRENT_DATE,'Sally''s order', 1000),
    (CURRENT_DATE,'2024 Graduation party', 28800),
	(CURRENT_DATE - 365,'2023 Graduation party', 28800);