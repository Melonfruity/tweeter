/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const renderTweets = (container, tweets) => {
  tweets.forEach(tweet => container.prepend(createTweetElement(tweet)));
}

const loadTweets = (container) => {
  // return tweets
  $.ajax('http://localhost:8080/tweets/', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(container, tweets);
  });;
}

(function($, window, document) {

  // The $ is now locally scoped 

  // Listen for the jQuery ready event on the document
  $(function() {

    const $errorSection = $('#error-section');
    const $tweetsContainer = $('#tweets-container');

    // Navbar slide listener
    $('#new-tweet-toggle').click(function(){
      $("#new-tweet").slideToggle("slow");
    });

    $(window).click(function(){
      $errorSection.css('display', 'none');
    })

    //Get the button:
    const $mybutton = $("#myBtn");
    
    $mybutton.click(function(){
      topFunction();
    })

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
      scrollFunction()
    };

    function scrollFunction() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $mybutton.css('display','block');
      } else {
        $mybutton.css('display','none');
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 400; // For Safari
      document.documentElement.scrollTop = 400; // For Chrome, Firefox, IE and Opera
    }

    // Loads in and renders the tweets
    loadTweets($tweetsContainer)

    $("#tweet-form").submit(function( event ) {
      const textAreaLength = event.target.text.value.length;
      if (textAreaLength <= 0 || textAreaLength > 140) {
        $errorSection.css('display', 'flex');
        const $error = $('#error-message');
        (textAreaLength > 140) ? $error.text(`Form too long`) : $error.text(`Form too short`);
      } else {
        const tweet = $(this).serialize();
        $.post('http://localhost:8080/tweets/', tweet,
          function(){
            // $tweetsContainer.empty();
            
            loadTweets($tweetsContainer)
          });
      }
      event.preventDefault();
    });

  });

}(window.jQuery, window, document));