
(function($, window, document) {

  // The $ is now locally scoped 

  // Listen for the jQuery ready event on the document
  $(function() {

    $('textarea').on("input", function(){
      let maxlength = 140;
      let currentLength = $(this).val().length;
      const counter = $(this).siblings("#submit-tweet").find(".counter")[0];
      let count = maxlength - currentLength;
      count < 0 ? $(counter).css("color", "red") : $(counter).css("color", "black");
      
      if (count <= maxlength) {
        $(counter).text(`${count}`);
      } else {
        $(counter).text(`${counter}`);
      }
    });

  });

}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter