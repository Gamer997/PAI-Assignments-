# # importing files
# # Step 3 and 4: 
# #Creating a Question 1 function
# def Q1(dictionary_file_1, sentences_file_1,dictionary_file_2 ):
#     #Creating a list of corrected words or corrected urdu_dictionary
#     with open(dictionary_file_1, "r", encoding="utf-8") as dictionary_file:
#         urdu_dictionary = list(dictionary_file.read().split())
#     with open(dictionary_file_1, "r", encoding="utf-8") as dictionary_file_2:
#         urdu_dictionary_2 = list(dictionary_file_2.read().split())
#     urdu_dictionary = urdu_dictionary + urdu_dictionary_2
#     urdu_dictionary = set(urdu_dictionary)
#     #Reading sentences from second file
#     with open(sentences_file_1, "r", encoding="utf-8") as sentences_file:
#         sentences = sentences_file.read().splitlines()
# #Checking out matching of word and inserting spaces
    
#     def checking_out_match(sentence):
#         words = []
#         i = 0
#         while i < (len(sentence)):
#             matched_word = ""
#             for j in range(len(sentence), i , -1):
#                 word_candidate = sentence[i:j]
#                 if word_candidate in urdu_dictionary:
#                     matched_word = word_candidate
#                     #print(word_candidate)
#                     break
#             if matched_word:
#                 words.append(matched_word)
#                 i += len(matched_word)
#             else:
#                 # If no match is found, insert a space and move to the next character
#                 words.append(sentence[i])
#                 i += 1
#         return " ".join(words)


#     # Process and print sentences with spaces inserted
#     output_file_path = "C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/corrected_sentences.txt"
#     with open(output_file_path, "w", encoding="utf-8") as output_file:
#         for sentence in sentences:
#             segmented_sentence = checking_out_match(sentence)
#             print(segmented_sentence)
#             output_file.write(segmented_sentence + "\n")
            
#     return True


# file_1 = 'C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/words.txt'
# file_3 = 'C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/bigram_words.txt'
# file_2 = 'C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/word_test.txt'
# #Passing addresses of files in Q1 function
# correct = Q1(file_1,file_2, file_3)
# # print(file_without_spaces)

#Creating a Question 1 function
def Q1(dictionary_file_1, sentences_file_1,dictionary_file_2 ):
    #Creating a list of corrected words or corrected urdu_dictionary
    with open(dictionary_file_1, "r", encoding="utf-8") as dictionary_file:
        urdu_dictionary = list(dictionary_file.read().split())
    with open(dictionary_file_1, "r", encoding="utf-8") as dictionary_file_2:
        urdu_dictionary_2 = list(dictionary_file_2.read().split())
    urdu_dictionary = urdu_dictionary + urdu_dictionary_2
    urdu_dictionary = set(urdu_dictionary)
    #Reading sentences from second file
    with open(sentences_file_1, "r", encoding="utf-8") as sentences_file:
        sentences = sentences_file.read().splitlines()
#Checking out matching of word and inserting spaces
    
    def checking_out_match(sentence):
        words = []
        i = 0
        while i < (len(sentence)):
            matched_word = ""
            for j in range(  i , len(sentence)):
                word_to_be_checked = sentence[i:j]
                if word_to_be_checked in urdu_dictionary:
                    matched_word = word_to_be_checked
                    #print(word_candidate)
                    break
            if matched_word:
                words.append(matched_word)
                i += len(matched_word)
            else:
                # If no match is found, insert a space and move to the next character
                words.append(sentence[i])
                i += 1
        return " ".join(words)


    # Process and print sentences with spaces inserted
    output_file_path = "C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/corrected_sentences.txt"
    with open(output_file_path, "w", encoding="utf-8") as output_file:
        for sentence in sentences:
            segmented_sentence = checking_out_match(sentence)
            print(segmented_sentence)
            output_file.write(segmented_sentence + "\n")
            
    return True
