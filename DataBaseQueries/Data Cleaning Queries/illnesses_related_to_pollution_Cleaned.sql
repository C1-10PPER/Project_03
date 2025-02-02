--cleaning illnesses_related_to_pollution data
select * from  illnesses_related_to_pollution;

SELECT DISTINCT * FROM illnesses_related_to_pollution;

select count(*) from illnesses_related_to_pollution;
--9100

--removing null values
delete  FROM illnesses_related_to_pollution WHERE country IS NULL;

---removing duplicates:
WITH duplicates AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY age_group,ghe_cause) AS rn
    FROM illnesses_related_to_pollution
)        SELECT * FROM duplicates WHERE rn > 1

DELETE FROM illnesses_related_to_pollution
WHERE objectid IN (
    SELECT objectid FROM duplicates WHERE rn > 1
);


SELECT 
    year, 
    age_group, 
    ghe_cause,
    round(AVG(mean_value),2) AS avg_mean_value,
    round(AVG(age_standardized_rate),2) AS avg_age_standardized_rate
FROM 
    illnesses_related_to_pollution
GROUP BY 
    year, age_group, ghe_cause
ORDER BY 
    
	 age_group ASC, avg_mean_value DESC
	
 


	
