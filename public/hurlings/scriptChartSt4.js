$.ajax({
   
    dataType: 'json',
    type: 'POST',
	
    url: "/hurlings/loadSubV",
    success: function(data) {
    console.log(data)


    
   for(var i = 0;i<data.length;i++){
    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
 
    var td2 = tr.appendChild(document.createElement('td'));
	var td3 = tr.appendChild(document.createElement('td'));
	var td4 = tr.appendChild(document.createElement('td'));

    var link= tr.appendChild(document.createElement('td'));
    //td5.appendChild(document.createElement('a'));
    td1.id =data[i]._id

td2.classList.add('text-end', 'pe-1')

td3.classList.add('text-end', 'pe-0')
td4.classList.add('text-end', 'pe-0')

link.classList.add('text-end','pe-0')
link.setAttribute("href", "/hurlings/subBatchDelete/"+data[i]._id)
link.className = "text-end";

/*let link = document.createTextNode("Delete")

td5.appendChild(link);*/


td1.innerHTML = data[i].name;
td2.innerHTML = data[i].code;
td3.innerHTML = data[i].grade;
td4.innerHTML = data[i].icon;
   
   
    let link2 = "/hurlings/subBatchDelete/"+data[i]._id

    //td5.innerHTML = "Delete"
    var linkText = 'Delete'
   // link.appendChild(linkText);
link.href="/hurlings/subBatchDelete/"+data[i]._id
    //td5.innerText = 'Delete'
    link.innerHTML='<a href="'+link2+'">'+linkText+'</a>'

    console.log(link,'33tt')
  

 

  document.getElementById("kt_ecommerce_report_sales_table").appendChild(tr)
  //document.getElementById("kt_ecommerce_report_sales_table").appendChild(link)
    //document.getElementById("kt_ecommerce_report_sales_table").appendChild(td5)
    //document.body.prepend(td5)
   }





var table = document.getElementById('kt_ecommerce_report_sales_table')
var cells = table.getElementsByClassName("text-end pe-1")
for(var i = 0; i< cells.length; i++){
cells[i].onclick = function(){
console.log(i,'this')
if(this.hasAttribute('data-clicked')){
    
    return;
}

this.setAttribute('data-clicked', 'yes')
this.setAttribute('data-text', this.innerHTML)

var input = document.createElement('input');
input.setAttribute('type', 'text')
input.value = this.innerHTML
input.style.width = this.offsetWidth - (this.clientLeft * 2) + 'px';
input.style.height = this.offsetHeight - (this.clientTop * 2) + "px";
input.style.border = '0px';
input.style.fontFamily ="inherit";
input.style.fontSize ="inherit";
input.style.textAlign = "inherit";
input.style.backgroundColor = 'LightGoldenRodYellow';

input.onblur = function(){

    var td = input.parentElement;
        console.log(td.id,'td')
    var orig_text = input.parentElement.getAttribute('data-text');
    var current_text = this.value;

     let reg = /\d+\.*\d*/g;

let result = current_text.match(reg)
let currentMark = Number(result)




let resultX = orig_text.match(reg)
let originalMark = Number(resultX)

console.log(currentMark,originalMark,'mark')

/*if(originalMark < currentMark){*/



    if(orig_text != current_text ){
        //there are changes
        //save into db using ajax
        console.log(current_text,'current_text')
$.ajax({
  dataType: 'json',
            data: {
                code: current_text,
                
            },
            type: 'POST',
            url: "/hurlings/subV/update/"+td1.id,


  success: function(data) {
 
/* if(data.stockUpdate == 'yes'){
 alert('Stock cant be updated')

 console.log(td.id,'id2')
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = orig_text
        td.style.cssText = 'padding: 5px';
}
else{*/
console.log(td.id,'id2')
console.log(td,'coalition')
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = current_text
        //cells[5].textContent =  data.percentage
        td.style.cssText = 'padding: 5px';
/*}*/
    
  
    }


});
        console.log(td.id,'id2')
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = current_text

        td.style.cssText = 'padding: 5px';
        
        console.log(orig_text + 'is change to ' + current_text)
    
    } else{
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = orig_text
        td.style.cssText = 'padding: 5px';
        console.log('No changes made')
    
    }

/* }else{


alert('error')

   td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = orig_text
        td.style.cssText = 'padding: 5px';
        console.log('No changes made')

}*/
}

this.innerHTML = ''
this.style.cssText = 'padding: 0px';
this.append(input);
this.firstElementChild.select();

}
}





	}

	})





















