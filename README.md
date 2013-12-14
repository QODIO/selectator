Selectator
==========
Selectator is a jQuery-based replacement for select boxes. It supports searching, and affects the original select box directly, which is used as the data container.


Usage
-----
###### include in head:
```html
<link rel="stylesheet" href="fm.selectator.jquery.css"/>
<script src="jquery-2.0.3.min.js"></script>
<script src="fm.selectator.jquery.js"></script>
```

###### to activate replacement:
```javascript
$('#selectBox').selectator();
```

###### if you want to change settings:
```javascript
$('#selectBox').selectator({
    prefix: 'selectator_',        // CSS class prefix
    height: 'auto',               // auto or element
    useDimmer: false,             // dimms the screen when result list is visible
    searchCallback: function(){}, // Callback function when enter is pressed and 
                                  //   no option is active in multi select box
    labels: {
        search: 'Search...'       // Placeholder text in search box in single select box
    }
});
```

###### Extra attributes for option tags
By using data-left, data-right and data-subtitle attribute tags you can extend the information shown in the options. These can be styled through css, and are named {prefix_}title, {prefix_}left, {prefix_}right and {prefix_}subtitle. The data in the tags is pure html, so you can even put images there.

```html
<select id="selectBox">
    <!-- Normal option tag -->
    <option id="1">This is the title</option>
    <!-- Extended option tag -->
    <option id="2" data-left="This is the left section" data-right="This is the right section" data-subtitle="This is the section under the title">This is the title</option>
</select>
```


Browser compatibility
---------------------
* IE ???
* Chrome 8+
* Firefox ???
* Safari ???
* Opera ???


Internationalization
--------------------
Selectator supports language by setting labels through the plugin options.


Copyright and license
---------------------
The MIT License (MIT)

Copyright (c) 2013 Ingi P. Jacobsen

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
