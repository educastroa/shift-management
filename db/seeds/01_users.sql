ALTER TABLE users 
ALTER COLUMN password
SET DEFAULT '1234';

INSERT INTO users (email) VALUES ('test@test.com');
INSERT INTO users (email) VALUES ('test1@test.com');


