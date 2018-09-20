from bs4 import BeautifulSoup
import requests
from splinter import Browser
import pandas as pd


executable_path = {"executable_path": "C:/Users/AJGra/Downloads/chromedriver.exe"}
browser = Browser('chrome', **executable_path, headless=False)

def nasa_func():
    url_nasa = 'https://mars.nasa.gov/news/'
    browser.visit(url_nasa)
    #get newest nasa title and paragraph 
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    title_url_nasa = soup.find("div", class_="content_title").get_text()
    #return(title_url_nasa)
    #paragraph_url_nasa = soup.find("div", class_="article_teaser_body").text
    paragraph_url_nasa = soup.find("div", class_="article_teaser_body").text
    return{'nasa':title_url_nasa, 'paragraph': paragraph_url_nasa}

#Use splinter to navigate the site and find the image url for the current Featured Mars Image 
#assign the url string to a variable called `featured_image_url`.

def featured_img():
    #open browser to nasa's mars page
    url_jpl = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url_jpl)
    #navigate to first mars image and click to open full size
    xpath= '//*[@id="page"]/section[3]/div/ul/li[1]/a/div/div[2]/img'
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    #find large image local url
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    img_url = soup.find("ul", class_= "articles").a['data-fancybox-href']
    #create navigable image url
    featured_image_url = 'https://www.jpl.nasa.gov'
    featured_image_url += img_url
    return {'jpl_image': featured_image_url}

#Visit the Mars Weather twitter and scrape the latest Mars weather tweet from the page. 
#Save the tweet text for the weather report as a variable called `mars_weather`.

def twitter():
    url_twitter = "https://twitter.com/marswxreport?lang=en"
    response_TW = requests.get(url_twitter)
    soup_TW = BeautifulSoup(response_TW.text, 'lxml')
    mars_weather = soup_TW.find('p', class_='TweetTextSize--normal').text
    return {'current_mars_weather' : mars_weather}


#Visit the Mars Facts webpage and use Pandas to scrape the table containing facts about the planet including Diameter, Mass, etc and 
#convert the data to a HTML table string.

def factoids():
    url_facts = 'http://space-facts.com/mars/'
    tables = pd.read_html(url_facts)
    facts_df = tables[0]
    facts_df.columns= ['Description', 'Value']
    facts_df.set_index('Description', inplace=True)
    html_table = facts_df.to_html()
    html_table.replace('\n', '')
    facts_df.to_html('table.html')
    table_dict = {'table_key': html_table}
    return table_dict  

#Visit the USGS Astrogeology site to obtain high resolution images for each of Mar's hemispheres.
#Save image url string and the Hemisphere title containing the hemisphere name using the keys `img_url` and `title`.

def get_hemis_urls():
    url_hemi = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url_hemi)
    #use BS to get link objects
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    results_hemi = soup.find_all('div', class_='item')
    #loop through results to get url of specific encanced pics and close window
    url_list = []
    for result in results_hemi:
    #     title = result.text.strip()
    #     title_list.append(title)
        pic_url = result.find('a')['href']
        url_list.append(pic_url)
    full_url_list = ['https://astrogeology.usgs.gov' + url for url in url_list]
    return full_url_list

#visit specific hemisphere pages
def hemis_urls():
    full_url_list = get_hemis_urls()
    hemisphere_image_urls  = {}
    x = 1
    for page in full_url_list:
        browser.visit(page)
        #get name of current hemisphere
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')
        title_url_nasa = soup.find("h2", class_="title").text
        #find link to full image page
        pic_xpath = '//*[@id="wide-image"]/div/ul/li[1]/a'
        results = browser.find_by_xpath(pic_xpath)
        img = results[0]
        #make dictionary of name and url and append to list
        thisdict = {}
        thisdict = {x: title_url_nasa, 10*x: img['href']}
        hemisphere_image_urls.update(thisdict)
        x = x+1
    return hemisphere_image_urls

def scrape():
    scrape_dict = {}
    nasa_results = nasa_func()
    image = featured_img()
    tweet = twitter()
    table = factoids()
    hemis = hemis_urls()
    scrape_dict['title'] = nasa_results['nasa']
    scrape_dict['news'] = nasa_results['paragraph']
    scrape_dict['big_image'] = image['jpl_image']
    scrape_dict['tweet'] = tweet['current_mars_weather']
    scrape_dict['mars_table'] = table['table_key']
    scrape_dict['hemis'] = hemis
    return scrape_dict

browser.quit()


# first = {'abc': 'def', 'xyz': 'zyx'}
# second = {'fgh': "bob"}
# final = {}
# final['title'] = first
# final['par'] = second['fgh']

# print(final['par'])
