import requests
import time
import os

from bs4 import BeautifulSoup
def find_value_next_to_name(url, search_term):
     # Send a GET request to the web
     response = requests.get(url)

     # Parse the HTML content of the page
     soup = BeautifulSoup(response.content, 'html.parser')

     # Find all text in the webpage
     text = soup.get_text()
     # Split the text into a list of words
     words = text.split()
    #  print(f"{words}")
     # Try to find the search term in the list of words
     if search_term in words:
         # Get the index of the search term
         name_index = words.index(search_term)
         # Return the value next to the search term
         return words[name_index + 1]
     else:
         return {response.status_code}

def calculate_percentage_alternate(percent, whole):
    """
    Calculates the percentage directly.
    Args:
        percent (float): The percentage value (e.g., 5 for 5%).
        whole (float): The total value.
    Returns:
        float: The calculated percentage.
    """
    return (whole * percent) / 100.0
# Example set with a single element




def get_word_between_dashes(my_string):
    # Find the first occurrence of "-"
    first_dash_index = my_string.find("-")

    # Find the second occurrence of "-" starting from the position after the first dash
    second_dash_index = my_string.find("-", first_dash_index + 1)

    # Find the third occurrence of "-" starting from the position after the second dash
    third_dash_index = my_string.find("-", second_dash_index + 1)

    # Extract the substring between the second and third dashes
    result = my_string[first_dash_index + 1:third_dash_index].strip()

    return result
# Example usage:
# url = "https://trendlyne.com/equity/PE/NIFTYINFRA/1911/nifty-infra-price-to-earning-ratios/"
# AlltimeLow PB 1.5 AlltimeLow PE 14



# url = "https://trendlyne.com/equity/PE/NIFTYIT/1902/nifty-it-price-to-earning-ratios/"





# url = "https://trendlyne.com/equity/PE/NIFTYNEXT50/1888/nifty-next-50-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NIFTYPHARMA/1905/nifty-pharma-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NIFPVTBANK/910338/nifty-private-bank-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NIFTYAUTO/1897/nifty-auto-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NFTHEALTHC/910417/nifty-healthcare-index-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NIFTYCOMMODITIES/1908/nifty-commodities-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/SMALLCA250/910398/nifty-smallcap-250-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NIFTYCONSUMPTION/1909/nifty-india-consumption-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PE/NMIDCAP150/910393/nifty-midcap-150-price-to-earning-ratios/"
# url = "https://trendlyne.com/equity/PB/NMIDCAP150/910393/nifty-midcap-150-price-to-book-ratio/"
# Define an array of strings
def find_closest_value(input_value, value_list):
    # Calculate the absolute differences from the input value
    differences = [abs(input_value - val) for val in value_list]

    # Find the index of the closest value
    closest_index = differences.index(min(differences))

    # Calculate the percentage of closeness
    total_difference = sum(differences)
    closeness_percentages = [(1 - diff / total_difference) * 100 for diff in differences]

    # Determine the closest value
    closest_value = value_list[closest_index]

    return closeness_percentages, closest_value

# Example usage
# input_value = 20  # Replace with your input value
value_list = [40, 24, 14]  # Example values (High, Medium, Low)

# percentages, closest = find_closest_value(input_value, value_list)

# print(f"Percentage of closeness to High: {percentages[0]:.2f}%")
# print(f"Percentage of closeness to Medium: {percentages[1]:.2f}%")
# print(f"Percentage of closeness to Low: {percentages[2]:.2f}%")
# print(f"Input value is closest to: {closest}")


def calculate_average(value1, value2, value3):
    """Calculate the average of three numbers."""
    
    # Helper function to convert strings to floats if needed
    def convert_to_float(value):
        if isinstance(value, set):
            # Extract the first element from the set and convert it to float
            value = list(value)[0]
        if isinstance(value, str):
            value = float(value)
        return value

    # Convert value1 and value2 to floats
    value1 = convert_to_float(value1)
    value2 = convert_to_float(value2)
    
    # Calculate the difference in percentage
    diff_in_percent = ((value2 - value1) / value1) * 100
    
    # Store the difference along with value3 in a list
    diffarr = []
    diffarr.append([diff_in_percent, value3])
    
    # Sort the list
    diffarr.sort()
    
    # Get the first three elements (although there's only one in this example)
    first_three = diffarr[:3]
    print(first_three)



    






search_term_1 = "is"
search_term_2 = "PB"
url_array = [ "https://trendlyne.com/equity/PE/NIFTYINFRA/1911/nifty-infra-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NMIDCAP150/910393/nifty-midcap-150-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NIFTYMIDCAP50/1894/nifty-midcap-50-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NIFTYAUTO/1897/nifty-auto-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NIFTYCONSUMPTION/1909/nifty-india-consumption-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/SMALLCA250/910398/nifty-smallcap-250-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NIFTYCOMMODITIES/1908/nifty-commodities-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NFTHEALTHC/910417/nifty-healthcare-index-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NIFPVTBANK/910338/nifty-private-bank-price-to-earning-ratios/",
                "https://trendlyne.com/equity/PE/NIFTYPHARMA/1905/nifty-pharma-price-to-earning-ratios/"]


# url_pb = ["https://trendlyne.com/equity/PB/NIFTYINFRA/1911/nifty-infra-price-to-book-ratio/",
#           "https://trendlyne.com/equity/PB/NIFTYNEXT50/1888/nifty-next-50-price-to-book-ratio/",
#           "https://trendlyne.com/equity/PB/NIFTYMIDCAP50/1894/nifty-midcap-50-price-to-book-ratio/",
#           "https://trendlyne.com/equity/PB/NMIDCAP150/910393/nifty-midcap-150-price-to-book-ratio/"]


pe_value= ["14.5","23","15","17","34","16","8","33","15","32"]
pb_value= ["1.6","2.9","1.5","3.6","5","3","1.4","4.3","2.5","3.5"]







i=0



#Loop through the array using a for loop
for url in url_array:
    value_1 = find_value_next_to_name(url, search_term_1)
    value_2 = find_value_next_to_name(url, search_term_2)


    name =  get_word_between_dashes(url)
    # print(f"The value next to '{search_term}' '{url[-38:-20]}' is: {value}")


# Specify the URL

    if value_1 == {403} :

# Command to open URL in Edge
       command = f'start msedge {url}'

# Run the command
       os.system(command)
       value_1 = find_value_next_to_name(url, search_term_1)
       value_2 = find_value_next_to_name(url, search_term_2)




       name =  get_word_between_dashes(url)
       
       print(f"The pe of '{name}' is: {value_1} ATL {pe_value[i]}and Pb is: {value_2} ATL {pb_value[i]}")
       time.sleep(1)
    #    calculate_average(value_1,pe_value[i],name)
    #    calculate_average(value_2,pb_value[i],name)
    else:
       
       print(f"The pe of '{name}' is: {value_1}  ATL {pe_value[i]} and Pb is: {value_2} ATL {pb_value[i]}")
    #    calculate_average(value_1,pe_value[i],name)
    #    calculate_average(value_2,pb_value[i],name)
    i=i+1   
    time.sleep(1)