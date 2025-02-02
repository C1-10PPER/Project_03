
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

-- Extract year and aggregate data 
SELECT
    EXTRACT(YEAR FROM date)::INT AS year,
    cts_name AS region,
    measure,
    AVG(value) AS avg_change,
    MIN(value) AS min_change,
    MAX(value) AS max_change,
    COUNT(*) AS data_points
FROM
    change_in_mean_sea_levels
GROUP BY
    year, cts_name, measure
ORDER BY
    year, measure, avg_change DESC;