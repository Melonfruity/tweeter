
( function( $, _window, _document ) {

  // The $ is now locally scoped

  // Listen for the jQuery ready event on the document
  $( function() {

    $( "textarea" ).on( "input", function() {
      let maxlength = 140;
      let currentLength = $( this ).val().length;
      const counter = $( this ).siblings( "#submit-tweet" ).find( ".counter" )[ 0 ];
      let count = maxlength - currentLength;
      
      // sets text black or red
      $( counter ).css( "color", ( count < 0 ) ? "red" : "black" );
      
      if ( count <= maxlength ) {
        $( counter ).text( `${count}` );
      }
    } );

  } );

} )( window.jQuery, window, document );

// The global jQuery object is passed as a parameter
