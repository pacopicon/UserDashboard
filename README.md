# Relevant Protocols Frontend Developer Test 🤓

This is a simple redux app.  

Please clone this repo and push it to your own github (do not fork!).  

The data supplied is a sample query of the user reputation table from the Relevant database.

### Tasks:

1. The 'test' component (./src/test/test.component.js) is not using proper redux (or even react) patterns - lets fix this! 💻  
   * data should be stored in the reducer  
   * no nested data - normalize the data in the reducer using normalizr  
   * note there is more than one community and users can a different reputation (pagerank) in different communities
2. For each community, display the first 10 users sorted by pagerank 📈  
   * render user image, name, handle and pagerank with some css (nothing too fancy)
3. Display the first 10 users sorted by name 
   * button to toggle between the two data views (can use component state here)  
   * Extra credit: Customise the normalizr schema for users so that user objects contain a reference to the reputation object (hint: https://github.com/paularmstrong/normalizr/blob/master/examples/relationships/schema.js)
4. Extra credit: write some tests 😎
