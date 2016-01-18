# BootstrapToggler
toggle bootstrap buttons

![preview](http://i.giphy.com/3oFyD22feZ4k51Oofu.gif)

# Set up

### HTML

```html
<div data-pk="_ITEM_DB_ID_" class="btn-group bsTogglerButtons" data-toggle="buttons">
    <label class="btn btn-secondary">
        <input name="payed" value="2" type="radio">
        Not paid
    </label>
    <label class="btn btn-success">
        <input name="payed" value="1" type="radio">
        Payed
    </label>
</div>

<script type="text/javascript" src="_PATH_TO_TOGGLER.js_"></script>
</body>
</html>
```

### JS

```js
$(document).ready(function(){

  $('.bsTogglerButtons').toggleButtons({
      url: "_AJAX_URL_", // required
      aditionalData: { //optional
        company_id: 11,
        is_it_raining: false
      }
  });
});
```

### Events

```js

$('_SELECTOR_').toggleButtons({
    //configuration options
}).on("onSuccess", function(){
  
  //this will be called after ajax call is done and after buttons classes has been changed/applied
  console.log(arguments);
}).on("onError", function(){
  
  //this is called when ajax fails
  // you can return 404, 402 or whatever
  console.log(arguments);
});

```
