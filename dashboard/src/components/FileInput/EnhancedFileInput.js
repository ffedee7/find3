import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { FileInput } from "./FileInput";

var enhance = compose(
  withHandlers({
    onFileChange: ({ onLoad }) => () => e => {
      const files = e.target.files;

      var goFiles = Array.from(files).map(file => {
        return getBase64(file).then(data => {
          return {
            name: file.name,
            type: file.type.split("/")[0],
            fileUrl: data
          };
        });
      });
      if (files) {
        Promise.all(goFiles).then(files => onLoad(files));
      } else {
        alert("File uploaded is not valid.");
      }
    }
  })
);

export var EnhancedFileInput = enhance(FileInput);
EnhancedFileInput.displayName = "enhance(FileInput)";

function getBase64(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
