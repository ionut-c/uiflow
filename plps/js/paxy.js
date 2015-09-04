
var paxy = (function(){

  var followers = [];
  var fadeOuts = [];
  var fadeIns = [];
  var unveilDowns = [];
  var customEffects = [];

  var debug = false;

  return {
    getFollowers: function() {
      return followers;
    },
    getFadeOuts: function() {
      return fadeOuts;
    },
    getFadeIns: function() {
      return fadeIns;
    },
    getUnveilDowns: function() {
      return unveilDowns;
    },
    getCustomEffects: function() {
      return customEffects;
    },
    getDebug: function() {
      return debug;
    },
    setDebug: function(value) {
      debug = value;
    }
  }
})();

function paxyDebug() {
  paxy.setDebug("true");
  $('body').append('<div id="paxyDebug" style="position: fixed; background: rgba(0,0,0,.9); top: 5px; right: 5px; z-index: 1000; color: #eee; padding: 10px; border-radius: 3px; ">Scroll Pos: <span id="scrollPos">'+ $window.scrollTop() +'</span></div>');
}

$(document).ready(function(){
  // Cache the Window object
  $window = $(window);

  $('[data-paxy]').each(function(){
    var $this = $(this);
    var data = $this.data("paxy");
    bind($this, data);
  });

  update();

  function bind($this, data) {
    var followers = paxy.getFollowers();
    var fadeIns = paxy.getFadeIns();
    var fadeOuts = paxy.getFadeOuts();
    var unveilDowns = paxy.getUnveilDowns();
    var customEffects = paxy.getCustomEffects();
    var bindingTo = data.substr(0, data.indexOf('{'));
    var params = data.substr(data.indexOf('{')+1, (data.indexOf('}')-data.indexOf('{')-1));
    params = params.split(',');
    switch (bindingTo) {
      case "follower":
        var temp = [$this, params[0], params[1]];
        followers.push(temp);
      break;
      case "fadeOut":
        var temp = [$this, params[0], params[1]];
        fadeOuts.push(temp);
      break;
      case "fadeIn":
        var temp = [$this, params[0], params[1]];
        fadeIns.push(temp);
      break;
      case "customEffect":
        var temp = [$this, params[0], params[1], params[2], params[3], params[4], params[5]];
        customEffects.push(temp);
      break;
      case "unveilDown":
        var temp = [$this, params[0], params[1], parseInt($this.css("height"))];
        $this.css("height", "0");
        $this.css("overflow", "hidden");
        $this.css("padding", "0");
        unveilDowns.push(temp);
      break;
    }
  }

  $(window).on("scroll", function() {
    update();
  });

  function update() {
    var followers = paxy.getFollowers();
    var fadeIns = paxy.getFadeIns();
    var fadeOuts = paxy.getFadeOuts();
    var customEffects = paxy.getCustomEffects();
    var unveilDowns = paxy.getUnveilDowns();
    if(paxy.getDebug()) {
      $("#scrollPos").html($window.scrollTop());     
    }
    for(var i = 0; i < followers.length; i++) {
      follower.apply(this, followers[i]);
    }
    for(var i = 0; i < fadeOuts.length; i++) {
      fadeOut.apply(this, fadeOuts[i]);
    }
    for(var i = 0; i < fadeIns.length; i++) {
      fadeIn.apply(this, fadeIns[i]);
    }
    for(var i = 0; i < customEffects.length; i++) {
      customEffect.apply(this, customEffects[i]);
    }
    for(var i = 0; i < unveilDowns.length; i++) {
      unveilDown.apply(this, unveilDowns[i]);
    }
  }

  function follower($this, follow, unfollow) {
    if($window.scrollTop() >= follow && $window.scrollTop() <= unfollow) {
      $this.css("margin-top", $window.scrollTop()-follow+"px");
    } else if($window.scrollTop() < follow) {
      $this.css("margin-top", "");
    } else if($window.scrollTop() > unfollow) {
      $this.css("margin-top", unfollow-follow+"px");
    }
  }

  function fadeOut($this, start, finish) {
    if($window.scrollTop() >= start && $window.scrollTop() <= finish) {
      var positions = finish - start + 1;
      var factor = 1 / positions;
      var crtPos = finish - $window.scrollTop() + 1;
      $this.css("opacity", factor*crtPos);
    } else if($window.scrollTop() < start) {
      $this.css("opacity", "1");
    } else if($window.scrollTop() > finish) {
      $this.css("opacity", "0");
    }
  }

  function fadeIn($this, start, finish) {
    if($window.scrollTop() >= start && $window.scrollTop() <= finish) {
      var positions = finish - start + 1;
      var factor = 1 / positions;
      var crtPos = $window.scrollTop() - start + 1;
      $this.css("opacity", factor*crtPos);
    } else if($window.scrollTop() < start) {
      $this.css("opacity", "0");
    } else if($window.scrollTop() > finish) {
      $this.css("opacity", "1");
    }
  }

  function customEffect($this, cssProp, startValue, endValue, units, start, finish) {
    if($window.scrollTop() >= start && $window.scrollTop() <= finish) {
      var positions = finish - start + 1;
      var factor = (parseInt(startValue)-parseInt(endValue)) / positions;
      var crtPos = finish - $window.scrollTop() + 1;
      var computedValue = factor*crtPos + parseInt(endValue) ;
      $this.css(cssProp, computedValue + "" + units);
    } else if($window.scrollTop() < start) {
      $this.css(cssProp, "");
    } else if($window.scrollTop() > finish) {
      $this.css(cssProp, endValue + units);
    }
  }

  function unveilDown($this, start, finish, maxHeight) {
    if($window.scrollTop() >= start && $window.scrollTop() <= finish) {
      var positions = finish - start + 1;
      var factor = maxHeight / positions;
      var crtPos = $window.scrollTop() - start + 1;
      $this.css("height", factor*crtPos);
    } else if($window.scrollTop() < start) {
      $this.css("height", "0");
    } else if($window.scrollTop() > finish) {
      $this.css("height", maxHeight+"px");
    }
  }

  $('[data-type="toast"]').each(function(){

    var $this = $(this);
    var enter = $this.data("enter");
    var leave = $this.data("leave");
    var initial = $this.data("initial");
    var active = $this.data("active");
    var distance = leave - enter;

    $(window).scroll(function() {
      if($window.scrollTop() >= enter) {
        $this.css("left", active);
      }

      if($window.scrollTop() < enter || $window.scrollTop() >= leave) {
        $this.css("left", initial);
      }
    });

  });

  //legacy code for backgrounds (REWRITE)
  $('[data-type="background"]').each(function(){
  var $bgobj = $(this); // assigning the object
  var yPos;
  var coords;
                
  $(window).scroll(function() {
                  
    // Scroll the background at var speed
    // the yPos is a negative value because we're scrolling it UP!                
    yPos = -(($window.scrollTop() - $bgobj.data("offset")) / $bgobj.data('speed')); 

    // Put together our final background position
    coords = 'center '+ yPos + 'px';

    // Move the background
    $bgobj.css({ backgroundPosition: coords });
    }); // window scroll Ends

  });
  // END legacy code for backgrounds (REWRITE)
  
});