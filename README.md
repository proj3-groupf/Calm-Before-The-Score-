# Project 3: The Calm Before the Score
![Football Season is Here](https://media.giphy.com/media/tE48cYoHwM24ZiwauO/giphy.gif)


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





