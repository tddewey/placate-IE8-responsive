# placate-IE8-responsive
Keep using min-width css queries, and output a special stylesheet just to placate IE8 (and below).

## Problem
IE8 is the problem. Hopefully it's going away, but it hasn’t yet for a lot of businesses. Especially publishers, who are looking to reach a wide audience. IE8 Just doesn’t recognize media queries. Anything inside them is ignored.

## Solutions:
1. Don’t support IE8.
  1. Non-support is unacceptable for a lot of clients
  1. If ignored, IE8 will serve your mobile styles (everything outside a media query). This can result in a very sub-optimal user experience unless very carefully accounted for.
  1. If we use max-width, IE8 gets styles for a monitor resolution its users are unlikely to have. Plus, max-width.
  1. If we use a combination of min and max width we make a hot mess out of our stylesheets, piss off all future front-end engineers, and play right into the hands of the evil league of evil.
2. Respond.js or other polyfills
  1. Reads all css into javascript, manipulates and injects CSS based on every resize event.
  2. “lightweight” ha. no. This is heavy.
  3. But hey, it’s a drop-in solution and sometimes the right thing.
  4. DOES NOT WORK ON VIP. May not work on other CDNs as well.

## The solution we want
The solution we are looking for:
* Does not try to impose responsive design on a browser that does not support responsive design
* Goldilocks sizing (not to small, mobile, not to big, uber desktop)
* Does not require any real workflow changes. You’re still developing for modern browsers.

## This solution
1. Determine the size of screen you want to target for IE8.
  * Most common horizontal resolution in analytics, probably
  * Don’t worry you can change it later
2. Use IE conditionals to enqueue a stylesheet just for <= IE8 and another different for everyone else.
3. Go about your business, but use a media query mixin
4. The IE8 stylesheet won’t print any media queries, it will print the styles if the media query is for <= the target screen size.

## Loading Stylesheets
There are two stylesheets that result from this system. One for <= IE8 and one for everyone else _except_ <= IE8. This requires an IE conditional tag done twice.

```html
<!--[if lte IE 8]>
	<link rel="stylesheet" href="css/global-old-ie.css">
<![endif]-->

<!--[if gt IE 8]><!-->
    <link rel="stylesheet" href="css/global.css">
<!--<![endif]-->
```

### In WordPress
WordPress supports standard IE conditionals — such as the one for enqueing global-old-ie.css, above — but it does not support the format used to enqueue global.css. A workaround can be developed using the `style_loader_tag` filter (see index.html for the code) or you may decide to pull those two files out of the enqueue system completely and ouput the tags directly via the `wp_print_styles` hook.
