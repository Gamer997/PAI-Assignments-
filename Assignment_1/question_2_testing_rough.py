str_1 = "پاکستان"
str_2 = "پاکستانف"
str_3 = "پاکتان"
str_4 = "پاسکتان"
string_1_lenght = len(str_1)
string_2_lenght = len(str_2)
string_3_lenght = len(str_3)
string_4_lenght = len(str_4)
# with open ('C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/error_words_urdu.txt',"r", encoding='utf-8') as file:
#     str_1 = file.read()
#checking if word is similar
def omiting_one_letter(string_1, string_2):
    if(string_1_lenght<string_2_lenght):
        counter = 0
        
        str_1 = str_1 + " "*(string_2_lenght-string_1_lenght)
        for i in str_2:
            if(i!=str_1[counter]):
                print(f"{i} is missing word in {str_2}")
            counter = counter + 1   
         

if(string_3_lenght<string_1_lenght):
    print("hlel")
    counter = 0
    str_3 = str_3 + " "*(string_1_lenght-string_3_lenght)
    for i in str_1:
        if(i!=str_3[counter]):
            print(f"{i} is missing word in {str_1}")
            counter -=1
        counter = counter + 1    
print(f"{string_4_lenght} and {string_1_lenght}")
if(string_4_lenght==string_1_lenght):
    difference_counter = 0
    counter = 0
    val_1 =""
    val_2 = ""
    index_1 = 0
    index_2 = 0
    for i in str_4:
        if(i!=str_1[counter]):
            difference_counter+=1
            if(difference_counter==1):
                    val_1 = val_1 + i
                    index_1 = counter
            if(difference_counter==2):
                val_2 = val_2 + i
                index_2 = counter

        counter+=1
    if(difference_counter==1):
        print("One letter is different from original one.")
    if(difference_counter==2 and val_1==str_1[index_2] and val_2==str_1[index_1]):
        print("Two letter are transposed")