function addSubject()
{


 
    var grade = document.sample.grade.value;
   
    var code=document.sample.code.value;
    
    var code2=document.sample.code2.value;
    var name=document.sample.name.value;
    
    var dept=document.sample.dept.value;
    
    var icon=document.sample.icon.value;

    console.log(grade,code,'th')
	$.ajax({
   
    dataType: 'json',
    type: 'POST',
	data:{grade:grade,code:code,code2:code2,name:name,dept:dept,icon:icon },
    url: "/hurlings/subject",
    success: function(data) {
    console.log(data,'enlighted')
  

    
   /* for(var i = 0;i<data.length;i++){*/
    var tr = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
     
    var td2 = tr.appendChild(document.createElement('td'));
	var td3 = tr.appendChild(document.createElement('td'));
	var td4 = tr.appendChild(document.createElement('td'));
    

    var link= tr.appendChild(document.createElement('td'));
    td1.id =data._id
    
td1.classList.add('text-end', 'pe-0')
td2.classList.add('text-end', 'pe-1')
td3.classList.add('text-end', 'pe-0')
td4.classList.add('text-end', 'pe-0')

link.classList.add('text-end','pe-0')
link.setAttribute("href", "/hurlings/subBatchDelete")
link.className = "text-end";




    td1.innerHTML = data.name;
    td2.innerHTML = data.code;
    td3.innerHTML = data.grade;
    td4.innerHTML = data.icon;
  

    let link2 = "/hurlings/subBatchDelete/"+data._id

    //td5.innerHTML = "Delete"
    var linkText = 'Delete'
    // link.appendChild(linkText);
    link.href="/hurlings/subBatchDelete/"+data._id
    //td5.innerText = 'Delete'
    link.innerHTML='<a href="'+link2+'">'+linkText+'</a>'

    document.getElementById("kt_ecommerce_report_sales_table").appendChild(tr)







var table = document.getElementById('kt_ecommerce_report_sales_table')
var cells = table.getElementsByClassName("text-end pe-1")
for(var i = 0; i< cells.length; i++){
cells[i].onclick = function(){
console.log(i,'this')
if(this.hasAttribute('data-clicked')){
    
    return;
}

this.setAttribute('data-clicked', 'yes')
this.setAttribute('data-text', this.innerHTML)

var input = document.createElement('input');
input.setAttribute('type', 'text')
input.value = this.innerHTML
input.style.width = this.offsetWidth - (this.clientLeft * 2) + 'px';
input.style.height = this.offsetHeight - (this.clientTop * 2) + "px";
input.style.border = '0px';
input.style.fontFamily ="inherit";
input.style.fontSize ="inherit";
input.style.textAlign = "inherit";
input.style.backgroundColor = 'LightGoldenRodYellow';

input.onblur = function(){

    var td = input.parentElement;
        console.log(td.id,'td')
    var orig_text = input.parentElement.getAttribute('data-text');
    var current_text = this.value;

     let reg = /\d+\.*\d*/g;

let result = current_text.match(reg)
let currentMark = Number(result)




let resultX = orig_text.match(reg)
let originalMark = Number(resultX)

console.log(currentMark,originalMark,'mark')

/*if(originalMark < currentMark){*/



    if(orig_text != current_text ){
        //there are changes
        //save into db using ajax
        console.log(current_text,'current_text')
$.ajax({
  dataType: 'json',
            data: {
                code: current_text,
                
            },
            type: 'POST',
            url: "/hurlings/subV/update/"+td1.id,


  success: function(data) {
 
/* if(data.stockUpdate == 'yes'){
 alert('Stock cant be updated')

 console.log(td.id,'id2')
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = orig_text
        td.style.cssText = 'padding: 5px';
}
else{*/
console.log(td.id,'id2')
console.log(td,'coalition')
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = current_text
        //cells[5].textContent =  data.percentage
        td.style.cssText = 'padding: 5px';
/*}*/
    
  
    }


});
        console.log(td.id,'id2')
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = current_text

        td.style.cssText = 'padding: 5px';
        
        console.log(orig_text + 'is change to ' + current_text)
    
    } else{
        td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = orig_text
        td.style.cssText = 'padding: 5px';
        console.log('No changes made')
    
    }

/* }else{


alert('error')

   td.removeAttribute('data-clicked')
        td.removeAttribute('data-text')
        td.innerHTML = orig_text
        td.style.cssText = 'padding: 5px';
        console.log('No changes made')

}*/
}

this.innerHTML = ''
this.style.cssText = 'padding: 0px';
this.append(input);
this.firstElementChild.select();

}
}





	}

	})
}