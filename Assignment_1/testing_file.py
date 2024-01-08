# Function to check if two words have exactly one letter different
def one_letter_different(word1, word2):
    if len(word1) != len(word2):
        return False
    diff_count = 0
    for i in range(len(word1)):
        if word1[i] != word2[i]:
            diff_count += 1
            if diff_count > 1:
                return False
    return diff_count == 1

# Function to check if two words have two adjacent letters transposed
def two_letters_transposed(word1, word2):
    if len(word1) != len(word2) or abs(len(word1) - len(word2)) != 2:
        return False
    index1, index2 = -1, -1
    for i in range(min(len(word1), len(word2))):
        if word1[i] != word2[i]:
            if index1 == -1:
                index1 = i
            elif index2 == -1:
                index2 = i
            else:
                return False
    return index2 - index1 == 1

# Read the dictionary words from a file (assuming 'dictionary.txt' contains the correct words)
with open('C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/words.txt', 'r', encoding='utf-8') as dict_file:
    dictionary = set(line.strip() for line in dict_file)

# Read the input words from 'wrong.txt' and process them
with open('C:/Users/Shahz/OneDrive/Desktop/Programming For AI(python)/error_words_urdu.txt', 'r', encoding='utf-8') as input_file:
    for line in input_file:
        word = line.strip()
        print(word)
        if word in dictionary:
            print("CORRECT")
        else:
            for dict_word in dictionary:
                if len(word) == len(dict_word):
                    if word in dict_word:
                        if len(dict_word) == len(word) + 1:
                            print("ONE LETTER OMITTED FROM", dict_word)
                        elif len(dict_word) == len(word) - 1:
                            print("ONE LETTER ADDED TO", dict_word)
                        elif one_letter_different(word, dict_word):
                            print("ONE LETTER DIFFERENT FROM", dict_word)
                        elif two_letters_transposed(word, dict_word):
                            print("TWO LETTERS TRANSPOSED IN", dict_word)
            if all(word not in dict_word and not one_letter_different(word, dict_word) and not two_letters_transposed(word, dict_word) for dict_word in dictionary):
                print("UNKNOWN")
        print()  # Print a blank line after each word
