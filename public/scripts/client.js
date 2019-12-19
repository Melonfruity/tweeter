/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// gets the days ago from the time the tweets are retrieved from the api
const getDaysAgo = (time) => {
  let secondsAgo = new Date() - time;
  return `${Math.floor(secondsAgo / 86400000)} days ago`;
}

const createTweetElement = (tweet) => {
  let $tweet = $('<article>').addClass('tweet');
  let $header = $('<div>').addClass('tweet-header');
  let $content = $('<div>').addClass('tweet-content');
  let $footer = $('<div>').addClass('tweet-footer');

  // header
  let $userInfo = $('<div>').addClass('tweet-user')
  let $profilePicture = $('<img>').attr('src', `${tweet.user.avatars}`).addClass('pic')
  let $name = $('<div>').text(`${tweet.user.name}`).addClass('name');
  let $handle = $('<div>').text(`${tweet.user.handle}`).addClass('handle')
  
  // append header elements
  $userInfo
    .append($profilePicture)
    .append($name);
  $header
    .append($userInfo)
    .append($handle)

  // content
  $content.text(`${tweet.content.text}`);

  // const test = `<script>alert('hi')</script>`  
  // $content.html(`${test}`); can run malicious scripts
  // Safe HTML
  /*
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const safeHTML = `<p>${escape(textFromUser)}</p>`;
  */
  
  // footer 
  let $daysAgo = $('<div>').text(getDaysAgo(tweet.created_at)).addClass('days-ago');
  let $icons = $('<div>').addClass('flag-share-like');
  let $flag = $('<img>').attr('src',"/images/icons/flag-24px.svg");
  let $share = $('<img>').attr('src',"/images/icons/share-24px.svg");
  let $favorite = $('<img>').attr('src',"/images/icons/favorite-24px.svg");
  
  // append footer elements
  $icons
    .append($flag)
    .append($share)
    .append($favorite);

  $footer
    .append($daysAgo)
    .append($icons)
  
  // append all
  $tweet
    .append($header)
    .append($content)
    .append($footer);

  return $tweet;
}

// adds the tweets to the tweets container
const renderTweets = (container, tweets) => {
  tweets.forEach(tweet => container.prepend(createTweetElement(tweet)));
}

// makes a get request to the api to retrieve the tweets
const loadTweets = (container) => {
  // return tweets
  $.ajax('http://localhost:8080/tweets/', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(container, tweets);
  });;
}

// Jquery ready
(function($, window, document) {

  // The $ is now locally scoped 

  // Listen for the jQuery ready event on the document
  $(function() {

    const $errorSection = $('#error-section')
    const $tweetsContainer = $('#tweets-container');
    const newTweetForm = document.querySelector('#tweet-form');
    const $error = $('#error-message');

    // Navbar slide listener
    $('#new-tweet-toggle').click(function(){
      $("#new-tweet").slideToggle("slow");
      $('textarea').focus();
    });

    // hides the error section when anywhere on the window is click
    $(window).click(function(){
      $errorSection.css('display', 'none');
    })

    //Get the button:
    const $mybutton = $("#myBtn");
    
    // calls the topFunc when button is clicked
    $mybutton.click(function(){
      topFunction();
    })

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
      scrollFunction()
    };

    // reads when the user is scrolling and shows the topbutton if they are
    function scrollFunction() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $mybutton.css('display','block');
      } else {
        $mybutton.css('display','none');
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      let newTweetFormPos = newTweetForm.getBoundingClientRect().bottom;
      document.body.scrollTop = newTweetFormPos; // For Safari
      document.documentElement.scrollTop = newTweetFormPos; // For Chrome, Firefox, IE and Opera
    }

    // Loads in and renders the initial tweets
    loadTweets($tweetsContainer)

    // submit posts to the api
    $("#tweet-form").submit(function( event ) {
      
      // get the character count
      const textAreaLength = event.target.text.value.length;

      if (textAreaLength <= 0 || textAreaLength > 140) {
        
        // display the error if there is one
        $errorSection.slideToggle("slow");
        (textAreaLength > 140) ? $error.text(`Error: Your tweet is too long!`) : $error.text(`Error: Your tweet is too short!`);
      
      } else {
        
        // serialize the data to be sent
        const tweet = $(this).serialize();
        
        // get rid of the sent content and reset counter
        this.text.value = ''
        $('.counter').text('140');
        
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