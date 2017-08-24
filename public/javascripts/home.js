function contactList() {
    
        axios.post('/api/list')
            .then(function (response) {
                console.log(response);
                var html = '';
                for (var i = 0; i < response.data.result.length; i++) {
                  
                    var fn = response.data.result[i].first_name;
                    var num = response.data.result[i].number;
                   
                    html += `<tr id=row${i + 1}>`;
                    html += '<td>' + (i + 1) + '</td>';
                    html += `<td id=rowfn${i + 1} value=${response.data.result[i].first_name}>` + response.data.result[i].first_name + '</td>';
                    html += `<td id=rowln${i + 1} value=${response.data.result[i].number}>` + response.data.result[i].number + '</td>';
                    html += '<td>' + `<button type="button" id=${i + 1} onclick="editCon('${i + 1}','${fn}','${num}')">` + "EDIT" + `</button>` + `</td>`;
                    html += '<td>' + `<button type="button" id=${i + 1} onclick="deleteCon('${fn}','${num}')">` + "DELETE" + `</button>` + `</td>`;
                    html += '</tr>';
                    
                };
                html += '</br>';
                document.getElementById('contact_list').innerHTML = html;
                
    
            })
            .catch(function (error) {
                console.log(error);
            });
    }



function addCon() {

    var fname = document.getElementById('fname').value;
    var num=document.getElementById('num').value;
    if(fname==''|| num=='')
        {
            alert('Fill the details carefully with valid data')
        }
    else {
    axios.post('/api/add', {
		first_name: fname,
		number: num
	})
		.then(function (response) {
			if (response) {
			console.log('add rsep',response);
			}
		})
		 .then(function () {
		 	contactList();
		 })
		.catch(function (error) {
			console.log(error);
		});
      }
        document.getElementById('fname').value='';
        document.getElementById('num').value='';
   
  }
    

    function deleteCon(fname,delnum) {
      console.log(fname, delnum);
        axios.post('/api/delete', {
            fname: fname,
            delnum: delnum
        })
            .then(function (response) {
    
                if (response) {
                    console.log(response);
                    contactList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    
    function editCon(i, fn, num) {
        
            // var em = em;
        
            var html = '';
            html += '<tr>';
            html += '<td>' + (i) + '</td>';
            html += '<td>' + `<input type = "text" name = "first_name" id="fnedit" value=${fn}>` + '</td>'
            html += '<td>' + `<input type = "text" name = "number" id="numedit" value=${num}>` + '</td>'
           
            html += '<td>' + `<button value = "Submit" onclick="addAfterEdit('${num}')" >Submit</button>` + '</td>'
            html += '</tr>';
        
            document.getElementById(`row${i}`).innerHTML = html;
        }    

        function addAfterEdit(onum) {
           
            var oem = onum;
            var firstName = document.getElementById("fnedit").value;
            if(firstName=='')
                {
                    alert('sasda');
                    return false;
                }
            var number = document.getElementById("numedit").value;
            
                if(number=='')
                    {
                        alert('Enter Valid Values');
                        return false;
                    }
                             
            // console.log('eeee ', email);
            axios.post('/api/edit', {
                first_name1: firstName,
                numberr: number,
                oldnum : onum
            })
                .then(function (response) {
                    console.log('user edited');
                    contactList();
                })
            
        }
       
       
        function SignOff() {
            axios.post('/api/logout')
                .then(function (response) {
                    if (response.data.isLogged == false) {
                        location.replace('/')
                        alert('you logged out');
                }
            
            })
        }
        
contactList();

