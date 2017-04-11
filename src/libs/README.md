Libraries that have to be customised due to bugs or missing functionality should be placed in this folder. Any changes should be documented here. For more complex customisation, a detailed description is sufficient. Where possible and time allows, submit a pull request to the original repo for eventual public release.


# jsPDF.js

Type: Missing Functionality
Description: No callback for doc.save() to see when and if user has received PDF.

Fix: Implemented callback function

#### Fix 1:
Original -
 ```javascript
 API.save = function (filename) {
   API.output('save', filename);
 };
 ```

Update -
```javascript
API.save = function (filename, callback) {
  API.output('save', filename, callback);
};
```
#### Fix 2:
Original -
 ```javascript
 saveAs(getBlob(), options);
 ```

Update -
```javascript
var filesaver_status = saveAs(getBlob(), options);
uqx_callback(filesaver_status);
```
