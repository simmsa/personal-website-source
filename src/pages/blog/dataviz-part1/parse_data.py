import csv
from datetime import datetime

import matplotlib
import matplotlib.pyplot as plt

matplotlib.use("Agg")

filename = "2019-01-nwtc-temp-2m.csv"

data = []
with open(filename) as datafile:
    reader = csv.reader(datafile)
    for row in reader:
        data.append(row)

# Remove the first row of data
data = data[1:-1]


def convert_celsius_to_farenheit(celsius_deg):
    return (celsius_deg * 9.0 / 5.0) + 32.0


temperature_data = []
for row in data:
    temperature_data.append(convert_celsius_to_farenheit(float(row[2])))


min_temp = temperature_data[0]
max_temp = min_temp
for temp in temperature_data:
    if temp < min_temp:
        min_temp = temp

    if temp > max_temp:
        max_temp = temp


def format_temp(input):
    return "{:.0f}°F".format(input)


print(
    "In January 2019 the temperature ranged from {} to {}".format(
        format_temp(min_temp), format_temp(max_temp)
    )
)


dates = []
for row in data:
    # 1/1/2019 00:00
    date = datetime.strptime("{} {}".format(row[0], row[1]), "%m/%d/%Y %H:%M")
    dates.append(date)

plt.rcParams["font.family"] = "Roboto"

plt.plot(dates, temperature_data)

plt.title("NWTC - Temperature @ 2m - January 2019")
plt.ylabel("Temperature (°F)")
plt.xticks(rotation=45)
# Force matplotlib to recalculate boundaries to avoid text clipping after rotating xticks
plt.tight_layout()

plt.savefig("January-2019-NWTC-Temp-2m-Plot-Pretty.png", dpi=500)
