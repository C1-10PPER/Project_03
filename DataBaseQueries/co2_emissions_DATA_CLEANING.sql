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

-- Aggregate data for visualization by summing up yearly values for each country and indicator
SELECT
    country,
    indicator,
    year::INTEGER AS year,
    SUM(value) AS total_value
FROM (
    -- Unpivot year columns into a key-value format for easier aggregation
    SELECT
        country,
        indicator,
        UNNEST(ARRAY['1995', '1996', '1997', '1998', '1999', '2000',
                     '2001', '2002', '2003', '2004', '2005', '2006',
                     '2007', '2008', '2009', '2010', '2011', '2012',
                     '2013', '2014', '2015', '2016', '2017', '2018']) AS year,
        UNNEST(ARRAY[
            CASE WHEN "1995"::TEXT ~ '^\d+(\.\d+)?$' THEN "1995"::NUMERIC ELSE NULL END,
            CASE WHEN "1996"::TEXT ~ '^\d+(\.\d+)?$' THEN "1996"::NUMERIC ELSE NULL END,
            CASE WHEN "1997"::TEXT ~ '^\d+(\.\d+)?$' THEN "1997"::NUMERIC ELSE NULL END,
            CASE WHEN "1998"::TEXT ~ '^\d+(\.\d+)?$' THEN "1998"::NUMERIC ELSE NULL END,
            CASE WHEN "1999"::TEXT ~ '^\d+(\.\d+)?$' THEN "1999"::NUMERIC ELSE NULL END,
            CASE WHEN "2000"::TEXT ~ '^\d+(\.\d+)?$' THEN "2000"::NUMERIC ELSE NULL END,
            CASE WHEN "2001"::TEXT ~ '^\d+(\.\d+)?$' THEN "2001"::NUMERIC ELSE NULL END,
            CASE WHEN "2002"::TEXT ~ '^\d+(\.\d+)?$' THEN "2002"::NUMERIC ELSE NULL END,
            CASE WHEN "2003"::TEXT ~ '^\d+(\.\d+)?$' THEN "2003"::NUMERIC ELSE NULL END,
            CASE WHEN "2004"::TEXT ~ '^\d+(\.\d+)?$' THEN "2004"::NUMERIC ELSE NULL END,
            CASE WHEN "2005"::TEXT ~ '^\d+(\.\d+)?$' THEN "2005"::NUMERIC ELSE NULL END,
            CASE WHEN "2006"::TEXT ~ '^\d+(\.\d+)?$' THEN "2006"::NUMERIC ELSE NULL END,
            CASE WHEN "2007"::TEXT ~ '^\d+(\.\d+)?$' THEN "2007"::NUMERIC ELSE NULL END,
            CASE WHEN "2008"::TEXT ~ '^\d+(\.\d+)?$' THEN "2008"::NUMERIC ELSE NULL END,
            CASE WHEN "2009"::TEXT ~ '^\d+(\.\d+)?$' THEN "2009"::NUMERIC ELSE NULL END,
            CASE WHEN "2010"::TEXT ~ '^\d+(\.\d+)?$' THEN "2010"::NUMERIC ELSE NULL END,
            CASE WHEN "2011"::TEXT ~ '^\d+(\.\d+)?$' THEN "2011"::NUMERIC ELSE NULL END,
            CASE WHEN "2012"::TEXT ~ '^\d+(\.\d+)?$' THEN "2012"::NUMERIC ELSE NULL END,
            CASE WHEN "2013"::TEXT ~ '^\d+(\.\d+)?$' THEN "2013"::NUMERIC ELSE NULL END,
            CASE WHEN "2014"::TEXT ~ '^\d+(\.\d+)?$' THEN "2014"::NUMERIC ELSE NULL END,
            CASE WHEN "2015"::TEXT ~ '^\d+(\.\d+)?$' THEN "2015"::NUMERIC ELSE NULL END,
            CASE WHEN "2016"::TEXT ~ '^\d+(\.\d+)?$' THEN "2016"::NUMERIC ELSE NULL END,
            CASE WHEN "2017"::TEXT ~ '^\d+(\.\d+)?$' THEN "2017"::NUMERIC ELSE NULL END,
            CASE WHEN "2018"::TEXT ~ '^\d+(\.\d+)?$' THEN "2018"::NUMERIC ELSE NULL END
        ]) AS value
    FROM co2_emissions
) subquery
WHERE value IS NOT NULL
GROUP BY country, indicator, year
ORDER BY country, indicator, year;
