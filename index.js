const importCsvFile = require('./toolkit/importCsvFile.js');
const importJsonFile = require('./toolkit/importJsonFile.js');
const exportJsonFile = require('./toolkit/exportJsonFile.js');
const util = require('util')

// gh is gitHub
const ghCncfPeopleJsonFile = "./data/input/people.json"
const ghMaintainersCsvFile = "./data/input/maintainers.csv"

// CSV file converted to JSON minus no blank Project, Status and OWNERS/MAINTERS fields 
const tmpMaintainersJsonFile = "./data/output/maintainers.json"

const ghPeopleJsonNowWithMaintainers = "./data/output/people.json"

function transformMaintainerData(maintainerRecords) {
    return maintainerRecords.map((row, i) => {
        if (row.Project === null) {
            row.Project = maintainerRecords[i - 1].Project
        }
        if (row.Status === null) {
            row.Status = maintainerRecords[i - 1].Status
        }
        if (row.OWNERS_MAINTAINERS === null) {
            row.OWNERS_MAINTAINERS = maintainerRecords[i - 1].OWNERS_MAINTAINERS
        }

        return row
    });
}

function hasNoVotingRights(project) {
    if (typeof project !== 'string') {
      throw new Error('Input parameter must be a string');
    }
  
    nonVoting = project.includes('non-voting');
    return nonVoting
}

function mergeMaintainersIntoPeople(peopleRecords, maintainerRecords) {
    maintainerRecords.forEach(maintainer => {
        ghProfile = "https://github.com/"+ maintainer["Github Name"]

        var peopleIndex = getPeopleRecordIndex(peopleRecords)

        if (peopleRecordExists(peopleIndex) ) {
            if (hasNoVotingRights(maintainerRecords[peopleIndex]["Project"])) {
                peopleRecords[peopleIndex]["maintainer"] = {
                    [maintainer["Project"]] : {
                        "non-voting" : "true"
                    }
                }  
                console.log('UPDATING non-voter: %o' + peopleRecords[peopleIndex] )

            } else {
                peopleRecords[peopleIndex]["maintainer"] = {
                    [maintainer["Project"].toString()] : "true",
                }
                console.log('UPDATING voter: %o', peopleRecords[peopleIndex] )
            }
        } else {
            
            if (typeof maintainer["Project"] ==="string" && hasNoVotingRights(maintainer["Project"])) {
                const newPersonRecord =  {
                    name: maintainer["Maintainer Name"],
                    company: maintainer["Company"],
                    github: 'https://www.github.com/' + maintainer["Github Name"],
                    source: 'migrated from maintainer.csv',
                    maintainer : {
                        [maintainer["Project"]] : {
                          'non-voting': 'true'   
                        },
                    }
                }
                peopleRecords.push(newPersonRecord) 
                
                console.log('CREATING new non-voter %o ' ,  newPersonRecord)
            } else {
                const newPersonRecord =  {
                    name: maintainer["Maintainer Name"],
                    company: maintainer["Company"],
                    github: 'https://www.github.com/' + maintainer["Github Name"],
                    source: 'migrated from maintainer.csv',
                    maintainer : {
                        [maintainer["Project"]] : "true",
                    }
                } 
                peopleRecords.push(newPersonRecord) 
                console.log('CREATING new voter %o ' , newPersonRecord)
            }
        }

        return peopleRecords
    });
}

importCsvFile(ghMaintainersCsvFile).then(maintainerRecords => {
    const maintainers = transformMaintainerData(maintainerRecords);
    exportJsonFile(tmpMaintainersJsonFile, maintainers)
    importJsonFile(ghCncfPeopleJsonFile).then(peopleRecords => {
        const merged = mergeMaintainersIntoPeople(peopleRecords, maintainerRecords);
        return exportJsonFile(ghPeopleJsonNowWithMaintainers, peopleRecords );
    }).then(() => {
        console.log('INFO: Merged maintainer data into people.json')
    }).catch(err => {
        console.error('ERROR: merging maintainer data into people.json');
        console.error(err);
    });
})

function peopleRecordExists(peopleIndex) {
    return peopleIndex !== -1;
}

function getPeopleRecordIndex(peopleRecords) {
    return peopleRecords.findIndex(p => {
        return p["github"] === ghProfile;
    });
}

