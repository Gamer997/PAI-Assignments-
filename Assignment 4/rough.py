import random

# A list of common Urdu words for generating random lines
urdu_words = ["دل", "پیار", "محبت", "روشنی", "زندگی", "خواب", "دنیا", "آسمان", "چاند", "ستاره"]

def generate_ghazal(misra):
    ghazal = []
    
    for _ in range(6):
        # Generate a random line using the provided misra and a random word
        random_word = random.choice(urdu_words)
        line = misra + " " + random_word + "\n"
        ghazal.append(line)
    
    return ghazal

if __name__ == "__main__":
    input_misra = input("Enter a misra: ")
    generated_ghazal = generate_ghazal(input_misra)
    
    print("\nGenerated Ghazal:")
    for line in generated_ghazal:
        print(line.strip())
