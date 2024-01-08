import pandas as pd

subject = input("Enter the subject: ")
excel_file = 'timetable.xlsx'  # Replace with the actual file path

class_names = []
room_numbers = []
class_times = []

# Read data from all sheets in the Excel file
all_data = pd.read_excel(excel_file, sheet_name=None, header=None, skiprows=4)
days_name = []
for sheet_name, df in all_data.items():
    for index, row in df.iterrows():
        row_values = [str(cell) for cell in row]
        #print(row_values)
        for col_index in range(1, len(row_values)):
            class_time_ = row_values[col_index]
            class_times.append(class_time_)
            days_name.append(sheet_name)
            if subject in row_values[col_index]:
                class_name = row_values[col_index]
                room_number = row_values[0]

                # Get the class time from the first element of the column
                #class_time = row_values[0]

                class_names.append(class_name)
                room_numbers.append(room_number)
                #class_times.append(class_time)

if class_names:
    for i in range(len(class_names)):
        print(f"Class {i + 1} - Class info: {class_names[i]}, Room: {room_numbers[i]}, Class Times: {class_times[i]}, Day: {days_name[i]}")
else:
    print(f"No classes found for {subject}.")