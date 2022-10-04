# Project 3: The Calm Before the Score
![NFL Season is Here](https://www.paranhomes.com/wp-content/uploads/2017/04/football-in-fall.jpg)

<a href="url"><img src="[http://url.to/image.png](https://www.paranhomes.com/wp-content/uploads/2017/04/football-in-fall.jpg)" align="left" height="48" width="48" ></a>



<hr>

## Table of Contents

* [Project Description](#project-description)
* [PART 1: ETL](#part-1-etl-the-data)

## **Project Description**
xxxxxxx (will fill this out later with the "story" once we are done with the website)

<hr>

## **Part 1**: ETL the Data

### Extract
For this project, we used the sportsdata [API](https://sportsdata.io/nfl-api), which provides real-time data for every NFL game. We used a [Jupyter Notebook](NFL%20Dashboard.ipynb) to make a call to the API to get 2021 score [data](https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=ec966d78fab6468eaa542e1e7e883a44) and stadium [data](https://api.sportsdata.io/v3/nfl/scores/json/Stadiums?key=ec966d78fab6468eaa542e1e7e883a44).

### Transform
The stadium and team data was merged into one single dataframe. Since our website will allow customers to select their team, we also transformed the data to aggregate it at the team level.

### Load
The data was loaded into MongoDB using pymongo:

```season_data.insert_many(nflDataFinalDF.to_dict('records'))```





