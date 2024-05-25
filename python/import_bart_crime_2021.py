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
    location= Column(String)
    date = Column(String)
    time = Column(String)
    charge_description = Column(String)

# Download the Excel file from the website
url = 'https://www.bart.gov/sites/default/files/docs/2021%20UOF%20data%2020221007_redacted.xlsx'
response = requests.get(url)

# Load Excel data into a DataFrame
df = pd.read_excel(response.content)

#convert cit_charge to string
df['Cit: Charge'] = df['Cit: Charge'].astype(str)

# create table
Base.metadata.create_all(engine)

# create session
Session = sessionmaker(bind=engine)
session = Session()

# Iterate over DataFrame rows and insert data into the database
for index, row in df.iterrows():
    bart_crime_report_2021 = CrimeData(
        location = row['Inc: County/Location of occurrence'],
        date = row['Inc: Occurred date'],
        time = row['Inc: Occurred time'],
        charge_description = row['Cit: Charge']
    )
    session.add(bart_crime_report_2021)

# Commit the transaction
session.commit()

# Close the session
session.close()