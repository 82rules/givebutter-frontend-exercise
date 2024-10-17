# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?
  
    Given that the details panel requires several API calls, and we only use a fraction of the data returned. 
    I would definitely use a caching system to avoid making the same calls multiple times. 
    I would probably opt for using something like indexDB to cache the monster name with the monster object.
    I would use a indexDB state manager, and I would do the same for the pokemon list as well for (offline first) options. 
    I would use a state manager to handle expiration as well. I would not opt for storing this data in a state as 
        1 - it gets wiped clean on refresh, 
        2 - in this use case it's less likely, but it leaves the potential to storing a large amount of data in memory. 
    Given the fact this data is not user specific, I would probably also push for network level cache and API abstraction
    So that the computation is only done at first user request and every subsequent guest request is cached for a faster load time. 
    

- Is there anything you would consider doing if we were to go live with this app?
    Yes, there is a lot of information we're leaving out at the moment that would could expand features upon. 
    I am not of the pokemon world, so I can't speak to which info is most important, but that's when I would work along
    side product and project managers to ensure that given our already existing capabilities, that would we deliver as 
    much value to our user as possible. 

    I would not limit the search to the existing list if there is a wider dataset. If this was our own data, I would also 
    use more advances search capabilities such as near term matching and tokenization to allow for partial and 
    weighted search results, allowed for faceted searches to provide the user with more flexibility in search.  

    I would 100% implement at the very least FE level caching of network requests and offer offline capabilities before launch

    And of course, polish the UX, and provide a more catered experience to user. 

    There is also loading states, right now I added a loading state for the details, which will seem like a flicker if the API calls
    resolves quickly. This is a case where I would have a minimum time set for render to avoid the change looking like a flicker.
    And where caching would mean I only need to render loading state on actual network calls.

    Not that I think you want this to be in scope for this project, but I would also update the dependencies. 
    

- What was the most challenging aspect of this work for you (if at all)?
    
    I didn't experience any issue I would consider a challenge. 
    I made some engineeering decisions that aligned with the goals of the app even if it 
    meant changing some code already built.
    
    Biggest change is I made the list reduction a computed value vs a stored state value.
    It avoids having duplicate data across two states and risking those states getting out of sync. 
    I cached the list value so the computation wouldn't happen every time. 
    I changed the list loading to have no dependencies, since we are not searching via the API, it shoudln't be
    dependent on the search term. 
    I also changed the search behavior to reflect the computed value rather than the set list approach. 

    I don't love functions that return functions that aren't dependent upon it. 
    For example, in onGetDetails call on the get details button, my approach would be to wrap the onClick with a () => , which I know accomplishes the
    same "function returns function", but it keeps the writing of onGetDetails cleaner to be simply an onGetDetails = async(name)

    Not a blocker, but just a creative choice I would make different unless its the style pattern the company likes to keep. 


    
