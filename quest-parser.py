f = open("quest-output.txt", "a", encoding="utf-8")

f.write("[")
fInput = open("quests.txt", "r");
for line in fInput:
    f.write("\"")
    f.write(line.strip("\n"))
    f.write("\"")
    f.write(",")

f.write("]")

f.close()
fInput.close()
