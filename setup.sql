
-- make sure the websiteuser account is set up and has the correct privileges
-- CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
-- GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("seller1", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

--   -- make sure the websiteuser account is set up and has the correct privileges
-- CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
-- GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;


    CREATE TABLE IF NOT EXISTS items (
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    description VARCHAR(500),
    dateAdded DATETIME,
    sellersPhoneNumber VARCHAR(25),
    sellersEmailAddress VARCHAR(25),
    file LONGBLOB,
    account MEDIUMINT(8) UNSIGNED,
    FOREIGN KEY (account) REFERENCES accounts(id),
    sold bool
);

-- INSERT INTO items(name, description) VALUES("test", "changes");

