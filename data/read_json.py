import json

with open('data/questions.json') as f:
    questions = json.load(f)


for question in questions:
    print(question['question'])
    
    if question['answer'] == 'A':
        print(question['A'])
    elif question['answer'] == 'B':
        print(question['B'])
    elif question['answer'] == 'C':
        print(question['C'])
    elif question['answer'] == 'D':
        print(question['D'])

