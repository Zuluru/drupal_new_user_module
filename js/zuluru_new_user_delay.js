(function ($) {
  /**
   * Behaviors are Drupal's way of applying JavaScript to a page. In short, the
   * advantage of Behaviors over a simple 'document.ready()' lies in how it
   * interacts with content loaded through Ajax. Opposed to the
   * 'document.ready()' event which is only fired once when the page is
   * initially loaded, behaviors get re-executed whenever something is added to
   * the page through Ajax.
   *
   * You can attach as many behaviors as you wish. In fact, instead of overloading
   * a single behavior with multiple, completely unrelated tasks you should create
   * a separate behavior for every separate task.
   *
   * In most cases, there is no good reason to NOT wrap your JavaScript code in a
   * behavior.
   *
   * @param context
   *   The context for which the behavior is being executed. This is either the
   *   full page or a piece of HTML that was just added through Ajax.
   * @param settings
   *   An array of settings (added through drupal_add_js()). Instead of accessing
   *   Drupal.settings directly you should use this because of potential
   *   modifications made by the Ajax callback that also produced 'context'.
   */
  Drupal.behaviors.zuluru_new_user_delayed_redirect = {
    attach: function (context, settings) {
      var redirect_url = settings.zuluruNewUserSetting.redirect_url;
      var time_delay = settings.zuluruNewUserSetting.time_delay;
      // Make sure the notice that they will be redirected is shown on the current page.
      if($( '#redirect-time-value' ).length > 0 ) {
        redirect_after_delay( redirect_url, time_delay );
      }
    }
  };
  // Recursively count down to the redirect
  function redirect_after_delay( url, delay ) {
    if( delay <= 0 ) {
      window.location.href = url;
    } else {
      set_message_remaining_delay_time(delay);
      setTimeout( function(){ redirect_after_delay( url, delay - 1 ); }, 1000 );
    }
  }
  function set_message_remaining_delay_time(delay){
    $( '#redirect-time-value' ).html( delay );
  }

})(jQuery);
