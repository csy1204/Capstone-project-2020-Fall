import json
from collections import OrderedDict

file_data = OrderedDict()

file_data["name"] = "Jo Youngmin"
file_data["age"] = 26
file_data["major"] = "Mathematics/Computer Engineering"

print(json.dumps(file_data, ensure_ascii=False, indent="\t"))

