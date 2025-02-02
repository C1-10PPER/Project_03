
--cleaning annual_surface_temp_change data
select * from  annual_surface_temp_change


select count(*) from annual_surface_temp_change
--236

--removing null values
delete  FROM annual_surface_temp_change WHERE country IS NULL;

---removing duplicates:
WITH duplicates AS (
    SELECT objectid, ROW_NUMBER() OVER (PARTITION BY country) AS rn
    FROM annual_surface_temp_change
)
DELETE FROM annual_surface_temp_change
WHERE objectid IN (
    SELECT objectid FROM duplicates WHERE rn > 1
);






