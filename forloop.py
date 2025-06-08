# forloop.py
for i in range(1, 3):  # Loop from 1 to 10
    print(f"Number: {i}")  # Print the current number       
    if i % 2 == 0:  # Check if the number is even
        print(f"{i} is even.")
    else:  # If the number is not even, it must be odd
        print(f"{i} is odd.")
#for number 3
for i in range(1, 2):
    if i == 5:
        break
    print(i)
#exmple 2
for i in range(1, 3):
    if i == 5:
        break
    print(i)
else:
    print("Loop completed without hitting break.")
    # iteratable example
    for x in "JAFFAR":
        print(x)  # Print each value in the iterable