Older changes
=============



This is truncated from the readme file to keep down the size

### 1.2.0
    + possibility to load stories per category

### 1.1.1

    + tile layout style fix
    + new layout: cards
    + host demo page on widget.styla.com

### 1.1.0

    + test suites changes to mocha and istanbul


### 1.0.16

    + updated link test


### 1.0.15

    + internal reconfigurations on their way to the ability to handle multiple formats at once
    + adjusted how style tags are added and stored
    + removed trailing slash from links


### 1.0.14

    + all tests fixed


### 1.0.13

    + tile layout style fix


### 1.0.12

    + tile layout does not break if a story only has very little content


### 1.0.11

    + set domain config api dynamically


### 1.0.10

    + ie fixes


### 1.0.9

    + updated setDomain to be more robust


### 1.0.7

    + added css prefixes for IE
    + fixed an issue where ignored stories were added anyways


### 1.0.6

    + css-wrap removed from package and gulpfile
    + added a console log to investigate stage



### 1.0.5

    + gitignore changed to clean up dist dir (release branch)


### 1.0.4

    + theme style tags now get a class for their format
    + theme style tags are now added just once
    + multiple styling of multiple widgets on the same page works correctly
    + widgets now get a class for their layout
    + widget embed code got even easier


### 1.0.3

    + timestamp added to container for multiple styling
    + format added for multiple styles per page
    + added horizontal and tiled style
    + always showing read more indicatior


### 1.0.2

    + list.min.js is now included in `npm i` calls


### 1.0.1

    + added css prefixes for old browsers


### 1.0.0

    + build is now a constructor
    + implementation changes to allow for multiple widgets on one page


### 0.4.9

    + i a !
    + this.els changed to this.refs for readability


### 0.4.8

    + moved this.wrapper and this.container to this.els


### 0.4.7

    + better handling of empty story text
    + tests updated
    + inital load changes


### 0.4.4

    + removed margins for related stories


### 0.4.2

    + docs updated


### 0.4.1

    + center images vertically and horizontally with no cropping


### 0.4.0

    + styles and structure altered slightly
    + size changed to imageSize
    + feed changed to all
    + adjusted theme-style insertion
    + added domain option


### 0.3.5

    + attach() added
    + checkTarget() added
    + minWidth is now adjustable


### 0.3.4

    + destroy() rebuilt
    + added a timestamp class to all added elements for ease of removal


### 0.3.3

    + widget now sets a default export
    + the widget now only builds initially if there is a valid stylaWidget object


### 0.3.2

    + added an empty object fallback for the widget options


### 0.3.1

    + added linkDomain for setting link urls on sites that dont use domainconfig
    + css fixes
    + added dynamic api url and domainconfig api url to the api


#### 0.3.0

    + added ignore to the api
    + title and size options added
    + alternate "recommended stories" build added


#### 0.2.4

    + src and liscence are now included with npm install
    + h1 titles changed to h3
    + removed an errant trailing slash in links


#### 0.2.3

    + added iframe


#### 0.2.2

    + added newTab


#### 0.2.1

    + gulp build adjusted for doc


#### 0.2.0

    + build object seperated from the widget


#### 0.1.6

    + fixed a bug where links were malformed missing a `/`
    + internal refactoring
