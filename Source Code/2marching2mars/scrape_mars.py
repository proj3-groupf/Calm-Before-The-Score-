# imports
from splinter import Browser
from bs4 import BeautifulSoup as soup
import pandas as pd
from webdriver_manager.chrome import ChromeDriverManager
import datetime as dt

# scrape all function
def scrape_all():
    # splinter stuff
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless = False)

    # the goal is to return a json which has all of the necessary data so it can be loaded into MongoDB

    # get the information from the news page
    news_title, news_paragraph = scrape_news(browser)

    # build a dictionary using the information from the scrapes
    marsData = {
        "newsTitle": news_title,
        "newsParagraph": news_paragraph,
        "featuredImage": scrape_feature_img(browser),
        "facts": scrape_facts_page(browser),
        "hemispheres": scrape_hemispheres(browser),
        "lastUpdated": dt.datetime.now()
    }

    # stop webdriver
    browser.quit()

    #display output
    return marsData

# scrape through mars news page
def scrape_news(browser):
    # go the mars NASA site
    # news website
    url = 'https://redplanetscience.com'
    browser.visit(url)

    # HAVE A DELAY
    browser.is_element_present_by_css('div.list_text', wait_time=1)

    # make it a soup object ;-;
    html = browser.html
    news_soup = soup(html, 'html.parser')

    slide_elem = news_soup.select_one('div.list_text')
    # use parent element to find first a tag and save it as 'news_title'
    news_title = slide_elem.find('div', class_='content_title').get_text()
    # the paragraph:
    news_p = slide_elem.find('div', class_='article_teaser_body').get_text()

    # return the title and the paragraph
    return news_title, news_p

# scarpe through the featured images page
def scrape_feature_img(browser):
    # images time
    # get url
    url = 'https://spaceimages-mars.com'
    browser.visit(url)

    full_image_link = browser.find_by_tag('button')[1]
    full_image_link.click()

    # parse the resulting html with soup
    html = browser.html
    img_soup = soup(html, 'html.parser')

    # find the img url
    img_url_rel = img_soup.find('img', class_='fancybox-image').get('src')

    # use the base url to create an absolute url
    img_url = f'https://spaceimages-mars.com/{img_url_rel}'

    # return the img url
    return img_url

# scrape through the facts page
def scrape_facts_page(browser):

    # get url
    url = 'https://galaxyfacts-mars.com'
    browser.visit(url)

    # parse the resulting html with soup
    html = browser.html
    fact_soup = soup(html, 'html.parser')

    # find the facts location
    factsLocation = fact_soup.find('div', class_='diagram mt-4')
    factTable = factsLocation.find('table') # finds html code for the fact table

    # create empty string
    facts = ""

    # add the text to the empty string and then return
    facts += str(factTable)

    return facts


# scrape through the hemispheres pages
def scrape_hemispheres(browser):
    # base url
    url = 'https://marshemispheres.com/'
    browser.visit(url)

    # build out list of img urls
    # create a list to hold the images and titles
    hemisphere_image_urls = []
    
    # set up the loop
    for i in range(4):
        # loop through all of the 4 pages of hemispheeres
        # hemisphere information dictionary
        hemisphereInfo = {}
        
        # we have to find the elements on each loop to avoid a stale element exception
        browser.find_by_css('a.product-item img')[i].click()
        
        # next, we find the sample image anchor tag and extract the href
        sample = browser.links.find_by_text('Sample').first
        hemisphereInfo["img_url"]= sample['href']
        
        # get the hemisphere title
        hemisphereInfo['title'] = browser.find_by_css('h2.title').text
        
        # append hemisphere object to list
        hemisphere_image_urls.append(hemisphereInfo)
        
        # finally, we navigate backwards
        browser.back()

    # return the hemisphere urls with titles
    return hemisphere_image_urls

# set up as a flask app
if __name__ == "__main__":
    print(scrape_all())

# http://127.0.0.1:5000/