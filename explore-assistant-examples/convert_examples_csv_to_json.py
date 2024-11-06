import csv
import json
from urllib.parse import unquote

# Open the CSV file
f = open('input.csv', 'r')
reader = csv.DictReader(f)

# Create a dictionary
data = []

# Read each row in the CSV file
for row in reader:
    # Create a dictionary for each row
    item = {}
    item['input'] = row['Input']
    item['output'] = row['Explore Link']
    data.append(item)

# Close the CSV file
f.close()

# remove everything before "fields=" and the "&origin=share-expanded" at the end of each and every output
for item in data:
    print(item['output'])
    # check if output contains ?
    if '?' not in item['output']:
        continue
    item['output'] = item['output'].split('?')[1].split('&origin=share-expanded')[0]
    # escape quotation marks
    item['output'] = item['output'].replace('"', '\\"')
    # urldecode
    item['output'] = unquote(item['output'])
    # replace '\"=\"' with '"is"'
    item['output'] = item['output'].replace('\"=\"', '\"is\"')

# Write the data to a JSON file
with open('examples.json', 'w') as f:
    json.dump(data, f, indent=4)

print('Done!')
