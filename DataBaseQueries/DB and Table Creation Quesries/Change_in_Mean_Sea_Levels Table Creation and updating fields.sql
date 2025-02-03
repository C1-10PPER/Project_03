/*
After creating the table with Date column as Date data type, recieved an error suggesting that the Date column in the CSV file contains invalid date formats.
Specifically, "D12/17/1992" which was not recognized as a valid date in PostgreSQL'
To resolve this issue, we have taken the following steps:
1. create the table with text data type
2. import the data
3. replace the "D" in the date field with " "
4. we altered Date field to DATE data type in the format 'MM/DD/YYYY'
*/

--create table
Drop table if exists Change_in_Mean_Sea_Levels;
CREATE TABLE Change_in_Mean_Sea_Levels (
    ObjectId SERIAL PRIMARY KEY,
    Country VARCHAR(255),
    ISO2 CHAR(2),
    ISO3 CHAR(3),
    Indicator VARCHAR(255),
    Unit VARCHAR(50),
    Source VARCHAR(255),
    CTS_Code VARCHAR(50),
    CTS_Name VARCHAR(255),
    CTS_Full_Descriptor TEXT,
    Measure VARCHAR(255),
    Date text,
    Value NUMERIC
);



---replaced the "D" in the date field
UPDATE Change_in_Mean_Sea_Levels
SET Date = REPLACE(Date, 'D', '');


--updated the data type and formate
ALTER TABLE Change_in_Mean_Sea_Levels
ALTER COLUMN Date TYPE DATE
USING TO_DATE(Date, 'MM/DD/YYYY');


