import json
from collections import OrderedDict

file_data = OrderedDict()

file_data["name"] = "Jo Youngmin"
file_data["age"] = 26
file_data["major"] = "Mathematics/Computer Engineering"
file_data["address"] = " 시흥시 "

print(json.dumps(file_data, ensure_ascii=False, indent="\t"))

