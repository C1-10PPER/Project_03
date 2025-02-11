drop table if exists Co2_Emissions;
CREATE TABLE Co2_Emissions (
    ObjectId SERIAL PRIMARY KEY,
    Country TEXT NOT NULL,
    ISO2 CHAR(2) NOT NULL,
    ISO3 CHAR(3) NOT NULL,
    Indicator TEXT NOT NULL,
    Unit TEXT,
    Source TEXT,
    CTS_Code TEXT,
    CTS_Name TEXT,
    CTS_Full_Descriptor TEXT,
    Industry TEXT,
    Scale TEXT,
    "1995" NUMERIC,
    "1996" NUMERIC,
    "1997" NUMERIC,
    "1998" NUMERIC,
    "1999" NUMERIC,
    "2000" NUMERIC,
    "2001" NUMERIC,
    "2002" NUMERIC,
    "2003" NUMERIC,
    "2004" NUMERIC,
    "2005" NUMERIC,
    "2006" NUMERIC,
    "2007" NUMERIC,
    "2008" NUMERIC,
    "2009" NUMERIC,
    "2010" NUMERIC,
    "2011" NUMERIC,
    "2012" NUMERIC,
    "2013" NUMERIC,
    "2014" NUMERIC,
    "2015" NUMERIC,
    "2016" NUMERIC,
    "2017" NUMERIC,
    "2018" NUMERIC
);
