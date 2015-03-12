function handleFile(e) {
  var files = e.target.files;
  var i,f;

  for (i = 0, f = files[i]; i != files.length; ++i) {

    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {

      var data = e.target.result;

      var workbook = XLSX.read(data, {type: 'binary'});

      var sheet_name_list = workbook.SheetNames;

      sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        console.log(worksheet);
        for (z in worksheet) {
          if(z[0] === '!') continue;
          // console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
          var value = $("#out").html();
          $("#out").html(value + "\n" + y + "!" + z + "=" + JSON.stringify(worksheet[z].v))
        }
      });
    };
    reader.readAsBinaryString(f);
  }
}

var input_dom_element = document.getElementById("xlf");
input_dom_element.addEventListener('change', handleFile, false);
