
--cleaning change_in_mean_sea_levels data
select * from  change_in_mean_sea_levels


select count(*) from change_in_mean_sea_levels
--35604

--removing null values
delete  FROM change_in_mean_sea_levels WHERE country IS NULL;

---removing duplicates:
WITH duplicates AS (
    SELECT objectid, ROW_NUMBER() OVER (PARTITION BY objectid) AS rn
    FROM change_in_mean_sea_levels
) 
DELETE FROM change_in_mean_sea_levels
WHERE objectid IN (
    SELECT objectid FROM duplicates WHERE rn > 1
);