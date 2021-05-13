# Team-project-artemis - Online Banking System
### Two Actors
 <li>Bankers</li>
 <li>Users</li>

# Feature Set
<li>Add new accounts - Checking, Savings</li>
<li>Close existing accounts</li>
<li>Transfer between accounts - one time or recurring</li>
<li>Set up recurring or one-time Bill payment for external payees</li>
<li>View and search Transactions - for credits/debits/checks/fees - up to  last 18 months</li>
<li>
(Admin only) - Add transactions - such as manual refunds on fees</li>

## Local Development
### How to run the application
````
clone the project repo
cd go to the project destination folder /cmpe202
````
````
mvn spring-boot:run
````

### How to test the API
http://localhost:8080/swagger-ui.html

### Database lookup
http://localhost:8080/h2-console

## Project Journal
https://docs.google.com/spreadsheets/d/1K4B58p52jRFUKL1csE0MhJ_8O-vWPPesCwLPmnGELdQ/edit?usp=sharing

## High level Architecture Diagram
![architecture](https://user-images.githubusercontent.com/41709858/118188123-c72ded00-b3f4-11eb-93e4-2b60769eddb7.png)

## Component Diagram
![Component Diagram_OB](https://user-images.githubusercontent.com/41709858/118186850-0f4c1000-b3f3-11eb-84f8-2fe73dfbc465.png)

## Deployment Diagram
![Deployment Diagram_OB](https://user-images.githubusercontent.com/41709858/118186863-1410c400-b3f3-11eb-8d7a-b1bd7c514434.png)

## Class Diagram
![OnlineBankingClassDiagram](https://user-images.githubusercontent.com/41709858/118019950-70e67e80-b30e-11eb-9525-288f5eac22e6.png)
