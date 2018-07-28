import os
import csv

votes = []
canidate_votes = []
vote_results = []
percentage = []

#open csv file, skip header
file_path = "Resources/election_data.csv"
with open(file_path, "r") as election_file:
    election_raw = csv.reader(election_file, delimiter = ",")

    next(election_raw, None)

    #populate list with all votes
    for row in election_raw:
        votes.append(row[2])

    #get unique values in votes and creat list
    canidates = list(set(votes))

    #calculate how many canidates and total votes
    canidate_len = len(canidates)
    population = len(votes)

    #count votes for each canidate, determine winner, and winner's index position
    for can in canidates:
        canidate_votes.append(int(votes.count(can)))

    winner = max(canidate_votes)
    winner_index = canidate_votes.index(winner)
    
    #determine each canidates percentage of vote    
    for percent in canidate_votes:
        percentage.append(round((percent/population*100), 3))

    
    print("Election Results")
    print("=======================")
    print("Total Votes: " + str(population))
    print("-----------------------")
    for x in range(canidate_len):
        print(str(canidates[x] + ": " + str(percentage[x]) + "% (" + str(canidate_votes[x]) + ")"))
    print("-----------------------")
    print("Winner: " + canidates[winner_index])

output_file = os.path.join("PyPoll.txt")

with open(output_file, mode="w", newline=None) as textfile:
    textfile.write("Election Results\n")
    textfile.write("=======================\n")
    textfile.write("Total Votes: " + str(population) + "\n")
    textfile.write("-----------------------\n")
    for x in range(canidate_len):
        textfile.write(str(canidates[x] + ": " + str(percentage[x]) + "% (" + str(canidate_votes[x]) + ")\n"))
    textfile.write("-----------------------\n")
    textfile.write("Winner: " + canidates[winner_index])
    textfile.close()