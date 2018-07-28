import os
import csv
from datetime import datetime


month = []
income = []
total = 0
monthly_change = []


#open file and skip header
bank_path = "Resources/budget_data.csv"
with open(bank_path, "r") as bank_file:
    bank_data = csv.reader(bank_file, delimiter = ",")

    next(bank_data, None)
    
#populate lists with month and income data, total income
    for row in bank_data:
        month.append(row[0])
        income.append(int(row[1]))
        total = total + int(row[1])

#calculate time, populate list with change in income month to month
    time = len(month)
    for i in range(time-1):
        monthly_change.append(income[i+1]-income[i])


    print("Financial Analysis")
    print("_________________________")
    print("Total Months: " + str(time))
    print("Total: $" + str(total))

  #calculate aveage change in income
    change = ((income[-1]) - (income[0]))
    print("Average Change: $" + str(change/(time-1)))

#function to take change between two months income value and return formated month/year of later month
    def dickens(month_input):
        monthly_index = (monthly_change.index(month_input))
        monthly_date = month[monthly_index +1]
        time_org = datetime.strptime(monthly_date, '%b-%y')
        time_fixed = datetime.strftime(time_org, '%b-%Y')
        return time_fixed
    
    min_monthly_amt =min(monthly_change)
    max_monthly_amt = max(monthly_change)
    
    print("Greatest Increase in Profits: " + dickens(max_monthly_amt) + " ($" + str(max_monthly_amt) + ")")
    print("Greatest Decrease in Profits: "+ dickens(min_monthly_amt) + " ($" + str(min_monthly_amt) + ")")

output_file = os.path.join("PyBank.txt")

with open(output_file, mode="w", newline=None) as textfile:
    textfile.write("Financial Analysis\n")
    textfile.write("_______________________\n")
    textfile.write("Total Months: " + str(time) + "\n")
    textfile.write("Total: $" + str(total) + "\n")
    textfile.write("Average Change: $" + str(change/(time-1)) + "\n")
    textfile.write("Greatest Increase in Profits: " + dickens(max_monthly_amt) + " ($" + str(max_monthly_amt) + ")\n")
    textfile.write("Greatest Decrease in Profits: "+ dickens(min_monthly_amt) + " ($" + str(min_monthly_amt) + ")\n")
    textfile.close()
