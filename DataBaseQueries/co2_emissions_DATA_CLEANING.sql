--cleaning co2_emissions data
select * from  co2_emissions

select count(*) from co2_emissions
--8910

--removing null values
delete  FROM co2_emissions WHERE country IS NULL;

---removing duplicates:
WITH duplicates AS (
    SELECT objectid, ROW_NUMBER() OVER (PARTITION BY objectid,indicator,cts_code,industry) AS rn
    FROM co2_emissions
)        SELECT objectid FROM duplicates WHERE rn > 1

DELETE FROM co2_emissions
WHERE objectid IN (
    SELECT objectid FROM duplicates WHERE rn > 1
);