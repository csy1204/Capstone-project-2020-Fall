import json

json_data = open('test.json').read()
data = json.loads(json_data)

output = open("output.txt", 'w')
output.write(json.dumps(data, indent='\t'))
    
output.close()
