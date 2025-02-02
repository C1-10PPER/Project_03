
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

--aggregating the data for each year
SELECT
    country,
    ROUND(AVG("1961"), 2) AS "1961",
    ROUND(AVG("1962"), 2) AS "1962",
    ROUND(AVG("1963"), 2) AS "1963",
    ROUND(AVG("1964"), 2) AS "1964",
    ROUND(AVG("1965"), 2) AS "1965",
    ROUND(AVG("1966"), 2) AS "1966",
    ROUND(AVG("1967"), 2) AS "1967",
    ROUND(AVG("1968"), 2) AS "1968",
    ROUND(AVG("1969"), 2) AS "1969",
    ROUND(AVG("1970"), 2) AS "1970",
    ROUND(AVG("1971"), 2) AS "1971",
    ROUND(AVG("1972"), 2) AS "1972",
    ROUND(AVG("1973"), 2) AS "1973",
    ROUND(AVG("1974"), 2) AS "1974",
    ROUND(AVG("1975"), 2) AS "1975",
    ROUND(AVG("1976"), 2) AS "1976",
    ROUND(AVG("1977"), 2) AS "1977",
    ROUND(AVG("1978"), 2) AS "1978",
    ROUND(AVG("1979"), 2) AS "1979",
    ROUND(AVG("1980"), 2) AS "1980",
    ROUND(AVG("1981"), 2) AS "1981",
    ROUND(AVG("1982"), 2) AS "1982",
    ROUND(AVG("1983"), 2) AS "1983",
    ROUND(AVG("1984"), 2) AS "1984",
    ROUND(AVG("1985"), 2) AS "1985",
    ROUND(AVG("1986"), 2) AS "1986",
    ROUND(AVG("1987"), 2) AS "1987",
    ROUND(AVG("1988"), 2) AS "1988",
    ROUND(AVG("1989"), 2) AS "1989",
    ROUND(AVG("1990"), 2) AS "1990",
    ROUND(AVG("1991"), 2) AS "1991",
    ROUND(AVG("1992"), 2) AS "1992",
    ROUND(AVG("1993"), 2) AS "1993",
    ROUND(AVG("1994"), 2) AS "1994",
    ROUND(AVG("1995"), 2) AS "1995",
    ROUND(AVG("1996"), 2) AS "1996",
    ROUND(AVG("1997"), 2) AS "1997",
    ROUND(AVG("1998"), 2) AS "1998",
    ROUND(AVG("1999"), 2) AS "1999",
    ROUND(AVG("2000"), 2) AS "2000",
    ROUND(AVG("2001"), 2) AS "2001",
    ROUND(AVG("2002"), 2) AS "2002",
    ROUND(AVG("2003"), 2) AS "2003",
    ROUND(AVG("2004"), 2) AS "2004",
    ROUND(AVG("2005"), 2) AS "2005",
    ROUND(AVG("2006"), 2) AS "2006",
    ROUND(AVG("2007"), 2) AS "2007",
    ROUND(AVG("2008"), 2) AS "2008",
    ROUND(AVG("2009"), 2) AS "2009",
    ROUND(AVG("2010"), 2) AS "2010",
    ROUND(AVG("2011"), 2) AS "2011",
    ROUND(AVG("2012"), 2) AS "2012",
    ROUND(AVG("2013"), 2) AS "2013",
    ROUND(AVG("2014"), 2) AS "2014",
    ROUND(AVG("2015"), 2) AS "2015",
    ROUND(AVG("2016"), 2) AS "2016",
    ROUND(AVG("2017"), 2) AS "2017",
    ROUND(AVG("2018"), 2) AS "2018",
    ROUND(AVG("2019"), 2) AS "2019",
    ROUND(AVG("2020"), 2) AS "2020",
    ROUND(AVG("2021"), 2) AS "2021",
    ROUND(AVG("2022"), 2) AS "2022",
    ROUND(AVG("2023"), 2) AS "2023"
FROM annual_surface_temp_change
GROUP BY country
ORDER BY country;






