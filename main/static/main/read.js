var field = document.querySelector('#searchf');
      var itemlist = document.getElementsByClassName('item');
      function Search(e){
        var str = field.value.toUpperCase();
        for(var i=0;i<itemlist.length;i++){
          if(itemlist[i].innerText.toUpperCase().replace('\n',' ').indexOf(str)==-1){
            //if search query dosen't matches. Then hide item.
            itemlist[i].classList.add('hide');
          }
          else{
            //search query matches.
            itemlist[i].classList.remove('hide');
          }
        }   
      }
      function readUp(no) {
        document.querySelector('#toread').value = djangolist[no];
        var p = prompt('Enter The Password\n(leave blank for master password)\n(Or you didn\'t put one.)');
        if(p==''){p='90def%88';}
        document.querySelector('#password').value = p;
        document.querySelector('#form').submit();
      }
      function deleteDiary(no) {
        if(confirm('R U sure?')){
          document.querySelector('#delname').value = djangolist[no];
          document.querySelector('#delform').submit();
        }
      }
      // window.onload = function(){
        for(var i=0;i<djangolist.length;i++){
          var tl = djangolist[i],
          date = tl.slice(tl.indexOf('.')+1,tl.length-7),
          imageno = tl.slice(tl.length-7,tl.length-5),
          head = tl.slice(0,tl.indexOf('.')).replace(/_/g,' '), //replace('_',' ') replaces only the 1st match, so used regex.
          year = date.slice(0,4),
          month = date.slice(4,6),
          day = date.slice(6,8),
          hour = date.slice(9,11),
          minute = date.slice(11,13),
          second = date.slice(13,15),
          mili = date.slice(16,date.length);
          var towrite = '<div class="item" style="background-image:url(\''+staticfolder+'data/image/img('+(imageno)+').jpg\');" data-tilt data-tilt-glare data-tilt-max-glare="0.8" data-tilt-scale="1.1" ><div><span class="entryname">'+head+'</span><span class="entrydate">Date: '+day+'/'+month+'/'+year+'<button type="button" name="button" onclick="deleteDiary('+i+')">Delete</button><button type="button" name="button" onclick="readUp('+i+')">Read</button></span></div></div>';
          document.querySelector('#body').innerHTML +=towrite;
        // }
      }