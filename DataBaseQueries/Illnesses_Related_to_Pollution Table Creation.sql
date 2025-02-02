drop table if exists Illnesses_Related_to_Pollution;
CREATE TABLE Illnesses_Related_to_Pollution (
    geo_group TEXT,
    geo_group_member TEXT,
    year INT,
    sex TEXT,
    age_group TEXT,
    ghe_cause TEXT,
    mean_value NUMERIC,
    mean_lower_value NUMERIC,
    mean_upper_value NUMERIC,
    mean_value_95_ci TEXT,
    age_standardized_rate NUMERIC,
    age_standardized_rate_lower_value NUMERIC,
    age_standardized_rate_upper_value NUMERIC,
    age_standardized_rate_95_ci TEXT
);
