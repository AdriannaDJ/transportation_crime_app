# import dependencies
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import requests
import pandas as pd

# create engine
engine = create_engine('postgresql://postgres:postgres@localhost:5432/bart_train_routes')

# declare base
Base = declarative_base()

class CrimeData(Base):
    __tablename__ = 'bart_crime_report_2021'

    id = Column(Integer, primary_key=True)
    inc_location_of_occurrence = Column(String)
    inc_occurred_date = Column(String)
    inc_occurred_time = Column(String)
    cit_charge = Column(String)

# Download the Excel file from the website
url = 'https://www.bart.gov/sites/default/files/docs/2021%20UOF%20data%2020221007_redacted.xlsx'
response = requests.get(url)

# Load Excel data into a DataFrame
df = pd.read_excel(response.content)

# create table
Base.metadata.create_all(engine)

# create session
Session = sessionmaker(bind=engine)
session = Session()

# Iterate over DataFrame rows and insert data into the database
for index, row in df.iterrows():
    bart_crime_report_2021 = CrimeData(
        inc_location_of_occurrence = row['Inc: County/Location of occurrence'],
        inc_occurred_date = row['Inc: Occurred date'],
        inc_occurred_time = row['Inc: Occurred time'],
        cit_charge = row['Cit: Charge']
    )
    session.add(bart_crime_report_2021)

# Commit the transaction
session.commit()

# Close the session
session.close()