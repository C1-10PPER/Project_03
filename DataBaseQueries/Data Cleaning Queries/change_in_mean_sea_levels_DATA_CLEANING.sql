
--cleaning change_in_mean_sea_levels data
select * from  change_in_mean_sea_levels;

select * from change_in_mean_sea_levels;

select count(*) from change_in_mean_sea_levels;
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
    EXTRACT(YEAR FROM date)::INT AS date,cts_name AS region, measure,round(AVG(value),2) AS avg_change,round(MIN(value),2) AS min_change,round(MAX(value),2) AS max_change,
    COUNT(*) AS data_points,Country,Indicator,Unit,	Source,	CTS_Code,CTS_Name,CTS_Full_Descriptor,Measure,Value	
FROM
    change_in_mean_sea_levels
GROUP BY
    date, cts_name, measure,Country,Indicator, Unit,Source,CTS_Code,CTS_Name,CTS_Full_Descriptor,Measure,Value
ORDER BY
    date, measure, avg_change DESC;