import csv

filename = "2019-01-nwtc-temp-2m.csv"

result = []
with open(filename, newline="") as datafile:
    reader = csv.reader(datafile, delimiter=",")
    for row in reader:
        result.append(row)

result = result[1:-1]

print(result[0])
