# migrate-maintainers-csv

## Description

Migrate maintainer data from the maintainer CSV file and shapes that data so that it is added to cncf/people.json

The current intention is that the script is only run once to stop using foundation/maintainers.csv
and instead use cncf/people.json

## Usage

Place the input files, maintainer.csv and the people.json you want to update in the ./data/input directory.

Run the following:

```shell
npm install
node index.js 
```

`./data/output/people.json` will have captured the data in maintainer.csv

If you are happy with the changes that are to be incorporated in the cncf/people.json file, then you can submit 
`./data/output/people.json` via a PR to the cncf/people repo

## Acceptance Testing

Changes made to the file `migrate-maintainers/data/input/people.json` are sent to `migrate-maintainers/data/output/people.json`
The PR will present a text-based diff of the proposed chages but the problem is that the change set is large and hard to review

This script captures the *types of changes* and the *maintainer records* involved in the changes.

The types of changes and associated person records are reported on in `./data/output/reports` to assist in reviewing those changes.

### Reporting breakdown

Here's a description of the changes that can be made to `migrate-maintainers/data/output/people.json`

For this migration, there are two types of maintainers

  1. maintainers *with* voting rights (the default case)
  2. maintainers *without* voting rights. (the exception)
  
There are two types of changes we make to people.json
  
  1. An existing person entry in people.json has been *updated*
  2. An new person entry has been *added* to people.json
  
The reports are json files named to cover the above types of changes, namely:

newNonVoters.json
newVoters.json
updatedNonVoters.json
updatedVoters.json

### Intermediate file maintainers.json is a tidy up of maintainers.csv

maintainers.json is a temporary JSON version of the maintainers.csv file.

For records in the maintainers.csv file that have *empty Project and Status fields* the JSON version uses the project name of the previous line in the CSV file.

The maintiners.json file is then used to as a data source to update the people.json file.

(N.B. A maintainer with an incomplete record will inherit the non-voting rights of the previous record. There are three projects where this happens)