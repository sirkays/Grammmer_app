import sys
import nltk
sentence = sys.argv[1]
#value=''
tokens = nltk.word_tokenize(sentence) 
tagged = nltk.pos_tag(tokens)
for tag in tagged:
	for item in tag:
		#value=item
		print(item)

#sentence = sys.argv[1]
#print(value)
sys.stdout.flush()