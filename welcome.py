import math 
print(bool("FALSE"))
age1 = 21   
msgtext = "audult" if age1 > 18 else "minor"
print(f"You are an {msgtext}.")
x = input("Enter a age: ")
y = int(x)  # Convert input to integer
print(type(x))
if (x>18): 
    print(type(x))
    print("You are an adult.")
else:
    print("You are a minor.")
#x = int(x)  # Convert input to integer
print("your age is: ", x)
a = 1
b = 2
def add(x, y):  
    return x + y
def main():
    result = add(a, b)
    print(f"The sum of {a} and {b} is {result}")
if __name__ == "__main__":
    main()
  
#\represents to add quote or next line etc
    student_name = "John \n Doe"
    student_name.capitalize()  # This will not change the original string, it just returns a new one
    print(f"Student Name: {student_name}")
    print(f"Student Name: {student_name.capitalize()}")  # Display the capitalized name
    print(f"Student Name: {student_name.upper()}")  # Display the name in uppercase
    print(f"Student Name: {student_name.lower()}")  # Display the name in lowercase
    print(f"Student Name: {student_name.title()}")  # Display the name in title case
    print(f"Student Name: {student_name.strip()}")  # Remove leading and trailing whitespace
    print(f"Student Name: {student_name.replace('John', 'Jane')}")  # Replace 'John' with 'Jane'
    print(f"Student Name: {student_name.split()}")  # Split the name into a list of words
    print(f"First character: {student_name[0]}")  # Access the first character
    print(f"Last character: {student_name[-1]}")  # Access the last character
    print(f"First character: {student_name[0]}")  # Access the first character
    print(f"Last character: {student_name[-1]}")  # Access the last character   
    print(f"find jo  character: {student_name.find("Jo")}")  # Access the first character   
    student_name.find("Jo")  # Find the index of "Jo" in the string
    print(f"find jo  character: {student_name.find('Jo')}")  # Access the first character  
    msg=(student_name.upper())

    print(student_name[0]+""+msg[-1])
    print({10//3})  # Integer division

    print(f"Uppercase Student Name: {msg}")
    
    rating = 4.5
    is_student = False
    if is_student:  
        print(f"{student_name} is a student with a rating of {rating}.")  
    else:
        print(f"{student_name} is not a student, but has a rating of {rating}.")  
    age = 12 
    if age < 18:
        print(f"{student_name} is a minor.")
    elif age < 65:                                              
        print(f"{student_name} is an adult.")
   