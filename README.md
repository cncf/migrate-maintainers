# migrate-maintainers-csv

## Description

Migrate maintainer data from the maintainer CSV file and shapes that data so that it is added to cncf/people.json

## Usage

Place the input files, maintainer.csv and the people.json you want to update in the ./data/input directory.

Run the following:

```shell
npm install
node index.js 
```

Two output file are created in the ./data/output folder
maintainers.json is a temporary 
The Fills out the missing fields in the maintainer records by using the field value above in the previous record

(N.B. A maintainer with an incomplete record will inherit the voting rights of the previous record.There are three projects where this happens)

