Selectator
==========
Selectator is a jQuery-based replacement for select boxes. It supports searching, and affects the original select box directly, which is used as the data container.
[You can see a demo here](http://opensource.faroemedia.com/selectator).


Usage
-----
###### include in head:
```html
<link rel="stylesheet" href="fm.selectator.jquery.css"/>
<script src="jquery-1.11.0.min.js"></script>
<script src="fm.selectator.jquery.js"></script>
```

###### to activate replacement:
```javascript
$('#selectBox').selectator();
```
If you don't wan't to meddle with scripting, there is an alternative to activate replacement, by using inline markup. 
```html
<select multiple class="selectator" data-selectator-keep-open="true">
```

###### if you want to change settings:
```javascript
$('#selectBox').selectator({
    prefix: 'selectator_',             // CSS class prefix
    height: 'auto',                    // auto or element
    useDimmer: false,                  // dims the screen when option list is visible
    useSearch: true,                   // if false, the search boxes are removed and 
                                       //   `showAllOptionsOnFocus` is forced to true
    keepOpen: false,                   // if true, then the dropdown will not close when 
                                       //   selecting options, but stay open until losing focus
    showAllOptionsOnFocus: false,      // shows all options if input box is empty
    selectFirstOptionOnSearch: true,   // selects the topmost option on every search
    searchCallback: function(value){}, // Callback function when enter is pressed and 
                                       //   no option is active in multi select box
    labels: {
        search: 'Search...'            // Placeholder text in search box in single select box
    }
});
```

###### Extra attributes for option tags
By using `data-left`, `data-right` and `data-subtitle` attributes you can extend the information shown in the options. These can be styled through css, and are named `prefix_`title, `prefix_`left, `prefix_`right and `prefix_`subtitle. The data in the attributes is pure html, so you can even put images here.
The `class` attributes from the original option and optgroup elements are also added to the genererated elements 

```html
<select id="selectBox">
    <!-- Normal option tag -->
    <option value="1">This is the title</option>
    <!-- Extended option tag -->
    <option value="2" data-left="This is the left section" data-right="This is the right section" data-subtitle="This is the section under the title">This is the title</option>
</select>
```
It will be displayed something like this this:
<table>
    <tr>
        <td rowspan="2">
            Left
        </td>
        <td>
            Title
        </td>
        <td rowspan="2">
            Right
        </td>
    </tr>
    <tr>
        <td>
            Subtitle
        </td>
    </tr>
</table>


CSS classes
-----------
Here is a list of all the css classes

Class                         | Description
----------------------------- | ------------------------------------------------------------------------------
`prefix_`element              | This is the new select box. It has some extra classes called `single` and `multiple`, which tell if it is a multiple selection or single selection select box. And also `options-visible` and `options-hidden` which tell if the options list is visible or not.
`prefix_`chosen_items         | The holder for the chosen items.
`prefix_`chosen_item          | The holder for the chosen item.
`prefix_`chosen_item_title    | The title of the chosen item.
`prefix_`chosen_item_left     | The left section of the chosen item.
`prefix_`chosen_item_right    | The right section of the chosen item.
`prefix_`chosen_item_subtitle | The bottom section of the chosen item.
`prefix_`chosen_item_remove   | The remove button for the chosen item.
`prefix_`input                | This is the input box for the selectator. This is used together with `options-visible` or `options-hidden` to show and style it differently if it is a multiple selection box or a single selection box.
`prefix_`textlength           | This is used to calculate the size of the input box for the multiple selection box.
`prefix_`options              | The options list holder. This is used together with `options-visible` or `options-hidden` to show or hide the options.
`prefix_`group_header         | This is the group title option.
`prefix_`group                | This is the group options holder.
`prefix_`option               | This is a result option. It has an extra class called `active` which tells if the option is the active one.
`prefix_`option_title         | The title of the result option.
`prefix_`option_left          | The left section of the result option.
`prefix_`option_right         | The right section of the result option.
`prefix_`option_subtitle      | The bottom section of the result option.
`prefix_`dimmer               | This is the dimmer


DOM Structure
-------------
* dimmer
* element: *containing the `single`|`multiple` class and the `options-visible`|`options-hidden` class*
    * textlength
    * chosen_items
        * chosen_item
            * chosen_item_left
            * chosen_item_right
            * chosen_item_title
            * chosen_item_subtitle
            * chosen_item_remove
        * chosen_item...
    * input
    * options
        * group_header
        * group
            * option: *containing the `active` class*
                * option_left
                * option_right
                * option_title
                * option_subtitle
            * option...
        * option: *containing the `active` class*
            * option_left
            * option_right
            * option_title
            * option_subtitle
        * option...


jQuery methods
--------------
Method             | Description
------------------ | -----------
refresh            | This method is used to refresh the plugin. A scenario where this would be useful is if the data in the original select box is changed by some other script.
destroy            | This method is used to remove the instance of the plugin from the select box and restore it to its original state.


###### Method usage
```javascript
$('#selectBox').selectator('refresh');
```
or 
```javascript
$('#selectBox').selectator('destroy');
```


Browser compatibility
---------------------
* IE 8+
* Chrome 2+
* Firefox 3.5+
* Safari 4+
* Opera 11+


Internationalization
--------------------
Selectator supports language by setting labels through the plugin options.


Copyright and license
---------------------
The MIT License (MIT)

Copyright (c) 2013 Faroe Media

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
