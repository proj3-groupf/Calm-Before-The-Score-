# file to reference writing to a json file

import json

def writeToJSONFile(path, fileName, data):
    filePathNameWext = path + '/' + fileName + '.json'
    with open(filePathNameWext, 'w') as fp:
        json.dump(data, fp)


# Here's an example of how to use it
data = {}
data['key'] = 'value'

writeToJSONFile('./', 'file-name', data)