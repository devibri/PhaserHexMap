f = open("output.txt", "w", encoding="utf-8")

f.write("[")
fInput = open("occupations.txt", "r"); # change this to the name of the file you want to turn into an array
for line in fInput:
    f.write("\"")
    f.write(line.strip("\n"))
    f.write("\"")
    f.write(",")
f.write("]")

f.close()
fInput.close()
