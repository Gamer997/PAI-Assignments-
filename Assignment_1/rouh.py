def Q2 (dictionary,wrong_file):
    dictionary_words = []
    # def testing_for_extra_letter(wrong_word, word_2):
    #     counter = 0
    #     diff_counter = 0
    #     for i in wrong_word:
            
    #         if(i!=word_2[counter]):
    #             diff_counter+=1
            
    #             counter+=1

    #         if diff_counter > 1:
    #             return False
    #     return True

    def testing_for_extra_letter(wrong_word, word_2):
        # if len(wrong_word) - len(word_2) != 1:
        #     return False  # Words have different lengths, more than one letter difference

        i = 0
        j = 0
        extra_letter_found = False

        while i < len(wrong_word) and j < len(word_2):
            if (wrong_word[i] != word_2[j]):
                if extra_letter_found:
                    return False  # Already found an extra letter, more than one letter difference
                extra_letter_found = True
                i += 1
            else:
                i += 1
                j += 1

        return extra_letter_found
    
    # def testing_for_omision(words, wrong_word):
    #     counter = 0
    #     diff_counter = 0
    #     words = words + " "*(len())
    #     for i in wrong_word:

    #         if(i!=words[counter-1]):
    #             diff_counter+=1
    #             counter+=1
                
    #         counter-=1

    #         if diff_counter > 1:
    #             return False
    #         else:
    #             return True

    def testing_for_omission(words, wrong_word):
        if len(words) - len(wrong_word) != 1:
            return False  # Words have different lengths, more than one letter difference

        i = 0
        j = 0
        omission_found = False

        while i < len(words) and j < len(wrong_word):
            if words[i] != wrong_word[j]:
                if omission_found:
                    return False  # Already found an omission, more than one letter difference
                omission_found = True
                i += 1
            else:
                i += 1
                j += 1

        return omission_found
    def testing_for_different_letters(wrong_word, words):
        counter = 0
        if len(wrong_word) - len(words) !=0:
            return False
        for i in range(len(wrong_word)):
            if wrong_word[i] != words[i]:
                counter+=1
            if (counter>1):
                return False
        return True
            
    
    with open(dictionary, 'r', encoding='utf-8') as dict_file:
        for line in dict_file:
            dictionary_words.append(line.strip())
    wrong_word_list = []
    with open(wrong_file, 'r', encoding='utf-8') as wr_file:
        for line in wr_file:
            wrong_word = line.strip()
            if wrong_word in dictionary_words:
                print(wrong_word)
                print("Correct Word!")
            
            elif(wrong_word not in dictionary_words):
                
                for words in dictionary_words:
                    if (len(wrong_word)-1 ==len(words)):
                        
                        if(testing_for_extra_letter(wrong_word, words)):
                            print(wrong_word)
                            print(f"One Letter added to {words}")
                    elif(len(wrong_word)+1 == len(words)):
                        if(testing_for_omission(words, wrong_word)):
                            print(wrong_word)
                            print(f"One letter is omited from{words}")
                    elif(len(wrong_word) == len(words)):
                        if(testing_for_different_letters(wrong_word, words)):
                            print(wrong_word)
                            print(f"One letter is different from{words}")
                        
                    
wrong_words_file = 'C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/error_words_urdu.txt'
dictionary_file = 'C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/words.txt'
correct2=Q2(dictionary_file,wrong_words_file)