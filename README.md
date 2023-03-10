# migrate-maintainers-csv

## Description

Migrate maintainer data from the maintainer CSV file and shapes that data so that it is added to cncf/people.json

## Usage

Place input files, maintainer.csv and people.json in the ./data/input directory

run node index.js 
The Fills out the missing fields in the maintainer records by using the field value above in the previous record
(N.B. A maintainer with an incomplete record will inherit the voting rights of the previous record.There are three projects where this happens)

## Running migration script

npm build
node index.js

Check output directory

