        const electron = require('electron');
        const {ipcRenderer} = electron;
        const display= document.getElementById('display');
        // In page 1.
        //electron.remote.getGlobal('sharedObject').someProperty = 'new value';
        ipcRenderer.on('item:add',function(e,item){
           
            value = JSON.parse(JSON.stringify(item));
              display.innerHTML ='';
              
         
            let i ='';
        for(let a=1; a<value.length; a=a+2){
                i = a-1;
              span = document.createElement('SPAN');
            if(value[a] =='NNP' || value[a] =='MD'
             || value[a] =='NNS' || value[a] =='NNPS'){
                
                span.classList.add('text-danger');
                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Noun");
                
            }
            else if(value[a] =='PRP'|| value[a] =='PRP$'){
                span.classList.add('text-info');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Pronoun");
            }
            else if(value[a] =='VBD' || value[a] =='VB' 
                || value[a] =='VBG' || value[a] =='VBN'
                || value[a] =='VBP' || value[a] =='VBZ'){
                span.classList.add('text-warning');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Verb");
            }

            else if(value[a] =='RB' || value[a] =='RBR'
             || value[a] =='RBS'){
                span.classList.add('text-secondary');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Adverb");
            }
            else if(value[a] =='JJ' || value[a] =='JJR'
             || value[a] =='JJS'){
                span.classList.add('text-primary');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Adjective");
            }
            else if(value[a] =='UH'){
                span.classList.add('text-danger');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Interjection");
            }
            else if(value[a] =='CC'){
                span.classList.add('text-success');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Noun");
            }
            else if(value[a] =='IN'){
                span.classList.add('pink');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","");
            }
             else if(value[a] =='DT' || value[a] =='PDT'
             || value[a] =='WDT'){
                span.classList.add('orange');

                span.setAttribute("data-toggle","tooltip");
                span.setAttribute("title","Determinant");
            }
            else{
                span.classList.add('black');      
            }
        
        value[i]=value[i]+' '
            const text = document.createTextNode(value[i]);
            span.appendChild(text);
            display.appendChild(span);

        }
        });


         const form = document.querySelector('form');
        form.addEventListener('submit',submitForm);
         function submitForm(e){
             e.preventDefault();
            const item = document.querySelector('#item').value;
         
            ipcRenderer.send('item:add',item);

         }

        
        ipcRenderer.on('item:clear',function(){
            display.innerHTML ='';
        });

        display.addEventListener('dblclick',function(e){
            e.target.remove();
        })

    tog=true;
function openNav() {

if (tog){
  document.getElementById("sidebar-wrapper").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  tog=false;
  }else{ tog =true;
   document.getElementById("sidebar-wrapper").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
  
  
}

