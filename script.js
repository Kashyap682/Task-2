function moveOptions(sourceId, targetId) {
    const sourceSelect = document.getElementById(sourceId);
    const targetSelect = document.getElementById(targetId);

    for (const option of sourceSelect.selectedOptions) {
        targetSelect.add(new Option(option.text, option.value));
    }

    for (let i = sourceSelect.options.length - 1; i >= 0; i--) {
        if (sourceSelect.options[i].selected) {
            sourceSelect.remove(i);
        }
    }
}

function onNext() {
    var disArr = [];
    const dis = document.getElementById('used');

    for (const option of dis){
        disArr.push(option.value);
    }

    console.log(disArr);

    var fileInput = document.getElementById('myfile');
    var jsonData;

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var data = [];
                jsonData = JSON.parse(e.target.result);
                //console.log(jsonData);
                //console.log(disArr);
                for (i in jsonData.products){
                    data.splice(i, 0, [jsonData.products[i].subcategory, jsonData.products[i].title, jsonData.products[i].price, parseInt(jsonData.products[i].popularity)]);
                }
                data.sort(function(a, b){return b[3]-a[3]});
                console.log(data);

                const table = document.getElementById('mytable');
                table.innerHTML = '';
                const row = table.insertRow();
                for (i in disArr){
                    const cell = row.insertCell(i);
                    cell.innerHTML = disArr[i];
                }
                for (j in data){
                    const r = table.insertRow();
                    for (k in disArr){
                        if (disArr[k] == 'subcategory'){
                            const c = r.insertCell(k);
                            c.innerHTML = data[j][0];
                            continue;
                        }
                        else if (disArr[k] == 'title'){                            
                            const c = r.insertCell(k);
                            c.innerHTML = data[j][1];
                            continue;
                        }
                        else if (disArr[k] == 'price'){
                            const c = r.insertCell(k);
                            c.innerHTML = data[j][2];
                            continue;
                        }
                        else if (disArr[k] == 'popularity'){
                            const c = r.insertCell(k);
                            c.innerHTML = data[j][3];
                            continue;
                        }
                    }
                }

            } catch (error) {
                console.error("Error parsing JSON: " + error.message);
            }
        };
        reader.readAsText(file);
    } else {
        console.error("Please select a file");
    }
}
