# LTI-React-PHP-Base
LTI base for UQx Teaching and Learning tools, using ReactJS and Webpack with Simple PHP api


# TEMP change to jspdf node_modules file:
in order for pdf functionality to work properly, we need to impliment callback functionality for save function. This does not exist in the jspdf package at the time of this project. To enable the callback, you will need to make the following changes to -

### node_modules/jspdf/jspdf.debug.js

#### Step 1:
edit this -
 ```javascript
 API.save = function (filename) {
   API.output('save', filename);
 };
 ```

to this -
```javascript
API.save = function (filename, callback) {
  API.output('save', filename, callback);
};
```
#### Step 2:
edit this -
 ```javascript
 saveAs(getBlob(), options);
 ```

to this -
```javascript
var filesaver_status = saveAs(getBlob(), options);
uqx_callback(filesaver_status);
```
