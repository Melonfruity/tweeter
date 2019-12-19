/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// gets the days ago from the time the tweets are retrieved from the api
// Jquery ready
(function($, window, document) {

  // The $ is now locally scoped 

  // Listen for the jQuery ready event on the document
  $(function() {

    // submit posts to the api
    $("#tweet-form").submit(function( event ) {
      
      // get the character count
      const textAreaLength = event.target.text.value.length;

      if (textAreaLength <= 0 || textAreaLength > 140) {
        
        // display the error if there is one
        $errorSection.css('display', 'flex');
        (textAreaLength > 140) ? $error.text(`Form too long`) : $error.text(`Form too short`);
      
      } else {
        
        // serialize the data to be sent
        const tweet = $(this).serialize();
        
        // get rid of the sent content
        this.text.value = ''
        
        // post the tweet to the api
        $.post('http://localhost:8080/tweets/', tweet,
          function(){
            $tweetsContainer.empty();
            loadTweets($tweetsContainer);
          });
      }
    
      // prevents the entire page to render 
      event.preventDefault();
    });

  });

}(window.jQuery, window, document));