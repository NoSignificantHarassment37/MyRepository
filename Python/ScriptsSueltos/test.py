from pathlib import Path
import random
a = 0
mayoresA50 = 0
menoresA50 = 0
for i in range(1, 10001):
    a = random.randint(1, 100)
    if(a > 50):
        mayoresA50 += 1
    else:
        menoresA50 += 1
        
print(menoresA50, mayoresA50)