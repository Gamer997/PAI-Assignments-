# # import pandas as pd

# # # Load the Excel file into a DataFrame

# # # Ask the user for the subject they are interested in
# # subject = input("Enter the subject: ")

# # # Initialize empty lists to store class details
# # class_names = []
# # room_numbers = []
# # class_times = []
# # # Iterate through the DataFrame to find the matching subject
# # for index, row in df.iterrows():
# #     # Convert the cell values to strings before checking for subject
# #     row_values = [str(cell) for cell in row]
# #    # print(row)
# #     print(row_values)
# #     if subject in (row_values[1] or row_values[2] or row_values[3] or row_values[4] or row_values[5]):  # Check the second column for subject
# #         # Extract the class time and room number
# #         room_number = row_values[0]
# #         if(subject in row_values[1]):
# #             print("true")
# #             class_name = row_values[1]
# #             class_time = " 08:30-09:50 "
# #             class_names.append(class_name)
# #             room_numbers.append(room_number)
# #             class_times.append(class_time)
# #         if(subject in row_values[2]):
# #             class_name = row_values[2]
# #             class_time = "10:00-11:20"
# #             class_names.append(class_name)
# #             room_numbers.append(room_number)
# #             class_times.append(class_time)
# #         if(subject in row_values[3]):
# #             class_name = row_values[3]
# #             class_time = "11:30-12:50"
# #             class_names.append(class_name)
# #             room_numbers.append(room_number)
# #             class_times.append(class_time)
# #         # for(subject in row_values){
# #         #     if(subject in row_values):
# #         #         print(room_number)
# #         # }
# #         if(subject in row_values[4]):
# #             class_name = row_values[4]
# #             class_time = "1:00-2:20"
# #             class_names.append(class_name)
# #             room_numbers.append(room_number)
# #             class_times.append(class_time)
# #         if(subject in row_values[5]):
# #             class_name = row_values[5]
# #             class_time = "2:30-3:50"
# #             class_names.append(class_name)
# #             room_numbers.append(room_number)
# #             class_times.append(class_time)
# #         if(subject in row_values[5]):
# #             class_name = row_values[5]
# #             class_time = "3:55-5:15"
# #             class_names.append(class_name)
# #             room_numbers.append(room_number)
# #             class_times.append(class_time)

# #         class_names.append(class_name)
# #         room_numbers.append(room_number)
# #         class_times.append(class_time)
# # #     if subject in (row_values[2]):  # Check the second column for subject
# # #         # Extract the class time and room number
# # #         class_name = row_values[2]
        
# # #         room_number = row_values[0]
# # #         if(class_name in row_values[2]):
# # #             class_time = "10:00-11:20"

            
# # #         # Append to the respective lists
# # #         class_names.append(class_name)
# # #         room_numbers.append(room_number)
# # #         class_times.append(class_time)

# # # Check if any matching classes were found
# # if class_names:
# #     # Display the matching class details
# #     for i in range(len(class_names)):
# #         print(f"Class {i+1} - Class info: {class_names[i]}, Room: {room_numbers[i]}, Class Times: {class_times[i]}")
# # else:
# #     print(f"No classes found for {subject}.")
# print( 2*"!")
# # Sample string
# my_string = "Hello !world"


# # Character to add
# character_to_add = "X"

# # Find the special character's index
# special_character = "!"

# if special_character in my_string:
#     index = my_string.index(special_character)
    
#     # Add the character after the special character
#     new_string = my_string[:index + 1] + character_to_add + my_string[index + 1:]
    
#     # Display the modified string
#     print(new_string)

