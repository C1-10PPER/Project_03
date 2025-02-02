--cleaning climate_related_disasters_frequncy data
select * from  climate_related_disasters_frequncy


select count(*) from climate_related_disasters_frequncy
--970

--removing null values
delete  FROM climate_related_disasters_frequncy WHERE indicator IS NULL;



---spliting indicator column into two separate columns named "indicator" and "disastor"
ALTER TABLE climate_related_disasters_frequncy
ADD COLUMN disaster TEXT;


UPDATE climate_related_disasters_frequncy
SET 
    indicator = split_part(indicator, ':', 1),
    disaster = split_part(indicator, ':', 2);

--rearrange the field orders
CREATE TABLE climate_related_disasters_frequncy_new AS
SELECT 
    ObjectId , Country ,  ISO2,    ISO3 ,    Indicator,	disaster,    Unit ,    Source ,    CTS_Code ,    CTS_Name ,
    CTS_Full_Descriptor,    F1980 ,    F1981,    F1982 ,    F1983 ,    F1984 ,    F1985 ,    F1986 ,    F1987 ,
    F1988 ,    F1989 ,    F1990 ,    F1991 ,    F1992 ,    F1993 ,    F1994 ,    F1995 ,
    F1996 ,    F1997 ,    F1998 ,    F1999 ,    F2000 ,    F2001 ,    F2002 ,    F2003 ,
    F2004 ,    F2005 ,    F2006 ,    F2007 ,    F2008 ,    F2009 ,    F2010 ,    F2011 ,
    F2012 ,    F2013 ,    F2014 ,    F2015 ,    F2016 ,    F2017 ,    F2018 ,    F2019 ,
    F2020 ,    F2021 ,    F2022 
FROM climate_related_disasters_frequncy;

--drop old table 
DROP TABLE climate_related_disasters_frequncy;

--rename new table to old name
ALTER TABLE climate_related_disasters_frequncy_new
RENAME TO climate_related_disasters_frequncy;

--trim any exta space before and after the disaster field

UPDATE climate_related_disasters_frequncy
SET disaster = TRIM(disaster);

---removing duplicates:
WITH duplicates AS (
    SELECT objectid, ROW_NUMBER() OVER (PARTITION BY objectid) AS rn
    FROM climate_related_disasters_frequncy
)
DELETE FROM climate_related_disasters_frequncy
WHERE objectid IN (
    SELECT objectid FROM duplicates WHERE rn > 1
);

--delete all records where disaster is 'TOTAL' ( not needed for the visual)

select *
FROM climate_related_disasters_frequncy
WHERE disaster ILIKE 'total';

DELETE FROM climate_related_disasters_frequncy
WHERE disaster ILIKE 'total';



