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

Two output files are created in the `./data/output` folder

### ./data/output/maintainer.json

maintainers.json is a temporary file that is a JSON version of the maintainers.csv file.
For records in the maintainers.csv file that have empty fields the JSON version inherits the 
project name of the previouw recrod in the CSV verion of maintainers.

(N.B. A maintainer with an incomplete record will inherit the non-voting rights of the previous record.There are three projects where this happens)

### ./data/output/people.json

Updated people.json with added and updated maintainers

The program write actions taken to STDOUT as it runs.

